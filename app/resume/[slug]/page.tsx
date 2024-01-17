import { UserLanguages } from "@/components/Languages";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDateToLocal, getData, getInitials } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function ResumePage({
  params,
}: {
  params: { slug: string };
}) {
  const user = await getData(`https://api.github.com/users/${params.slug}`);

  if (!user) {
    notFound();
  }

  return (
    <Card className="p-10">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex items-center justify-between">
          <h1 className="uppercase">{user.name}</h1>
          <Avatar>
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </div>

        <h2 className="uppercase">Passionate github user</h2>
        <Separator className="my-4" />
        <p>Website: {user.blog}</p>
        <p>Public repos: {user.public_repos}</p>
        <p>Created at: {formatDateToLocal(user.created_at)}</p>
        <UserLanguages user={user.login} />
      </Suspense>
    </Card>
  );
}
