import { useState } from "react";
import "./App.css";
import emblem from "./assets/emblem.png";
import { preQuestionBoxes } from "./data/preQuestionBoxes";
import { questionPagesByTrack } from "./data/questionPages";

const getCharLimit = (question) => {
  const value = Number(question?.charLimit);
  return Number.isInteger(value) && value > 0 ? value : null;
};

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState("");
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const questionPages = questionPagesByTrack[selectedTrack] ?? [];
  const totalSteps = questionPages.length + 1;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const activeQuestion = !isFirstStep ? questionPages[currentStep - 1] : null;
  const activeAnswer = activeQuestion ? formData[activeQuestion.id] : undefined;
  const isBooleanQuestion = Boolean(activeQuestion?.boolean);
  const isLongTextQuestion = Boolean(activeQuestion?.longText);
  const isOnlyNumbersQuestion = Boolean(activeQuestion?.onlyNumbers);
  const isMultiSelectQuestion =
    Boolean(activeQuestion?.multiSelect) &&
    Array.isArray(activeQuestion?.options);
  const hasCustomOptions = Array.isArray(activeQuestion?.options);
  const optionChoices = hasCustomOptions
    ? activeQuestion.options
    : isBooleanQuestion
      ? ["Sim", "Não"]
      : [];
  const multiSelectValue =
    isMultiSelectQuestion && typeof activeAnswer === "object" && activeAnswer
      ? activeAnswer
      : { selectedOptions: [], otherText: "" };
  const selectedMultiOptions = Array.isArray(multiSelectValue.selectedOptions)
    ? multiSelectValue.selectedOptions
    : [];
  const selectedOtherOption =
    isMultiSelectQuestion &&
    activeQuestion?.allowOtherOption &&
    selectedMultiOptions.includes(activeQuestion.otherOptionLabel ?? "Outro");
  const activeCharLimit = getCharLimit(activeQuestion);
  const selectedTrackLabel =
    preQuestionBoxes.find((option) => option.id === selectedTrack)?.label ?? "";

  const canContinue = (() => {
    if (isFirstStep) {
      return selectedTrack.length > 0;
    }

    if (!activeQuestion) {
      return false;
    }

    if (isBooleanQuestion) {
      return typeof activeAnswer === "boolean";
    }

    if (isMultiSelectQuestion) {
      if (selectedMultiOptions.length === 0) {
        return false;
      }

      if (selectedOtherOption) {
        return String(multiSelectValue.otherText ?? "").trim().length > 0;
      }

      return true;
    }

    if (hasCustomOptions) {
      return String(activeAnswer ?? "").trim().length > 0;
    }

    return String(activeAnswer ?? "").trim().length > 0;
  })();

  const handleFieldChange = (
    fieldId,
    value,
    charLimit = null,
    onlyNumbers = false,
  ) => {
    let normalizedValue = value;

    if (typeof normalizedValue === "string" && onlyNumbers) {
      normalizedValue = normalizedValue.replace(/\D+/g, "");
    }

    if (typeof normalizedValue === "string" && charLimit) {
      normalizedValue = normalizedValue.slice(0, charLimit);
    }

    setFormData((previousData) => ({
      ...previousData,
      [fieldId]: normalizedValue,
    }));
  };

  const handleTrackSelection = (trackId) => {
    setSelectedTrack(trackId);
    setFormData({});
    setSubmitError("");
  };

  const handleMultiSelectToggle = (fieldId, option, enabled) => {
    setFormData((previousData) => {
      const currentValue = previousData[fieldId];
      const selectedOptions =
        currentValue && Array.isArray(currentValue.selectedOptions)
          ? currentValue.selectedOptions
          : [];
      const nextSelectedOptions = enabled
        ? Array.from(new Set([...selectedOptions, option]))
        : selectedOptions.filter((selectedOption) => selectedOption !== option);

      return {
        ...previousData,
        [fieldId]: {
          selectedOptions: nextSelectedOptions,
          otherText:
            currentValue && typeof currentValue.otherText === "string"
              ? currentValue.otherText
              : "",
        },
      };
    });
  };

  const handleMultiSelectOtherText = (fieldId, text, charLimit = null) => {
    const normalizedText = charLimit ? text.slice(0, charLimit) : text;

    setFormData((previousData) => {
      const currentValue = previousData[fieldId];

      return {
        ...previousData,
        [fieldId]: {
          selectedOptions:
            currentValue && Array.isArray(currentValue.selectedOptions)
              ? currentValue.selectedOptions
              : [],
          otherText: normalizedText,
        },
      };
    });
  };

  const handleBack = () => {
    setCurrentStep((previousStep) => Math.max(previousStep - 1, 0));
  };

  const handleNext = async () => {
    if (!canContinue) {
      return;
    }

    if (isLastStep) {
      setIsSubmitting(true);
      setSubmitError("");

      try {
        const answers = questionPages.map((question) => {
          const rawAnswer = formData[question.id];
          const questionCharLimit = getCharLimit(question);
          const answer = question.boolean
            ? rawAnswer === true
              ? "true"
              : rawAnswer === false
                ? "false"
                : ""
            : question.multiSelect && Array.isArray(question.options)
              ? (() => {
                  if (!rawAnswer || typeof rawAnswer !== "object") {
                    return "";
                  }

                  const selectedOptions = Array.isArray(
                    rawAnswer.selectedOptions,
                  )
                    ? rawAnswer.selectedOptions
                    : [];
                  const otherLabel = question.otherOptionLabel ?? "Outro";
                  const filteredOptions = selectedOptions.filter(
                    (selectedOption) => selectedOption !== otherLabel,
                  );
                  const otherText = String(rawAnswer.otherText ?? "").trim();

                  if (selectedOptions.includes(otherLabel) && otherText) {
                    filteredOptions.push(`${otherLabel}: ${otherText}`);
                  }

                  return filteredOptions.join(", ");
                })()
              : Array.isArray(question.options)
                ? String(rawAnswer ?? "").trim()
                : String(rawAnswer ?? "").trim();

          return {
            id: question.id,
            question: question.question ?? question.label ?? "",
            label: question.label ?? "",
            answer,
            boolean: Boolean(question.boolean),
            longText: Boolean(question.longText),
            multiSelect: Boolean(question.multiSelect),
            onlyNumbers: Boolean(question.onlyNumbers),
            charLimit: questionCharLimit,
          };
        });

        const response = await fetch("/api/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            trackId: selectedTrack,
            trackLabel: selectedTrackLabel,
            answers,
          }),
        });

        if (!response.ok) {
          throw new Error("Falha ao enviar para o Webhook.");
        }

        setSubmitted(true);
      } catch {
        setSubmitError(
          "Não foi possivel enviar ao Discord agora. Tente novamente mais tarde.",
        );
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    setCurrentStep((previousStep) => previousStep + 1);
  };

  if (submitted) {
    return (
      <main className="page">
        <section className="form-shell done">
          <p className="step-label">Formulario enviado!</p>
          <h1>Obrigado pelo preenchimento</h1>
          <p className="description">
            Suas respostas para {selectedTrackLabel} foram registradas. Entre em
            contato no Discord caso tenha alguma dúvida..
          </p>
          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              setSubmitted(false);
              setCurrentStep(0);
              setSelectedTrack("");
              setFormData({});
            }}
          >
            Preencher novamente
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <form
        className="form-shell"
        onSubmit={(event) => {
          event.preventDefault();
          void handleNext();
        }}
      >
        {isFirstStep ? (
          <div className="hero-logo-wrap" aria-hidden="true">
            <img className="hero-logo" src={emblem} alt="" />
          </div>
        ) : null}

        <p className="step-label">
          Etapa {currentStep + 1} de {totalSteps}
        </p>
        <h1>{isFirstStep ? "Escolha um núcleo" : "Pergunta"}</h1>
        <p className="description">
          {isFirstStep
            ? "Selecione abaixo para carregar as perguntas de cada núcleo."
            : activeQuestion.question}
        </p>
        {!isFirstStep && activeQuestion.supportingText ? (
          <p className="supporting-text">{activeQuestion.supportingText}</p>
        ) : null}

        {isFirstStep ? (
          <div className="choice-grid">
            {preQuestionBoxes.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`choice-card ${
                  selectedTrack === option.id ? "choice-card-selected" : ""
                }`}
                onClick={() => handleTrackSelection(option.id)}
              >
                <span className="choice-title">{option.label}</span>
                <span className="choice-description">{option.description}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="fields-grid">
            <label key={activeQuestion.id} className="field-card">
              <span>{activeQuestion.label}</span>

              {isMultiSelectQuestion ? (
                <div
                  className="multi-select-wrap"
                  role="group"
                  aria-label={activeQuestion.label}
                >
                  {optionChoices.map((option) => {
                    const isChecked = selectedMultiOptions.includes(option);

                    return (
                      <label key={option} className="multi-select-option">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(event) =>
                            handleMultiSelectToggle(
                              activeQuestion.id,
                              option,
                              event.target.checked,
                            )
                          }
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}

                  {activeQuestion.allowOtherOption && selectedOtherOption ? (
                    <input
                      type="text"
                      className="other-option-input"
                      value={String(multiSelectValue.otherText ?? "")}
                      onChange={(event) =>
                        handleMultiSelectOtherText(
                          activeQuestion.id,
                          event.target.value,
                          activeCharLimit,
                        )
                      }
                      placeholder={
                        activeQuestion.otherOptionPlaceholder ??
                        "Especifique a opção 'Outro'"
                      }
                      maxLength={activeCharLimit ?? undefined}
                    />
                  ) : null}
                </div>
              ) : isBooleanQuestion || hasCustomOptions ? (
                <div
                  className="option-toggle"
                  role="group"
                  aria-label={activeQuestion.label}
                >
                  {optionChoices.map((option) => {
                    const optionValue = isBooleanQuestion
                      ? option === "Sim"
                      : option;
                    const isSelected = isBooleanQuestion
                      ? activeAnswer === optionValue
                      : activeAnswer === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        className={`option-button ${isSelected ? "option-button-selected" : ""}`}
                        onClick={() =>
                          handleFieldChange(activeQuestion.id, optionValue)
                        }
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              ) : isLongTextQuestion ? (
                <textarea
                  name={activeQuestion.id}
                  value={String(activeAnswer ?? "")}
                  onChange={(event) =>
                    handleFieldChange(
                      activeQuestion.id,
                      event.target.value,
                      activeCharLimit,
                      isOnlyNumbersQuestion,
                    )
                  }
                  placeholder={activeQuestion.placeholder}
                  rows={5}
                  maxLength={activeCharLimit ?? undefined}
                  inputMode={isOnlyNumbersQuestion ? "numeric" : undefined}
                />
              ) : (
                <input
                  type="text"
                  name={activeQuestion.id}
                  value={String(activeAnswer ?? "")}
                  onChange={(event) =>
                    handleFieldChange(
                      activeQuestion.id,
                      event.target.value,
                      activeCharLimit,
                      isOnlyNumbersQuestion,
                    )
                  }
                  placeholder={activeQuestion.placeholder}
                  maxLength={activeCharLimit ?? undefined}
                  inputMode={isOnlyNumbersQuestion ? "numeric" : undefined}
                  pattern={isOnlyNumbersQuestion ? "[0-9]*" : undefined}
                />
              )}

              {!isBooleanQuestion &&
              !isMultiSelectQuestion &&
              activeCharLimit ? (
                <small className="char-limit">
                  {String(activeAnswer ?? "").length}/{activeCharLimit}
                </small>
              ) : null}

              {isMultiSelectQuestion &&
              activeCharLimit &&
              selectedOtherOption ? (
                <small className="char-limit">
                  {String(multiSelectValue.otherText ?? "").length}/
                  {activeCharLimit}
                </small>
              ) : null}
            </label>
          </div>
        )}

        {submitError ? <p className="form-error">{submitError}</p> : null}

        <div className="actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={handleBack}
            disabled={isFirstStep || isSubmitting}
          >
            Voltar
          </button>
          <button
            type="submit"
            className="button button-primary"
            disabled={!canContinue || isSubmitting}
          >
            {isLastStep
              ? isSubmitting
                ? "Enviando..."
                : "Finalizar"
              : "Próxima"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default App;
