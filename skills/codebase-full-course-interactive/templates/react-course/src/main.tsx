import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { createRootRoute, createRoute, createRouter, Link, Outlet, RouterProvider, useParams } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { lessons, type Lesson } from "./course";
import { SourceLink } from "./SourceLink";
import "./styles.css";

function Layout() {
  return <div className="app"><header><Link to="/">Course Engine Demo</Link><nav><Link to="/course/$lessonId" params={{ lessonId: "trim-and-validate" }}>Lesson</Link> <Link to="/sources">Sources</Link></nav></header><Outlet /></div>;
}

function Home() {
  return <main className="shell"><p className="eyebrow">Interactive developer course</p><h1>Read real code by following real behavior.</h1><p className="lead">This template renders structured TypeScript content through reusable primitives.</p><Link className="button" to="/course/$lessonId" params={{ lessonId: "trim-and-validate" }}>Start lesson</Link></main>;
}

function SourcesPage() {
  return <main className="shell"><p className="eyebrow">Provenance</p><h1>Sources</h1><p className="lead">Every excerpt points to the repository and immutable revision used to teach it.</p><SourceLink href="https://github.com/seenark/skills" label="Open source repository" /></main>;
}

function LessonPage() {
  const { lessonId } = useParams({ from: "/course/$lessonId" });
  const lesson = lessons.find((item) => item.id === lessonId);
  if (!lesson) return <main className="shell"><h1>Lesson not found</h1><Link to="/">Return home</Link></main>;
  return <main className="shell"><p className="eyebrow">Question-driven lesson</p><h1>{lesson.title}</h1><p className="lead">{lesson.question}</p><button className="copy-link" type="button" onClick={() => navigator.clipboard?.writeText(location.href)}>Copy lesson link</button>{lesson.sections.map((section) => <Section key={section.id} section={section} />)}</main>;
}

function Section({ section }: { section: Lesson["sections"][number] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  return <section id={section.id} className="section"><div className="section-heading"><span className="section-id">#{section.id}</span><h2>{section.title}</h2></div>{section.body && <p>{section.body}</p>}{section.type === "prediction" && <div className="options">{section.options?.map((option, index) => <button key={option} className={selected === index ? "option selected" : "option"} onClick={() => setSelected(index)}>{option}</button>)}{selected !== null && <div className="feedback">{selected === section.answer ? "Exactly — follow the responsibility boundary." : "Not quite — trace the next observable responsibility."}</div>}</div>}{section.type === "flow" && <><div className="flow">{section.steps?.map((step, index) => <motion.div key={step} className="flow-step" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>{index + 1}. {step}</motion.div>)}</div><ArchitectureDiagram /></>}</section>;
}

const rootRoute = createRootRoute({ component: Layout });
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: Home });
const sourcesRoute = createRoute({ getParentRoute: () => rootRoute, path: "/sources", component: SourcesPage });
const lessonRoute = createRoute({ getParentRoute: () => rootRoute, path: "/course/$lessonId", component: LessonPage });
const routeTree = rootRoute.addChildren([indexRoute, sourcesRoute, lessonRoute]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" { interface Register { router: typeof router } }

createRoot(document.getElementById("root")!).render(<StrictMode><RouterProvider router={router} /></StrictMode>);
