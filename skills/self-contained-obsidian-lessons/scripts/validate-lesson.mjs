import fs from 'node:fs';

const lessonPath = process.argv[2];
const failures = [];

if (!lessonPath) {
  console.error('FAIL: missing lesson path argument');
  process.exit(1);
}

let content = '';
try {
  content = fs.readFileSync(lessonPath, 'utf8');
} catch {
  console.error('FAIL: file does not exist or is not readable');
  process.exit(1);
}

const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
if (!frontmatterMatch) {
  failures.push('missing YAML frontmatter');
}

const frontmatter = frontmatterMatch?.[1] ?? '';
const requiredFrontmatter = [
  'chapter',
  'title',
  'repo',
  'pinned_version',
  'prerequisites',
  'next_chapter',
  'prev_chapter',
  'last_updated',
];

for (const field of requiredFrontmatter) {
  if (!new RegExp(`^${field}:`, 'm').test(frontmatter)) {
    failures.push(`frontmatter missing ${field}`);
  }
}

const pinnedVersion = (frontmatter.match(/^pinned_version:\s*"?(.*?)"?\s*$/m) || [])[1]?.trim() ?? '';
if (!pinnedVersion) {
  failures.push('pinned_version is empty');
}

const defaultBranchBlobPattern = new RegExp(
  `https://github\\\\.com/[^\\\\s)]+/blob/(${['master', 'main'].join('|')})/`,
);
if (defaultBranchBlobPattern.test(content)) {
  failures.push('contains default-branch blob link');
}

if (pinnedVersion) {
  if (!content.includes(`/blob/${pinnedVersion}/`)) {
    failures.push(`missing /blob/${pinnedVersion}/ source URL`);
  }
}

const orderedMarkers = [
  '# Chapter',
  '> ⚠️ **บทนี้อ้างอิง',
  '## 🗺️ บทนี้อยู่ตรงไหนของภาพรวม',
  '## 📖 Vocabulary ก่อนเริ่มเลย',
  '## 🤔 What?',
  '## ❓ Why?',
  '## 🌍 ของจริงใช้ที่ไหน',
  '## 🖼️ เปรียบเทียบให้เห็นภาพ',
  '## ⚙️ How?',
  '## 🧠 Checkpoint #1',
  '## 💻 Hands-On',
  '## 🚫 4 บาปที่ห้ามทำ',
  '## 🔬 Deep Dive — Edge Cases',
  '## 🏗️ Mini Project',
  '## 🧠 Checkpoint #2',
  '## ❓ 5 คำถามทบทวน',
  '## 💬 ถ้าติดจริงๆ',
  '## 🔗 สรุปและเชื่อมบทถัดไป',
  '## 📎 Resources',
];

let lastIndex = -1;
for (const marker of orderedMarkers) {
  const nextIndex = content.indexOf(marker, lastIndex + 1);
  if (nextIndex === -1) {
    failures.push(`missing ordered section marker: ${marker}`);
    continue;
  }
  if (nextIndex < lastIndex) {
    failures.push(`section out of order: ${marker}`);
  }
  lastIndex = nextIndex;
}

const majorHeadings = content.split('\n').filter((line) => line.startsWith('## '));
for (const heading of majorHeadings) {
  if (!heading.includes('⏱️')) {
    failures.push(`major heading missing time-box: ${heading}`);
  }
}

const checkpointHeadingCount = (content.match(/^## 🧠 Checkpoint #/gm) || []).length;
if (checkpointHeadingCount < 2) {
  failures.push('contains fewer than two checkpoint headings');
}

const checklistCount = (content.match(/^- \[ \]/gm) || []).length;
if (checklistCount < 2) {
  failures.push('contains fewer than two checklist items');
}

if (!content.includes('> 🛑 **หยุดก่อน! เดาก่อนรัน**')) {
  failures.push('missing predict-before-run prompt');
}
if (!content.includes('<details><summary>')) {
  failures.push('missing details summary block');
}

const exerciseMatches = [...content.matchAll(/^### Exercise /gm)];
if (exerciseMatches.length < 3) {
  failures.push('contains fewer than three exercises');
}

const nextExerciseOrMajor = /^### Exercise |^## /gm;
for (let i = 0; i < exerciseMatches.length; i += 1) {
  const start = exerciseMatches[i].index ?? 0;
  nextExerciseOrMajor.lastIndex = start + 1;
  const nextMatch = nextExerciseOrMajor.exec(content);
  const end = nextMatch ? nextMatch.index : content.length;
  const block = content.slice(start, end);
  if (!block.includes('**ผลที่ควรได้:**')) {
    failures.push(`exercise ${i + 1} missing expected output`);
  }
  if (!block.includes('| ถ้าเห็น... | แปลว่า | แก้ยังไง |')) {
    failures.push(`exercise ${i + 1} missing self-check table`);
  }
}

for (const label of ['Exercise 2', 'Exercise 3']) {
  const start = content.indexOf(`### ${label}`);
  if (start === -1) {
    failures.push(`${label} block missing`);
    continue;
  }
  nextExerciseOrMajor.lastIndex = start + 1;
  const nextMatch = nextExerciseOrMajor.exec(content);
  const end = nextMatch ? nextMatch.index : content.length;
  const block = content.slice(start, end);
  const diffMatch = block.match(/```diff\n([\s\S]*?)```/);
  if (!diffMatch) {
    failures.push(`${label} missing diff block`);
    continue;
  }
  if (!/^\+/m.test(diffMatch[1])) {
    failures.push(`${label} diff block missing added lines`);
  }
}

const miniProjectStart = content.indexOf('## 🏗️ Mini Project');
if (miniProjectStart === -1) {
  failures.push('mini project section missing');
} else {
  nextExerciseOrMajor.lastIndex = miniProjectStart + 1;
  const nextMatch = nextExerciseOrMajor.exec(content);
  const end = nextMatch ? nextMatch.index : content.length;
  const block = content.slice(miniProjectStart, end);
  if (!block.includes('**ผลที่ควรได้:**')) {
    failures.push('mini project missing expected output');
  }
  if (!block.includes('| ถ้าเห็น... | แปลว่า | แก้ยังไง |')) {
    failures.push('mini project missing self-check table');
  }
}

if (!content.includes('## 🚫 4 บาปที่ห้ามทำ')) {
  failures.push('missing anti-pattern heading');
}
for (const label of ['บาปที่ 1', 'บาปที่ 2', 'บาปที่ 3', 'บาปที่ 4']) {
  if (!content.includes(label)) {
    failures.push(`missing anti-pattern label: ${label}`);
  }
}

if (!content.includes('ถ้าเกิน') || !content.includes('ข้ามไป Hands-On ก่อน')) {
  failures.push('missing How section escape hatch');
}

for (const field of ['สิ่งที่ทำ:', 'คาดว่าจะได้:', 'ได้จริง:', 'ลองแก้แล้ว:', 'Node version:']) {
  if (!content.includes(field)) {
    failures.push(`missing escalation template field: ${field}`);
  }
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(`FAIL: ${failure}`);
  }
  process.exit(1);
}

console.log('PASS: lesson contract satisfied');
