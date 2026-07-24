export type Section = {
  id: string;
  type: "concept" | "prediction" | "flow" | "sequence" | "quiz" | "takeaway";
  title: string;
  body?: string;
  options?: string[];
  answer?: number;
  steps?: string[];
};

export type Lesson = { chapterId: string; id: string; title: string; question: string; sections: Section[] };

export const lessons: Lesson[] = [
  {
    chapterId: "request-flow", id: "trim-and-validate", title: "Why validate before dispatch?", question: "What must happen before a request can be dispatched?",
    sections: [
      { id: "problem", type: "concept", title: "Start with observable behavior", body: "A useful course begins with something the learner can observe, then traces the smallest path that explains it." },
      { id: "predict", type: "prediction", title: "Predict the next step", options: ["Render immediately", "Validate and dispatch", "Write to a database"], answer: 1 },
      { id: "takeaway", type: "takeaway", title: "Mental model", body: "Validation is a boundary before downstream work." },
    ],
  },
  {
    chapterId: "request-flow", id: "branch-on-empty", title: "Where does an empty request go?", question: "Which branch handles an empty request?",
    sections: [
      { id: "problem", type: "concept", title: "Errors are part of the path", body: "A trace is incomplete if it only follows the happy path." },
      { id: "flow", type: "flow", title: "Follow the branch", steps: ["Read normalized text", "Check length", "Return rejection"] },
      { id: "takeaway", type: "takeaway", title: "Mental model", body: "A branch is a responsibility boundary with distinct outcomes." },
    ],
  },
  {
    chapterId: "request-flow", id: "dispatch-result", title: "How does accepted text become a result?", question: "What does dispatch change before returning?",
    sections: [
      { id: "sequence", type: "sequence", title: "Watch the handoff", steps: ["Handler accepts text", "Dispatcher transforms text", "Result becomes observable"] },
      { id: "quiz", type: "quiz", title: "Checkpoint", options: ["The dispatcher", "The entry boundary"], answer: 0 },
      { id: "takeaway", type: "takeaway", title: "Mental model", body: "Follow data ownership to find the right change point." },
    ],
  },
];
