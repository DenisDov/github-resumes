import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container mx-auto">
        <Card>
          <div className="p-10">
            <h1 className="text-center uppercase mb-4">My GitHub Resume</h1>
            <div className="flex items-center gap-2">
              <Input placeholder="Enter your GitHub username and click on generate" />
              <Button>Generate</Button>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
