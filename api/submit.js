import {
  buildDiscordEmbed,
  resolveWebhookUrl,
  sendDiscordEmbed,
} from "../lib/submitWebhook.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Método não permitido." });
    return;
  }

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
    response.status(200).json({ ok: true });
  } catch (error) {
    response.status(502).json({
      error: "Webhook do Discord retornou erro.",
      details: String(error?.details ?? error),
    });
  }
}
