/** Homepage about / proof metrics — copy can evolve with real data */
export const siteStats = [
  {
    id: "csat",
    tag: "Quality",
    label: "Client satisfaction",
    insight: "Measured CSAT across live programs",
    value: 98,
    suffix: "%",
  },
  {
    id: "programs",
    tag: "Delivery",
    label: "Programs delivered",
    insight: "End-to-end engagements completed",
    value: 120,
    suffix: "+",
  },
  {
    id: "tenure",
    tag: "Stability",
    label: "Years in operations",
    insight: "Continuous operating maturity",
    value: 12,
    suffix: "+",
  },
  {
    id: "bench",
    tag: "Scale",
    label: "Specialists on tap",
    insight: "Vetted talent ready to flex in",
    value: 450,
    suffix: "+",
  },
] as const;
