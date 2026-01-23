import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const repCode = typeof req.query?.code === "string" ? req.query.code.trim() : ""

  if (!repCode) {
    return res.status(400).json({ message: "Missing rep code." })
  }

  const service = req.scope.resolve("salesPeople") as {
    resolveByRepCode: (code: string) => Promise<unknown>
  }

  const person = await service.resolveByRepCode(repCode)

  if (!person) {
    return res.status(404).json({ message: "Sales person not found." })
  }

  return res.status(200).json({ person })
}
