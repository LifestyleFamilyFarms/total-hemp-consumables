import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { updateCategoryImagesMetadataWorkflow } from "../../../../../workflows/category-images"
import type { UpdateCategoryImagesBody } from "./middlewares"

export async function POST(
  req: MedusaRequest<UpdateCategoryImagesBody>,
  res: MedusaResponse
) {
  const { id } = req.params as { id: string }

  const { result } = await updateCategoryImagesMetadataWorkflow(req.scope).run({
    input: {
      category_id: id,
      images: {
        thumbnail: req.validatedBody.thumbnail,
        banner: req.validatedBody.banner,
        gallery: req.validatedBody.gallery,
      },
    },
  })

  return res.status(200).json(result)
}
