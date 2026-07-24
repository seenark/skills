export function SourceLink({ href, label = "Open pinned source" }: { href: string; label?: string }) {
  return <a className="source-link" href={href} target="_blank" rel="noreferrer">{label} ↗</a>;
}
