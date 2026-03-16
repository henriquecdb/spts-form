import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(express.json());

app.get("/api/health", (_, response) => {
  response.json({ ok: true });
});

app.post("/api/submit", async (request, response) => {
  const { trackId, trackLabel, answers } = request.body ?? {};

  if (!trackLabel || !Array.isArray(answers) || answers.length === 0) {
    response.status(400).json({
      error: "Payload inválido para envio do formulário.",
    });
    return;
  }

  const webhookByTrackId = {
    squad: process.env.DISCORD_SQUAD_WEBHOOK_URL,
    projectReality: process.env.DISCORD_PR_WEBHOOK_URL,
  };

  const webhookUrl =
    webhookByTrackId[trackId] ?? process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    response.status(500).json({
      error:
        "Webhook não configurado para o track recebido. Configure DISCORD_SQUAD_WEBHOOK_URL e DISCORD_PR_WEBHOOK_URL.",
    });
    return;
  }

  const MAX_EMBED_FIELDS = 25;
  const truncate = (text, maxLength) => String(text).slice(0, maxLength);

  const embedFields = answers.slice(0, MAX_EMBED_FIELDS).map((entry, index) => {
    const questionText =
      String(entry.question ?? "").trim() ||
      String(entry.label ?? "").trim() ||
      `Pergunta ${index + 1}`;
    const question = truncate(questionText, 256);
    const normalizedLimit = Number(entry.charLimit);
    const perQuestionLimit =
      Number.isInteger(normalizedLimit) && normalizedLimit > 0
        ? Math.min(normalizedLimit, 1024)
        : 1024;
    const rawAnswer = entry.answer;
    const normalizedAnswer = entry.boolean
      ? (() => {
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
        })()
      : entry.onlyNumbers
        ? String(rawAnswer ?? "").replace(/\D+/g, "")
        : String(rawAnswer ?? "").trim();
    const answer = normalizedAnswer || "Sem resposta";

    return {
      name: `${index + 1}. ${question}`,
      value: truncate(answer, perQuestionLimit),
      inline: false,
    };
  });

  const embed = {
    title: "Nova admissão.",
    color: 0x7b0000,
    fields: [
      {
        name: "Fluxo",
        value: truncate(trackLabel, 1024),
        inline: false,
      },
      ...embedFields,
    ],
    footer: {
      text: "SPTS Form",
    },
    timestamp: new Date().toISOString(),
  };

  try {
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
      response.status(502).json({
        error: "Webhook do Discord retornou erro.",
        details: errorText,
      });
      return;
    }

    response.json({ ok: true });
  } catch (error) {
    response.status(500).json({
      error: "Falha ao enviar para o Discord.",
      details: String(error),
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor webhook ativo.`);
});
