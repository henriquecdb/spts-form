import { useState } from "react";
import "./App.css";
import { preQuestionBoxes } from "./data/preQuestionBoxes";
import { questionPagesByTrack } from "./data/questionPages";

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
  const selectedTrackLabel =
    preQuestionBoxes.find((option) => option.id === selectedTrack)?.label ?? "";

  const canContinue = isFirstStep
    ? selectedTrack.length > 0
    : String(formData[activeQuestion?.id] ?? "").trim().length > 0;

  const handleFieldChange = (fieldId, value) => {
    setFormData((previousData) => ({
      ...previousData,
      [fieldId]: value,
    }));
  };

  const handleTrackSelection = (trackId) => {
    setSelectedTrack(trackId);
    setFormData({});
    setSubmitError("");
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
        const answers = questionPages.map((question) => ({
          id: question.id,
          question: question.question,
          answer: String(formData[question.id] ?? "").trim(),
        }));

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
        <p className="step-label">
          Etapa {currentStep + 1} de {totalSteps}
        </p>
        <h1>{isFirstStep ? "Escolha um fluxo" : "Pergunta"}</h1>
        <p className="description">
          {isFirstStep
            ? "Selecione Squad ou Project Reality para carregar as perguntas de cada núcleo."
            : activeQuestion.question}
        </p>

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
              <input
                type="text"
                name={activeQuestion.id}
                value={formData[activeQuestion.id] ?? ""}
                onChange={(event) =>
                  handleFieldChange(activeQuestion.id, event.target.value)
                }
                placeholder={activeQuestion.placeholder}
              />
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
