# Keep the research bundle with each course

Each generated course repository will include every research artifact, including draft findings and `open-questions.md`, alongside the static React course, while keeping the reusable skill's orchestration scripts and subskills outside the course repository. This preserves source provenance and makes later updates inspectable from one repository without shipping generation machinery in the course app; `research/status.json` must distinguish `draft` from `approved`, and the course generator must refuse unapproved research.
