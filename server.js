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
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    response.status(500).json({
      error: "DISCORD_WEBHOOK_URL não configurada no servidor.",
    });
    return;
  }

  const { trackLabel, answers } = request.body ?? {};

  if (!trackLabel || !Array.isArray(answers) || answers.length === 0) {
    response.status(400).json({
      error: "Payload inválido para envio do formulário.",
    });
    return;
  }

  const MAX_EMBED_FIELDS = 25;
  const truncate = (text, maxLength) => String(text).slice(0, maxLength);

  const embedFields = answers.slice(0, MAX_EMBED_FIELDS).map((entry, index) => {
    const question = truncate(entry.question || `Pergunta ${index + 1}`, 256);
    const answer = String(entry.answer ?? "").trim() || "Sem resposta";

    return {
      name: `${index + 1}. ${question}`,
      value: truncate(answer, 1024),
      inline: false,
    };
  });

  const embed = {
    title: "Novo formulario recebido",
    color: 0x1966ff,
    fields: [
      //   {
      //     name: "Fluxo",
      //     value: truncate(trackLabel, 1024),
      //     inline: false,
      //   },
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

// app.listen(port, () => {
//   console.log(`Servidor webhook ativo em http://localhost:${port}`);
// });
