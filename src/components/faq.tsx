export function FaqList({ items }: { items: ReadonlyArray<readonly [string, string]> }) {
  return (
    <div className="divide-y divide-black/10 border-y border-black/10">
      {items.map(([q, a]) => (
        <details key={q} className="group py-5">
          <summary className="flex cursor-pointer items-center justify-between gap-4 font-extrabold">
            <span>{q}</span>
            <span
              aria-hidden
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink text-magenta transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-muted">{a}</p>
        </details>
      ))}
    </div>
  );
}
