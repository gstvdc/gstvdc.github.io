import { PROJECTS, type RepoMeta } from "@/lib/projects";

const API = "https://api.github.com/repos";

async function get(url: string) {
  const token = process.env.GITHUB_TOKEN;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}

/**
 * Runs at build time (the site is a static export), so visitors never hit the GitHub API
 * and its rate limit. The deploy workflow rebuilds daily to keep the dates fresh. When the
 * API is unavailable the projects simply keep their static data.
 */
export async function fetchProjectMeta(): Promise<Record<string, RepoMeta>> {
  const entries = await Promise.all(
    PROJECTS.filter((p) => !p.private && p.owner && p.repo).map(async (p) => {
      const url = `${API}/${p.owner}/${p.repo}`;
      try {
        const [repo, commits] = await Promise.all([
          get(url),
          get(`${url}/commits?per_page=1`),
        ]);
        const homepage: string = repo.homepage || "";
        const meta: RepoMeta = {
          htmlUrl: repo.html_url,
          liveUrl: homepage
            ? homepage.startsWith("http")
              ? homepage
              : `https://${homepage}`
            : undefined,
          lastCommit: commits[0]?.commit?.committer?.date ?? repo.pushed_at,
        };
        return [p.id, meta] as const;
      } catch (error) {
        console.warn(`[github] ${p.id}: ${(error as Error).message}`);
        return [p.id, {}] as const;
      }
    })
  );
  return Object.fromEntries(entries);
}
