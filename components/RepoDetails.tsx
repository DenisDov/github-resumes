import { Separator } from "@/components/ui/separator";
import { Repository } from "@/lib/types";
import { fetchData, getLanguages, getRepoDetails } from "@/lib/utils";

export async function RepoDetails({ user }: { user: string }) {
  const repositories = await fetchData(
    `https://api.github.com/users/${user}/repos?per_page=10&sort=pushed&direction=desc`
  );

  const languageWithPercentage = await getLanguages(repositories);
  const repositoryInfo = await getRepoDetails(repositories);

  return (
    <>
      <div className="flex">
        <div className="w-1/2 md:w-1/4">Languages</div>
        <div className="w-1/2 md:w-1/4">
          <ul>
            {languageWithPercentage.map((lang) => (
              <li key={lang.name}>
                {lang.name}: {lang.percentage + "%"}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Separator className="my-4" />

      <div className="md:flex">
        <div className="md:w-1/4">Latest repositories</div>
        <div className="md:w-3/4">
          {repositoryInfo.map((repo: Repository) => (
            <div key={repo.name}>
              <div className="flex justify-between">
                <a
                  href={repo.url}
                  target="blank"
                  className="text-lg capitalize"
                >
                  {repo.name}
                </a>
                <span className="text-xs">{repo.developmentPeriod}</span>
              </div>
              <p className="text-xs mb-4 text-muted-foreground">
                {repo.language}
              </p>
              <p className="text-sm mb-4">{repo.description}</p>
              <p className="text-sm">{`This repository has ${repo.stars} stars and ${repo.forks} forks.`}</p>

              <Separator className="my-4" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
