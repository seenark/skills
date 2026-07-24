export {};

const projects = ["templates/react-course", "examples/example-course"];
for (const project of projects) {
  const subprocess = Bun.spawn(["bun", "run", "build"], { cwd: project, stdout: "inherit", stderr: "inherit" });
  const exitCode = await subprocess.exited;
  if (exitCode !== 0) throw new Error(`Build failed for ${project} with exit code ${exitCode}`);
}
