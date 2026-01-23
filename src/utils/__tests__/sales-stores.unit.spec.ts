import { normalizeAddress } from "../sales-stores"

describe("normalizeAddress", () => {
  it("lowercases and trims whitespace", () => {
    expect(normalizeAddress("  123 Main St  ")).toBe("123 main st")
  })

  it("collapses internal whitespace", () => {
    expect(normalizeAddress("123   Main   St")).toBe("123 main st")
  })

  it("handles mixed case with punctuation", () => {
    expect(normalizeAddress("456 Elm St, Suite 2")).toBe(
      "456 elm st, suite 2"
    )
  })
})
