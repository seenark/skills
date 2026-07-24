export function CodeBlock({ code, path }: { code: string; path: string }) {
  return <div className="code-block"><div className="code-header"><span>{path}</span><button type="button" onClick={() => navigator.clipboard?.writeText(code)}>Copy</button></div><pre><code>{code}</code></pre></div>;
}
