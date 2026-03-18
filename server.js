import express from "express";
import dotenv from "dotenv";
import {
  buildDiscordEmbed,
  resolveWebhookUrl,
  sendDiscordEmbed,
} from "./lib/submitWebhook.js";

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

  const webhookUrl = resolveWebhookUrl(trackId);

  if (!webhookUrl) {
    response.status(500).json({
      error:
        "Webhook não configurado para o track recebido. Configure DISCORD_SQUAD_WEBHOOK_URL, DISCORD_PR_WEBHOOK_URL e DISCORD_ARMA3_WEBHOOK_URL.",
    });
    return;
  }

  const embed = buildDiscordEmbed({ trackLabel, answers });

  try {
    await sendDiscordEmbed(webhookUrl, embed);
    response.json({ ok: true });
  } catch (error) {
    response.status(502).json({
      error: "Webhook do Discord retornou erro.",
      details: String(error?.details ?? error),
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor webhook ativo.`);
});
