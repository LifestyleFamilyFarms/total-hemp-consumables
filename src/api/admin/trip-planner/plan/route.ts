import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"
import { planTrip } from "../../../../services/trip-planner"

const timeRegex = /^\d{2}:\d{2}$/

const TripPlanSchema = z.object({
  startAddress: z.string().trim().min(1),
  endAddress: z.string().trim().min(1),
  roundTrip: z.boolean(),
  dateISO: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().regex(timeRegex),
  endTime: z.string().regex(timeRegex),
  mustStops: z
    .array(
      z.object({
        name: z.string().trim().min(1).optional(),
        address: z.string().trim().min(1),
        serviceMinutes: z.number().int().min(0),
      })
    )
    .default([]),
  maxOptionalStops: z.number().int().min(0).max(10),
  optionalServiceMinutes: z.number().int().min(5).max(60),
  keywords: z.array(z.string().trim().min(1)).default([]),
  exportWaypointLimit: z.number().int().min(1).max(25).default(25),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const parsed = TripPlanSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid request body for trip planner.",
      errors: parsed.error.flatten(),
    })
  }

  try {
    const response = await planTrip(parsed.data)
    return res.status(200).json(response)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Trip planning failed."
    return res.status(500).json({ message })
  }
}
