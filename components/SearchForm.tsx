"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const nameValue = formData.get("name");
    router.push(`/resume/${nameValue}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
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
