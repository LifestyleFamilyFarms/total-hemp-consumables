export type Carrier = {
    carrier_id: string
    disabled_by_billing_plan: boolean
    friendly_name: string
    services: {
        service_code: string
        name: string
    }[]
    packages: {
        package_code: string
    }[]
    [k: string]: unknown
}

export type CarriersResponse = {
    carriers: Carrier[]
}

export type ShipStationAddress = {
    name: string
    phone: string
    email?: string | null
    company_name?: string | null
    address_line1: string
    address_line2?: string | null
    address_line3?: string | null
    city_locality: string
    state_province: string
    postal_code: string
    country_code: string
    address_residential_indicator: "unknown" | "yes" | "no"
    instructions?: string | null
    geolocation?: {
      type?: string
      value?: string
    }[]
  }