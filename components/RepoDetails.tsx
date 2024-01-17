import { Separator } from "@/components/ui/separator";
import { getData } from "@/lib/utils";

export async function RepoDetails({ user }: { user: string }) {
  const repos = await getData(
    `https://api.github.com/users/${user}/repos?per_page=10&sort=pushed&direction=desc`
  );

  const languages = repos.map((repo) => repo.language).filter(Boolean);

  // Calculate the percentage for each language
  const languageCounts = languages.reduce((acc, language) => {
    acc[language] = (acc[language] || 0) + 1;
    return acc;
  }, {});

  const totalLanguages = languages.length;

  // Convert counts to percentages and create an array of objects
  const languageWithPercentage = Object.entries(languageCounts).map(
    ([language, count]) => ({
      name: language,
      percentage: ((count / totalLanguages) * 100).toFixed(0),
    })
  );
  console.log("languageWithPercentage: ", languageWithPercentage);

  const repositoryInfo = repos.map((repo) => {
    const creationDate = new Date(repo.created_at).getFullYear();
    const lastCommitDate = new Date(repo.updated_at).getFullYear();
    const developmentPeriod =
      creationDate === lastCommitDate
        ? `${creationDate}`
        : `${creationDate} – ${lastCommitDate}`;
    return {
      name: repo.name,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      description: repo.description || "No description available.",
      developmentPeriod,
    };
  });

  return (
    <>
      <div className="flex">
        <div className="basis-1/4 shrink-0">Languages</div>
        <div className="flex-grow">
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

      <div className="flex">
        <div className="basis-1/4 shrink-0">Latest repositories</div>
        <div className="flex-grow">
          {repositoryInfo.map((repo) => (
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
              <p className="text-xs mb-4">{repo.language}</p>
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
