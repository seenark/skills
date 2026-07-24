import { Background, Controls, ReactFlow, type Edge, type Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const nodes: Node[] = [
  { id: "entry", position: { x: 0, y: 40 }, data: { label: "Entry point" }, type: "default" },
  { id: "validate", position: { x: 180, y: 40 }, data: { label: "Validate" }, type: "default" },
  { id: "dispatch", position: { x: 360, y: 40 }, data: { label: "Dispatch" }, type: "default" },
];
const edges: Edge[] = [{ id: "entry-validate", source: "entry", target: "validate" }, { id: "validate-dispatch", source: "validate", target: "dispatch" }];

export function ArchitectureDiagram() {
  return <div className="diagram" aria-label="Request execution flow"><ReactFlow nodes={nodes} edges={edges} nodesDraggable={false} nodesConnectable={false} fitView><Background /><Controls /></ReactFlow></div>;
}
