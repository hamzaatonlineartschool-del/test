"use client";

const DEFAULT_LABELS = [
  "Microsoft 365",
  "Salesforce",
  "Zendesk",
  "ServiceNow",
  "AWS",
  "Google Cloud",
  "Slack",
  "HubSpot",
] as const;

type LogoMarqueeProps = {
  labels?: readonly string[];
  subtitle?: string;
};

export function LogoMarquee({
  labels = DEFAULT_LABELS,
  subtitle = "Trusted tools & ecosystems",
}: LogoMarqueeProps) {
  const row = [...labels, ...labels];

  return (
    <div className="relative border-y border-white/[0.06] bg-[#080a10]/80 py-7 md:py-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #0c0e14 0%, transparent 12%, transparent 88%, #0c0e14 100%)",
        }}
        aria-hidden
      />
      <p className="relative mb-5 text-center text-[10px] font-semibold uppercase tracking-[0.4em] text-white/35">
        {subtitle}
      </p>
      <div className="relative overflow-hidden">
        <div className="flex w-max gap-12 md:gap-20 animate-marquee items-center pr-12 md:pr-20">
          {row.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="shrink-0 font-display text-base font-semibold tracking-tight text-white/25 md:text-lg"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
