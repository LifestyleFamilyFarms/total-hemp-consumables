import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import {
  updateProductCategoriesWorkflow,
  useQueryGraphStep,
} from "@medusajs/medusa/core-flows"

export type CategoryImageContractInput = {
  thumbnail?: string | null
  banner?: string | null
  gallery?: string[]
}

export type UpdateCategoryImagesMetadataWorkflowInput = {
  category_id: string
  images: CategoryImageContractInput
}

const updateCategoryImagesMetadataWorkflow = createWorkflow(
  "category-images.update-metadata",
  function (input: UpdateCategoryImagesMetadataWorkflowInput) {
    const { data: categories } = useQueryGraphStep({
      entity: "product_category",
      fields: ["id", "metadata"],
      filters: {
        id: input.category_id,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    })

    const updateInput = transform({ input, categories }, (data) => {
      const currentMetadata =
        typeof data.categories[0].metadata === "object" && data.categories[0].metadata
          ? data.categories[0].metadata
          : {}

      return {
        selector: {
          id: data.input.category_id,
        },
        update: {
          metadata: {
            ...currentMetadata,
            category_images: {
              thumbnail: data.input.images.thumbnail ?? null,
              banner: data.input.images.banner ?? null,
              gallery: Array.isArray(data.input.images.gallery)
                ? data.input.images.gallery
                : [],
            },
          },
        },
      }
    })

    const updatedCategories = updateProductCategoriesWorkflow.runAsStep({
      input: updateInput,
    })

    const category = transform({ updatedCategories }, (data) => data.updatedCategories[0])

    return new WorkflowResponse({
      category,
    })
  }
)

export default updateCategoryImagesMetadataWorkflow
