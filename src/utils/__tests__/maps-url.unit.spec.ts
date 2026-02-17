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

  it("always progresses for oversized addresses", () => {
    const long = "A".repeat(3000)
    const stops = [
      { address: `${long}-start` },
      { address: `${long}-middle` },
      { address: `${long}-end` },
    ]

    const segments = buildMapsSegments(stops, 10)

    expect(segments.length).toBeGreaterThan(0)
    segments.forEach((segment) => {
      expect(segment.stopCount).toBeGreaterThanOrEqual(2)
      expect(segment.url).toContain("google.com/maps/dir")
    })
  })
})
