"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nameValue = formData.get("name");
    router.push(`/resume/${nameValue}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:flex-row">
      <Input
        placeholder="Enter your GitHub username and click on generate"
        required
        type="text"
        name="name"
      />
      <Button type="submit">Generate</Button>
    </form>
  );
}
