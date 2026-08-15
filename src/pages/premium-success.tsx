import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks";

function PremiumSuccess() {
  const membershipType = useAppSelector((state) => state.user.membershipType);

  return (
    <div className="flex flex-1 flex-col">
      <section className="relative overflow-hidden border-b border-border bg-card/30">
        <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-primary/10 to-transparent" />
        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-20 text-center">
          <Badge className="gap-1.5 px-3">
            <Sparkles className="size-3.5" />
            Premium
          </Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            You're all set.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-muted-foreground sm:text-lg">
            Your payment went through and your account is now marked{" "}
            {membershipType ? `as ${membershipType}` : "Premium"}. Enjoy the
            extra room to discover the people and projects that click.
          </p>
          <Button size="lg" className="mt-8" render={<Link to="/feed" />}>
            Back to discovery
            <ArrowRight />
          </Button>
        </div>
      </section>
    </div>
  );
}

export default PremiumSuccess;
