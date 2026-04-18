import { cn } from "@/lib/utils";

type SectionHeadProps = {
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
  className?: string;
  /** Light surfaces (e.g. pale section bg) — uses slate text instead of white */
  tone?: "dark" | "light";
  /** Optional id for the title element (e.g. section `aria-labelledby`) */
  titleId?: string;
};

export function SectionHead({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className,
  tone = "dark",
  titleId,
}: SectionHeadProps) {
  const light = tone === "light";

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center"
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div
        className={cn(
          "max-w-2xl",
          align === "center" && "mx-auto max-w-3xl items-center",
        )}
      >
        <p
          className={cn(
            "text-[11px] font-semibold uppercase tracking-[0.38em]",
            light ? "text-slate-500" : "text-white/40",
          )}
        >
          {index && (
            <>
              <span className={light ? "text-slate-400" : "text-white/30"}>
                {index}
              </span>
              <span
                className={light ? "mx-2 text-slate-300" : "mx-2 text-white/20"}
              >
                ·
              </span>
            </>
          )}
          <span className={light ? "text-sky-600" : "text-sky-400/90"}>
            {eyebrow}
          </span>
        </p>
        <h2
          id={titleId}
          className={cn(
            "mt-4 font-display text-[clamp(1.5rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-tight",
            light ? "text-[#0f172a]" : "text-white",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-4 text-base leading-relaxed md:text-lg",
              light ? "text-slate-600" : "text-white/60",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
