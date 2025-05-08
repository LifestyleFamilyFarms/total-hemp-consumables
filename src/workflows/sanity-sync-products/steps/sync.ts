import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { ProductDTO } from "@medusajs/framework/types"
import { 
  ContainerRegistrationKeys,
  promiseAll,
} from "@medusajs/framework/utils"
import SanityModuleService from "../../../modules/sanity/service"
import { SANITY_MODULE } from "../../../modules/sanity"

export type SyncStepInput = {
  product_ids?: string[];
}

export const syncStep = createStep(

    /* An object of step configurations. 
    The object must have the name property, which is this step's unique name. 
    Enabling the async property means that the workflow should run asynchronously in the background. 
    This is useful when the workflow is triggered manually through an HTTP request, 
    meaning the response will be returned to the client even if the workflow hasn't finished executing.
    The step's function definition as a second parameter. */

  { name: "sync-step", async: true },

  async (input: SyncStepInput, { container }) => {
    const sanityModule: SanityModuleService = container.resolve(SANITY_MODULE)
    const query = container.resolve(ContainerRegistrationKeys.QUERY)
    let total = 0
    const upsertMap: {
      before: any
      after: any
    }[] = []
    const batchSize = 200
    let hasMore = true
    let offset = 0
    const filters = input.product_ids ? {
      id: input.product_ids,
    } : {}
    while (hasMore) {
      const {
        data: products,
        metadata: { count = 0 } = {},
      } = await query.graph({
        entity: "product",
        fields: [
          "id",
          "title",
          // @ts-ignore
          "sanity_product.*",
        ],
        filters,
        pagination: {
          skip: offset,
          take: batchSize,
          order: {
            id: "ASC",
          },
        },
      })

      while(hasMore) {
        try {
            await promiseAll(
                products.map(async (prod) => {
                    const after = await sanityModule.upsertSyncDocument(
                        "product",
                        prod as ProductDTO
                    )

                    upsertMap.push({
                        //@ts-ignore
                        before: prod.sanity_product,
                        after,
                    })
                    return after
                })
            )
        } catch (e) {
            return StepResponse.permanentFailure(
                `An error occurred while syncing document: ${e}`,
                upsertMap
            )
        }
        offset += batchSize
        hasMore = offset < count
        total += products.length
      }
      return new StepResponse({ total }, upsertMap)
    }
  },
  //Compensation Function 
  //The syncStep creates or updates products in Sanity. So, the compensation function must delete created documents or revert the update of a document to its previous data. The compensation function is only executed if an error occurs.
  async(upsertMap, { container }) => {
    if(!upsertMap) {
        return
    }

    const sanityModule: SanityModuleService = container.resolve(SANITY_MODULE)
    await promiseAll (
        upsertMap.map(({ before, after })=> {
            if(!before) {
                //delete the doc
                return sanityModule.delete(after.id)
            }
            const { _id: id, ...oldData } = before
            
            return sanityModule.update(
                id,
                oldData
            )
        })
    )
  }
)