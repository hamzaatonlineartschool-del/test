import { cn } from "@/lib/utils";

type ChapterLabelProps = {
  index: string;
  title: string;
  className?: string;
};

export function ChapterLabel({ index, title, className }: ChapterLabelProps) {
  return (
    <p
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.38em]",
        className,
      )}
    >
      <span className="text-white/35">{index}</span>
      <span className="mx-2 text-white/25">·</span>
      <span className="text-sky-400/90">{title}</span>
    </p>
  );
}
