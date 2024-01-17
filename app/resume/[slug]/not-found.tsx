import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function NotFound() {
  return (
    <Card className="p-10">
      <h1 className="uppercase">User not found</h1>
      <Separator className="my-4" />
      <p>
        The user you requested was not found. Please check your spelling and try
        again.
      </p>
      <Separator className="my-4" />
      <Link href="/">Back</Link>
    </Card>
  );
}
