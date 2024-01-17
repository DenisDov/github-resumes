import { RepoDetails } from "@/components/RepoDetails";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDateToLocal, fetchData, getInitials } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function ResumePage({
  params,
}: {
  params: { slug: string };
}) {
  const user = await fetchData(`https://api.github.com/users/${params.slug}`);

  if (!user) {
    notFound();
  }

  return (
    <Card className="md:p-10 p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex items-center justify-between">
          <h1 className="uppercase">{user.name}</h1>
          <Avatar>
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </div>

        <h2 className="uppercase text-muted-foreground">
          Passionate github user
        </h2>

        <Separator className="my-4" />

        <div className="md:flex">
          <div className="md:w-1/4">Website</div>
          <div className="md:w-3/4">
            <a href={user.blog} target="blank">
              {user.blog}
            </a>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex">
          <div className="w-1/2 md:w-1/4">Public repos</div>
          <div className="w-1/2 md:w-1/4">{user.public_repos}</div>
        </div>

        <Separator className="my-4" />
        <div className="flex">
          <div className="w-1/2 md:w-1/4">Created at</div>
          <div className="w-1/2 md:w-1/4">
            {formatDateToLocal(user.created_at)}
          </div>
        </div>

        <Separator className="my-4" />

        <RepoDetails user={user.login} />

        <p className="text-muted-foreground">
          {`This résumé is generated automatically using public information from
          the developer's GitHub account. The repositories are ordered by
          popularity based on a very simple popularity heuristic that defines
          the popularity of a repository by its sum of watchers and forks.`}
        </p>
      </Suspense>
    </Card>
  );
}
