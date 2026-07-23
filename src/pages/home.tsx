import { ArrowRight, Code2, Handshake, Sparkles } from "lucide-react";
import { Link, Navigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks";

// The deck behind the hero — a mock of what the feed actually looks like, so
// the landing page sells the product with the product.
const deck = [
  {
    name: "Ananya Iyer",
    role: "Backend · Go, Postgres",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className: "-rotate-6 -translate-x-10 opacity-60",
  },
  {
    name: "Riya Sharma",
    role: "Frontend · React, TS",
    photo:
      "https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className: "rotate-3 translate-x-8 opacity-80",
  },
];

const steps = [
  {
    icon: Code2,
    title: "Build your profile",
    body: "Your stack, your projects, what you actually want to work on.",
  },
  {
    icon: Sparkles,
    title: "Swipe through devs",
    body: "One card at a time. No feeds to scroll, no noise to filter.",
  },
  {
    icon: Handshake,
    title: "Match and ship",
    body: "Interest goes both ways? You're connected. Take it from there.",
  },
];

function Landing() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:gap-12 lg:py-28">
          {/* Copy */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Badge
              variant="outline"
              className="h-7 gap-1.5 bg-card px-3 text-primary"
            >
              <Sparkles />
              Now matching developers
            </Badge>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Find developers worth{" "}
              <span className="text-primary">building with</span>
            </h1>

            <p className="mt-5 max-w-md text-lg text-pretty text-muted-foreground">
              DevMatch connects you with developers who share your stack, your
              interests, and your appetite for shipping.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <Button size="lg" render={<Link to="/signup" />}>
                Get started
                <ArrowRight />
              </Button>
              <Button size="lg" variant="outline" render={<Link to="/login" />}>
                Log in
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Free to join. No résumé, no recruiters.
            </p>
          </div>

          {/* Card stack */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative h-104 w-72 sm:h-120 sm:w-80">
              {/* Soft warm glow, centred on the stack so it reads as a halo.
                  First child so it paints behind the cards. */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/20 blur-3xl sm:size-144"
              />

              {deck.map((card) => (
                <article
                  key={card.name}
                  aria-hidden
                  className={`absolute inset-0 overflow-hidden rounded-3xl border border-border bg-card shadow-lg ${card.className}`}
                >
                  <img
                    src={card.photo}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </article>
              ))}

              {/* Front card */}
              <article className="absolute inset-0 overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="A DevMatch profile card"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/25 to-transparent" />
                <div className="absolute bottom-0 w-full p-6 text-white">
                  <h2 className="text-2xl font-semibold">Diya Sharma, 24</h2>
                  <p className="mt-1 text-sm text-gray-200">
                    Full-stack dev shipping side projects on weekends.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["React", "Node", "Postgres"].map((skill) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 sm:grid-cols-3 sm:gap-8">
          {steps.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col items-start gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-card text-primary">
                <Icon className="size-5" />
              </span>
              <h3 className="font-semibold tracking-tight">{title}</h3>
              <p className="text-sm text-pretty text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// "/" is public, but it only ever shows the landing page. A logged-in user is
// sent on to /feed so the feed has exactly one URL — otherwise "/" and "/feed"
// would render the same thing and Discover would look like a no-op.
function Home() {
  const user = useAppSelector((state) => state.user);

  if (user.id) return <Navigate to="/feed" replace />;

  return <Landing />;
}

export default Home;
