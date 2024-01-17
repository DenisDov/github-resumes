import { getData } from "@/lib/utils";

export async function UserLanguages({ user }: { user: string }) {
  const repos = await getData(
    `https://api.github.com/users/${user}/repos?per_page=10&sort=pushed&direction=desc`
  );
  //   console.log("repos: ", repos);

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

  const repositoryInfo = repos.map((repo) => ({
    name: repo.name,
    lastPush: repo.pushed_at,
    url: repo.html_url,
  }));
  console.log("repositoryInfo: ", repositoryInfo);

  return (
    <div>
      <p>Languages</p>
      <ul>
        {languageWithPercentage.map((lang) => (
          <li key={lang.name}>
            {lang.name}: {lang.percentage + "%"}
          </li>
        ))}
      </ul>
      <p>Repos</p>
      <ul>
        {repositoryInfo.map((repo) => (
          <li key={repo.name}>
            {repo.name}, {repo.lastPush}, {repo.url}
          </li>
        ))}
      </ul>
    </div>
  );
}
