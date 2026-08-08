import { ArrowRight, Handshake, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Sparkles,
    title: "Signal over noise",
    body: "One profile at a time, in full. No infinite feed to scroll past and no algorithm deciding who deserves your attention.",
  },
  {
    icon: Handshake,
    title: "Both sides opt in",
    body: "A connection only exists when two developers both say yes. Nobody lands in your inbox uninvited.",
  },
  {
    icon: ShieldCheck,
    title: "Your profile is yours",
    body: "You choose what goes on it and you can change or clear it whenever you like. We don't sell it on.",
  },
];

function About() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-3xl px-6 py-20">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          About DevMatch
        </h1>
        <p className="mt-6 text-lg text-pretty text-muted-foreground">
          Finding people to build with is harder than it should be. Job boards
          are about hiring, social feeds are about broadcasting, and neither one
          helps you meet the developer who happens to be excited about the same
          problem you are.
        </p>
        <p className="mt-4 text-pretty text-muted-foreground">
          DevMatch is a smaller idea: show one developer at a time, let both
          people decide, and get out of the way once they've matched. No
          résumés, no recruiters, no engagement metrics dressed up as a network.
        </p>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 sm:grid-cols-3 sm:gap-8">
          {values.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col items-start gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-card text-primary">
                <Icon className="size-5" />
              </span>
              <h2 className="font-semibold tracking-tight">{title}</h2>
              <p className="text-sm text-pretty text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Come build with someone
          </h2>
          <p className="max-w-md text-pretty text-muted-foreground">
            Free to join, and your profile takes about two minutes.
          </p>
          <Button size="lg" render={<Link to="/signup" />}>
            Get started
            <ArrowRight />
          </Button>
        </div>
      </section>
    </div>
  );
}

export default About;
