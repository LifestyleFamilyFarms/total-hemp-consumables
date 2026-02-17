import { MedusaService } from "@medusajs/framework/utils"
import SalesStore from "./models/sales-store"
import SalesStoreStage from "./models/sales-store-stage"

class SalesStoresModuleService extends MedusaService({
  SalesStore,
  SalesStoreStage,
}) {}

export default SalesStoresModuleService
