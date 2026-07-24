import { expect, test } from "bun:test";
import { courseSchema } from "../schemas/course";
import { researchStatusSchema } from "../schemas/research";

test("research status exposes approval lifecycle", () => {
  expect(researchStatusSchema.parse("approved")).toBe("approved");
});

test("course schema rejects an empty course", () => {
  expect(courseSchema.safeParse({}).success).toBe(false);
});
