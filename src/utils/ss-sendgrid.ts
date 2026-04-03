/**
 * Sober Sativas — Direct SendGrid mail sender.
 *
 * Uses the SendGrid v3 API directly (no extra dependency) so SS emails
 * stay fully isolated from the Total Hemp notification provider.
 */

const SENDGRID_API_URL = "https://api.sendgrid.com/v3/mail/send"

export type SsSendGridPayload = {
  to: string
  templateId: string
  dynamicTemplateData: Record<string, unknown>
}

type SsConfig = {
  apiKey: string
  from: string
  fromName: string
}

const getConfig = (): SsConfig | null => {
  const apiKey = (process.env.SS_SENDGRID_API_KEY || "").trim()
  const from = (process.env.SS_SENDGRID_FROM || "").trim()

  if (!apiKey || !from) {
    return null
  }

  return {
    apiKey,
    from,
    fromName: (process.env.SS_SENDGRID_FROM_NAME || "Sober Sativas").trim(),
  }
}

export async function ssSendGridSend(
  payload: SsSendGridPayload
): Promise<{ success: boolean; statusCode?: number; error?: string }> {
  const config = getConfig()

  if (!config) {
    return {
      success: false,
      error: "SS_SENDGRID_API_KEY or SS_SENDGRID_FROM not configured",
    }
  }

  const body = {
    personalizations: [
      {
        to: [{ email: payload.to }],
        dynamic_template_data: payload.dynamicTemplateData,
      },
    ],
    from: { email: config.from, name: config.fromName },
    template_id: payload.templateId,
  }

  try {
    const response = await fetch(SENDGRID_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (response.status >= 200 && response.status < 300) {
      return { success: true, statusCode: response.status }
    }

    const text = await response.text().catch(() => "")
    return {
      success: false,
      statusCode: response.status,
      error: `SendGrid ${response.status}: ${text.slice(0, 500)}`,
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Unknown SendGrid error",
    }
  }
}

export function getSsSalesChannelId(): string | null {
  return (process.env.SS_SALES_CHANNEL_ID || "").trim() || null
}
