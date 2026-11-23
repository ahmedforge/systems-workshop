import Workshop from "../components/Workshop";
import { recentRepos } from "../content";
export const revalidate = 86400;
type Repo = {
  name: string;
  html_url: string;
  updated_at: string;
  fork: boolean;
  size: number;
};
async function recent() {
  try {
    const response = await fetch(
      "https://api.github.com/users/ahmedforge/repos?sort=updated&per_page=100",
      { next: { revalidate }, signal: AbortSignal.timeout(4500) },
    );
    if (!response.ok) throw Error();
    const repos: Repo[] = await response.json();
    return repos
      .filter((r) => !r.fork && r.size && r.name !== "ahmedforge")
      .slice(0, 3)
      .map((r) => ({
        name: r.name,
        url: r.html_url,
        date: r.updated_at.slice(0, 10),
      }));
  } catch {
    return recentRepos
      .slice(0, 3)
      .map((r) => ({
        name: r.name,
        url: r.html_url,
        date: r.updated_at.slice(0, 10),
      }));
  }
}
export default async function Page() {
  return <Workshop recent={await recent()} />;
}
