import SearchForm from "@/components/SearchForm";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <Card className="p-10">
      <h1 className="uppercase">My GitHub Resume</h1>
      <Separator className="my-4" />
      <p className="mb-4">
        As a software startup owner, I truly appreciate it when individuals
        share their résumés with us, especially when they include their GitHub
        account. It provides us with a tangible glimpse of their actual work.
      </p>
      <p className="mb-4">
        Inspired by a tweet from John Resig, I envisioned the idea that it could
        be beneficial for individuals to generate their GitHub-based résumés.
      </p>
      <SearchForm />
    </Card>
  );
}
