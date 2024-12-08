import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col gap-4">
      <Button>click me!!</Button>
      <ModeToggle />
    </div>
  );
}
