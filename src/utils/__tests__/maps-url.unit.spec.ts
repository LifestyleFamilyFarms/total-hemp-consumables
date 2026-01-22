import { buildMapsSegments } from "../maps-url"

describe("buildMapsSegments", () => {
  it("returns a single segment when under waypoint limit", () => {
    const stops = [
      { address: "Start" },
      { address: "Stop A" },
      { address: "Stop B" },
      { address: "End" },
    ]

    const segments = buildMapsSegments(stops, 5)

    expect(segments).toHaveLength(1)
    expect(segments[0].stopCount).toBe(4)
    expect(segments[0].url).toContain("google.com/maps/dir")
  })

  it("splits segments when exceeding waypoint limit", () => {
    const stops = [
      { address: "Start" },
      { address: "Stop A" },
      { address: "Stop B" },
      { address: "Stop C" },
      { address: "Stop D" },
      { address: "End" },
    ]

    const segments = buildMapsSegments(stops, 2)

    expect(segments.length).toBeGreaterThan(1)
    expect(segments[0].stopCount).toBeLessThanOrEqual(4)
  })

  it("returns empty for less than two stops", () => {
    expect(buildMapsSegments([], 3)).toEqual([])
    expect(buildMapsSegments([{ address: "Only" }], 3)).toEqual([])
  })
})
