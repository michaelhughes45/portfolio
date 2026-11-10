/**
 * Validates every project file the same way the site build does, without Next.js.
 * Usage: npm run check:content
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { ContentError, isProjectFile, parseProjectFile, prepareProjects } from "../src/lib/content/parse";
import type { Project } from "../src/lib/content/schema";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content", "projects");
const PUBLIC_DIR = path.join(ROOT, "public");

function problemsOf(error: unknown) {
  if (error instanceof ContentError) return error.problems;
  throw error;
}

function checkFile(fileName: string): { project: Project | null; problems: string[] } {
  const file = `content/projects/${fileName}`;
  try {
    const project = parseProjectFile(file, readFileSync(path.join(CONTENT_DIR, fileName), "utf8"));
    const coverMissing = !existsSync(path.join(PUBLIC_DIR, project.cover));
    if (coverMissing && project.draft) {
      console.warn(`  ! ${file}: cover: ${project.cover} not found in public/ (allowed for drafts)`);
    }
    const problems = coverMissing && !project.draft ? [`${file}: cover: ${project.cover} not found in public/`] : [];
    return { project, problems };
  } catch (error) {
    return { project: null, problems: problemsOf(error) };
  }
}

function main() {
  const fileNames = readdirSync(CONTENT_DIR).filter(isProjectFile).sort();
  const projects: Project[] = [];
  let failed = 0;

  for (const fileName of fileNames) {
    const { project, problems } = checkFile(fileName);
    if (project) projects.push(project);
    if (problems.length > 0) {
      failed++;
      console.log(`✗ content/projects/${fileName}`);
      for (const problem of problems) console.log(`    ${problem}`);
    } else {
      console.log(`✓ content/projects/${fileName}${project?.draft ? " (draft)" : ""}`);
    }
  }

  try {
    prepareProjects(projects, { production: true });
  } catch (error) {
    failed++;
    for (const problem of problemsOf(error)) console.log(`✗ ${problem}`);
  }

  if (failed > 0) {
    console.log("\nContent check failed.");
    process.exit(1);
  }
  console.log(`\nContent check passed (${fileNames.length} file${fileNames.length === 1 ? "" : "s"}).`);
}

main();
