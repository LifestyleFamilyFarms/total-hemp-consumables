import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { autocompletePlaces } from "../../../../services/google/places"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return res.status(500).json({
      message: "Missing GOOGLE_MAPS_API_KEY. Configure it in the environment.",
    })
  }

  const query = typeof req.query?.q === "string" ? req.query.q.trim() : ""

  if (!query || query.length < 3) {
    return res.status(200).json({ suggestions: [] })
  }

  try {
    const suggestions = await autocompletePlaces(query, apiKey)
    return res.status(200).json({ suggestions })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Address lookup failed."
    return res.status(500).json({ message })
  }
}
