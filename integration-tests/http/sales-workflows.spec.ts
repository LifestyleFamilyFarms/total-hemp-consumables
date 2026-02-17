import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { medusaIntegrationTestRunner } from "@medusajs/test-utils"
import orderCreatedHandler from "../../src/subscribers/order-created"
import { normalizeAddress } from "../../src/utils/sales-stores"

jest.setTimeout(60 * 1000)

type HeaderMap = Record<string, string>

type SalesPerson = {
  id: string
  name: string
  rep_code: string
  active?: boolean
  notes?: string | null
}

type SalesStore = {
  id: string
  address: string
  normalized_address: string
  stage?: string | null
  notes?: string | null
  assigned_sales_person_id?: string | null
}

type SalesPersonAssignment = {
  id: string
  sales_person_id: string
  sales_store_id: string
  notes?: string | null
}

type SalesStoreStage = {
  id: string
  store_id: string
  stage: string
  notes?: string | null
}

type SalesChannel = {
  id: string
  name?: string
}

type ApiKey = {
  id: string
  token: string
  type: "secret" | "publishable"
}

type Customer = {
  id: string
  email?: string | null
  metadata?: Record<string, unknown> | null
}

type Cart = {
  id: string
  currency_code: string
  email?: string | null
  customer_id?: string | null
  metadata?: Record<string, unknown> | null
}

type Order = {
  id: string
  customer_id?: string | null
  metadata?: Record<string, unknown> | null
}

type SalesPeopleService = {
  createSalesPeople: (data: Record<string, unknown>) => Promise<SalesPerson>
  listSalesPeople: (
    selector?: Record<string, unknown>,
    config?: Record<string, unknown>
  ) => Promise<SalesPerson[]>
  listSalesPersonAssignments: (
    selector?: Record<string, unknown>,
    config?: Record<string, unknown>
  ) => Promise<SalesPersonAssignment[]>
}

type SalesStoresService = {
  createSalesStores: (data: Record<string, unknown>) => Promise<SalesStore>
  listSalesStores: (
    selector?: Record<string, unknown>,
    config?: Record<string, unknown>
  ) => Promise<SalesStore[]>
  listSalesStoreStages: (
    selector?: Record<string, unknown>,
    config?: Record<string, unknown>
  ) => Promise<SalesStoreStage[]>
}

type SalesChannelModuleService = {
  listSalesChannels: (
    selector?: Record<string, unknown>,
    config?: Record<string, unknown>
  ) => Promise<SalesChannel[]>
  createSalesChannels: (data: Record<string, unknown>) => Promise<SalesChannel>
}

type ApiKeyModuleService = {
  createApiKeys: (
    data: Record<string, unknown>[]
  ) => Promise<ApiKey[]>
}

type LinkModuleService = {
  create: (data: Record<string, Record<string, string>>) => Promise<void>
}

type CustomerModuleService = {
  createCustomers: (data: Record<string, unknown>) => Promise<Customer>
  retrieveCustomer: (id: string) => Promise<Customer>
}

type CartModuleService = {
  createCarts: (data: Record<string, unknown>) => Promise<Cart>
  retrieveCart: (id: string, config?: Record<string, unknown>) => Promise<Cart>
}

type OrderModuleService = {
  createOrders: (data: Record<string, unknown>) => Promise<Order>
  retrieveOrder: (id: string, config?: Record<string, unknown>) => Promise<Order>
}

const uid = () => Math.random().toString(36).slice(2, 10)

const getSalesPeopleService = (container: unknown) =>
  (container as { resolve: (key: string) => unknown }).resolve(
    "salesPeople"
  ) as SalesPeopleService

const getSalesStoresService = (container: unknown) =>
  (container as { resolve: (key: string) => unknown }).resolve(
    "salesStores"
  ) as SalesStoresService

const getSalesChannelModule = (container: unknown) =>
  (container as { resolve: (key: string) => unknown }).resolve(
    Modules.SALES_CHANNEL
  ) as SalesChannelModuleService

const getApiKeyModule = (container: unknown) =>
  (container as { resolve: (key: string) => unknown }).resolve(
    Modules.API_KEY
  ) as ApiKeyModuleService

const getLinkModule = (container: unknown) =>
  (container as { resolve: (key: string) => unknown }).resolve(
    ContainerRegistrationKeys.LINK
  ) as LinkModuleService

const getCustomerModule = (container: unknown) =>
  (container as { resolve: (key: string) => unknown }).resolve(
    Modules.CUSTOMER
  ) as CustomerModuleService

const getCartModule = (container: unknown) =>
  (container as { resolve: (key: string) => unknown }).resolve(
    Modules.CART
  ) as CartModuleService

const getOrderModule = (container: unknown) =>
  (container as { resolve: (key: string) => unknown }).resolve(
    Modules.ORDER
  ) as OrderModuleService

const ensureSalesChannelId = async (container: unknown) => {
  const salesChannelModule = getSalesChannelModule(container)
  const [existingDefault] = await salesChannelModule.listSalesChannels(
    { name: "Default Sales Channel" },
    { take: 1 }
  )

  if (existingDefault?.id) {
    return existingDefault.id
  }

  const created = await salesChannelModule.createSalesChannels({
    name: "Default Sales Channel",
  })

  return created.id
}

const createRequestHeaders = async (container: unknown) => {
  const salesChannelId = await ensureSalesChannelId(container)
  const apiKeyModule = getApiKeyModule(container)
  const link = getLinkModule(container)

  const result = await apiKeyModule.createApiKeys([
    {
      title: `Integration Admin ${uid()}`,
      type: "secret",
      created_by: "integration-tests",
    },
    {
      title: `Integration Store ${uid()}`,
      type: "publishable",
      created_by: "integration-tests",
    },
  ])

  const adminApiKey = result.find((key) => key.type === "secret")
  const publishableApiKey = result.find((key) => key.type === "publishable")

  if (!adminApiKey?.token || !publishableApiKey?.token) {
    throw new Error("Failed to create API keys for integration tests.")
  }

  await link.create({
    [Modules.API_KEY]: {
      publishable_key_id: publishableApiKey.id,
    },
    [Modules.SALES_CHANNEL]: {
      sales_channel_id: salesChannelId,
    },
  })

  return {
    salesChannelId,
    adminHeaders: {
      Authorization: `Basic ${adminApiKey.token}`,
    } satisfies HeaderMap,
    storeHeaders: {
      "x-publishable-api-key": publishableApiKey.token,
    } satisfies HeaderMap,
  }
}

medusaIntegrationTestRunner({
  inApp: true,
  env: {},
  disableAutoTeardown: true,
  testSuite: ({ api, getContainer }) => {
    describe("Sales workflows endpoints", () => {
      let adminHeaders: HeaderMap
      let storeHeaders: HeaderMap
      let salesChannelId: string

      beforeAll(async () => {
        const headers = await createRequestHeaders(getContainer())
        adminHeaders = headers.adminHeaders
        storeHeaders = headers.storeHeaders
        salesChannelId = headers.salesChannelId
      })

      it("covers migrated sales workflow mutations and subscriber propagation", async () => {
        const salesPeople = getSalesPeopleService(getContainer())
        const salesStores = getSalesStoresService(getContainer())
        const customerModule = getCustomerModule(getContainer())
        const cartModule = getCartModule(getContainer())
        const orderModule = getOrderModule(getContainer())

        const createRepCode = `rep-${uid()}`
        const createResponse = await api.post(
          "/admin/sales-people",
          {
            name: "Route Create Rep",
            email: "route-create-rep@example.com",
            rep_code: createRepCode,
            active: true,
            notes: "created-by-integration-test",
          },
          { headers: adminHeaders }
        )

        expect(createResponse.status).toBe(200)
        expect(createResponse.data.person).toMatchObject({
          name: "Route Create Rep",
          rep_code: createRepCode,
          active: true,
        })

        const [createdPerson] = await salesPeople.listSalesPeople(
          { id: createResponse.data.person.id },
          { take: 1 }
        )
        expect(createdPerson).toBeTruthy()
        expect(createdPerson.rep_code).toBe(createRepCode)

        const personToUpdate = await salesPeople.createSalesPeople({
          name: "Before Update",
          email: "before-update@example.com",
          rep_code: `rep-${uid()}`,
          active: true,
          notes: "before",
        })

        const updateResponse = await api.post(
          `/admin/sales-people/${personToUpdate.id}`,
          {
            name: "After Update",
            active: false,
            notes: "after",
          },
          { headers: adminHeaders }
        )

        expect(updateResponse.status).toBe(200)
        expect(updateResponse.data.person).toMatchObject({
          id: personToUpdate.id,
          name: "After Update",
          active: false,
          notes: "after",
        })

        const [updatedPerson] = await salesPeople.listSalesPeople(
          { id: personToUpdate.id },
          { take: 1 }
        )
        expect(updatedPerson.name).toBe("After Update")
        expect(updatedPerson.active).toBe(false)
        expect(updatedPerson.notes).toBe("after")

        const personForAssignment = await salesPeople.createSalesPeople({
          name: "Assignee",
          rep_code: `rep-${uid()}`,
        })

        const assignmentAddress = "100 Assignments Ave, Denver, CO"
        const assignmentStore = await salesStores.createSalesStores({
          name: "Assignment Store",
          address: assignmentAddress,
          normalized_address: normalizeAddress(assignmentAddress),
          stage: "discovered",
          stage_updated_at: new Date(),
        })

        const assignResponse = await api.post(
          "/admin/sales-people/assignments",
          {
            sales_person_id: personForAssignment.id,
            sales_store_id: assignmentStore.id,
            notes: "assigned-by-route",
          },
          { headers: adminHeaders }
        )

        expect(assignResponse.status).toBe(200)
        expect(assignResponse.data.assignment).toMatchObject({
          sales_person_id: personForAssignment.id,
          sales_store_id: assignmentStore.id,
          notes: "assigned-by-route",
        })

        const [assignment] = await salesPeople.listSalesPersonAssignments(
          { sales_store_id: assignmentStore.id },
          { take: 1 }
        )
        expect(assignment).toBeTruthy()
        expect(assignment.sales_person_id).toBe(personForAssignment.id)

        const [assignedStore] = await salesStores.listSalesStores(
          { id: assignmentStore.id },
          { take: 1 }
        )
        expect(assignedStore.assigned_sales_person_id).toBe(personForAssignment.id)

        const unassignResponse = await api.post(
          "/admin/sales-people/assignments/unassign",
          { sales_store_id: assignmentStore.id },
          { headers: adminHeaders }
        )

        expect(unassignResponse.status).toBe(200)
        expect(unassignResponse.data).toEqual({ success: true })

        const unassignedRows = await salesPeople.listSalesPersonAssignments({
          sales_store_id: assignmentStore.id,
        })
        expect(unassignedRows).toHaveLength(0)

        const [unassignedStore] = await salesStores.listSalesStores(
          { id: assignmentStore.id },
          { take: 1 }
        )
        expect(unassignedStore.assigned_sales_person_id).toBeNull()

        const existingAddress = "300 Bulk Existing Rd, Phoenix, AZ"
        const existingStore = await salesStores.createSalesStores({
          name: "Bulk Existing",
          address: existingAddress,
          normalized_address: normalizeAddress(existingAddress),
          stage: "discovered",
          stage_updated_at: new Date(),
          source: "seed",
        })

        const newAddress = "301 Bulk New Rd, Phoenix, AZ"
        const bulkResponse = await api.post(
          "/admin/sales-stores/bulk",
          {
            stores: [
              {
                name: "Bulk Existing Updated",
                address: existingAddress,
                stage: "qualified",
                notes: "updated-via-bulk",
              },
              {
                name: "Bulk New Store",
                address: newAddress,
                stage: "discovered",
                notes: "created-via-bulk",
              },
            ],
          },
          { headers: adminHeaders }
        )

        expect(bulkResponse.status).toBe(200)
        expect(bulkResponse.data.created).toBe(1)
        expect(bulkResponse.data.updated).toBe(1)
        expect(bulkResponse.data.stores).toHaveLength(2)

        const [updatedExistingStore] = await salesStores.listSalesStores(
          { id: existingStore.id },
          { take: 1 }
        )
        expect(updatedExistingStore.stage).toBe("qualified")
        expect(updatedExistingStore.notes).toBe("updated-via-bulk")

        const [createdBulkStore] = await salesStores.listSalesStores(
          { normalized_address: normalizeAddress(newAddress) },
          { take: 1 }
        )
        expect(createdBulkStore).toBeTruthy()
        expect(createdBulkStore.address).toBe(newAddress)

        const bulkExistingHistory = await salesStores.listSalesStoreStages({
          store_id: existingStore.id,
        })
        const bulkCreatedHistory = await salesStores.listSalesStoreStages({
          store_id: createdBulkStore.id,
        })
        expect(bulkExistingHistory.length).toBeGreaterThan(0)
        expect(bulkCreatedHistory.length).toBeGreaterThan(0)

        const stageAddress = "400 Stage St, Nashville, TN"
        const stageStore = await salesStores.createSalesStores({
          name: "Stage Store",
          address: stageAddress,
          normalized_address: normalizeAddress(stageAddress),
          stage: "discovered",
          stage_updated_at: new Date(),
        })

        const stageResponse = await api.post(
          `/admin/sales-stores/${stageStore.id}/stages`,
          { stage: "contacted", notes: "left a voicemail" },
          { headers: adminHeaders }
        )

        expect(stageResponse.status).toBe(200)
        expect(stageResponse.data.store).toMatchObject({
          id: stageStore.id,
          stage: "contacted",
        })

        const stageHistoryResponse = await api.get(
          `/admin/sales-stores/${stageStore.id}/stages`,
          { headers: adminHeaders }
        )
        expect(stageHistoryResponse.status).toBe(200)
        expect(stageHistoryResponse.data.stages.length).toBeGreaterThan(0)
        expect(stageHistoryResponse.data.stages[0].stage).toBe("contacted")
        expect(stageHistoryResponse.data.stages[0].notes).toBe("left a voicemail")

        const attachPerson = await salesPeople.createSalesPeople({
          name: "Attach Rep",
          rep_code: `rep-${uid()}`,
        })

        const attachCustomer = await customerModule.createCustomers({
          email: `attach-${uid()}@example.com`,
          metadata: { existing_customer_meta: true },
        })

        const attachCart = await cartModule.createCarts({
          currency_code: "usd",
          sales_channel_id: salesChannelId,
          customer_id: attachCustomer.id,
          email: attachCustomer.email,
          metadata: { existing_cart_meta: "kept" },
        })

        const attachResponse = await api.post(
          "/store/sales-people/attach",
          {
            rep_code: attachPerson.rep_code,
            cart_id: attachCart.id,
            customer_id: attachCustomer.id,
          },
          { headers: storeHeaders }
        )

        expect(attachResponse.status).toBe(200)
        expect(attachResponse.data.metadata).toEqual({
          sales_person_id: attachPerson.id,
          sales_person_code: attachPerson.rep_code,
        })

        const attachedCart = await cartModule.retrieveCart(attachCart.id)
        const attachedCustomer = await customerModule.retrieveCustomer(attachCustomer.id)

        expect(attachedCart.metadata).toMatchObject({
          existing_cart_meta: "kept",
          sales_person_id: attachPerson.id,
          sales_person_code: attachPerson.rep_code,
        })
        expect(attachedCustomer.metadata).toMatchObject({
          existing_customer_meta: true,
          sales_person_id: attachPerson.id,
          sales_person_code: attachPerson.rep_code,
        })

        const resetCustomer = await customerModule.createCustomers({
          email: `reset-${uid()}@example.com`,
        })

        const originalCart = await cartModule.createCarts({
          currency_code: "usd",
          sales_channel_id: salesChannelId,
          customer_id: resetCustomer.id,
          email: resetCustomer.email,
          metadata: { reset_marker: "before-reset" },
        })

        const resetResponse = await api.post(
          `/store/carts/${originalCart.id}/reset`,
          {},
          { headers: storeHeaders }
        )

        expect(resetResponse.status).toBe(200)
        expect(resetResponse.data.previous_cart_id).toBe(originalCart.id)
        expect(resetResponse.data.cart.id).toBeTruthy()
        expect(resetResponse.data.cart.id).not.toBe(originalCart.id)

        const newCart = await cartModule.retrieveCart(resetResponse.data.cart.id)
        expect(newCart.currency_code).toBe("usd")
        expect(newCart.customer_id).toBe(resetCustomer.id)
        expect(newCart.email).toBe(resetCustomer.email)
        expect(newCart.metadata).toMatchObject({ reset_marker: "before-reset" })

        const deletedOriginalCart = await cartModule
          .retrieveCart(originalCart.id)
          .catch(() => null)
        expect(deletedOriginalCart).toBeNull()

        const metadataPerson = await salesPeople.createSalesPeople({
          name: "Order Metadata Rep",
          rep_code: `rep-${uid()}`,
        })

        const metadataCustomer = await customerModule.createCustomers({
          email: `order-metadata-${uid()}@example.com`,
          metadata: {
            sales_person_id: metadataPerson.id,
            sales_person_code: metadataPerson.rep_code,
          },
        })

        const metadataOrder = await orderModule.createOrders({
          email: metadataCustomer.email,
          currency_code: "usd",
          customer_id: metadataCustomer.id,
          metadata: { source: "integration-test" },
        })

        const orderBefore = await orderModule.retrieveOrder(metadataOrder.id, {
          select: ["id", "metadata"],
        })
        expect(orderBefore.metadata?.sales_person_id).toBeUndefined()
        expect(orderBefore.metadata?.sales_person_code).toBeUndefined()

        await orderCreatedHandler({
          event: { data: { id: metadataOrder.id } },
          container: getContainer(),
        } as never)

        const orderAfter = await orderModule.retrieveOrder(metadataOrder.id, {
          select: ["id", "metadata"],
        })
        expect(orderAfter.metadata).toMatchObject({
          source: "integration-test",
          sales_person_id: metadataPerson.id,
          sales_person_code: metadataPerson.rep_code,
        })
      })
    })
  },
})
