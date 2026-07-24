export type Request = { text: string };
export type Result = { kind: "accepted" | "rejected"; value: string };

export function handle(request: Request): Result {
  const text = request.text.trim();
  if (text.length === 0) return { kind: "rejected", value: "empty request" };
  return dispatch(text);
}

function dispatch(text: string): Result {
  return { kind: "accepted", value: text.toUpperCase() };
}
