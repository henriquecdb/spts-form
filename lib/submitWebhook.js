import { TRACK_IDS } from "./trackIds.js";

const MAX_EMBED_FIELDS = 25;
const MAX_EMBED_FIELD_NAME = 256;
const MAX_EMBED_FIELD_VALUE = 1024;

const truncate = (text, maxLength) => String(text).slice(0, maxLength);

const normalizeBooleanAnswer = (rawAnswer) => {
  if (rawAnswer === true) {
    return "Sim";
  }

  if (rawAnswer === false) {
    return "Não";
  }

  const booleanText = String(rawAnswer ?? "")
    .trim()
    .toLowerCase();

  if (booleanText === "true" || booleanText === "sim") {
    return "Sim";
  }

  if (
    booleanText === "false" ||
    booleanText === "nao" ||
    booleanText === "não"
  ) {
    return "Não";
  }

  return "";
};

const normalizeAnswer = (entry) => {
  if (entry.boolean) {
    return normalizeBooleanAnswer(entry.answer);
  }

  if (entry.onlyNumbers) {
    return String(entry.answer ?? "").replace(/\D+/g, "");
  }

  return String(entry.answer ?? "").trim();
};

export const resolveWebhookUrl = (trackId) => {
  const webhookByTrackId = {
    [TRACK_IDS.SQUAD]: process.env.DISCORD_SQUAD_WEBHOOK_URL,
    [TRACK_IDS.PROJECT_REALITY]: process.env.DISCORD_PR_WEBHOOK_URL,
  };

  return webhookByTrackId[trackId];
};

export const buildDiscordEmbed = ({ trackLabel, answers }) => {
  const embedFields = answers.slice(0, MAX_EMBED_FIELDS).map((entry, index) => {
    const questionText =
      String(entry.question ?? "").trim() ||
      String(entry.label ?? "").trim() ||
      `Pergunta ${index + 1}`;
    const question = truncate(questionText, MAX_EMBED_FIELD_NAME);

    const normalizedLimit = Number(entry.charLimit);
    const perQuestionLimit =
      Number.isInteger(normalizedLimit) && normalizedLimit > 0
        ? Math.min(normalizedLimit, MAX_EMBED_FIELD_VALUE)
        : MAX_EMBED_FIELD_VALUE;

    const answer = normalizeAnswer(entry) || "Sem resposta";

    return {
      name: `${index + 1}. ${question}`,
      value: truncate(answer, perQuestionLimit),
      inline: false,
    };
  });

  return {
    title: "Nova admissão.",
    color: 0x7b0000,
    fields: [
      {
        name: "Fluxo",
        value: truncate(trackLabel, MAX_EMBED_FIELD_VALUE),
        inline: false,
      },
      ...embedFields,
    ],
    footer: {
      text: "SPTS Form",
    },
    timestamp: new Date().toISOString(),
  };
};

export const sendDiscordEmbed = async (webhookUrl, embed) => {
  const discordResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      allowed_mentions: { parse: [] },
      embeds: [embed],
    }),
  });

  if (!discordResponse.ok) {
    const errorText = await discordResponse.text();
    const error = new Error("Webhook do Discord retornou erro.");
    error.details = errorText;
    throw error;
  }
};
