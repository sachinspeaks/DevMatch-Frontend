import { ArrowRight, Check, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks";

const plans = [
  {
    id: "free",
    name: "Free",
    description: "A thoughtful place to start meeting your next collaborator.",
    price: "$0",
    frequency: "forever",
    features: [
      "Create your developer profile",
      "Browse up to 10 profiles a day",
      "Send connection requests",
      "Chat with your matches",
    ],
    action: "Current plan",
    variant: "outline" as const,
    current: true,
  },
  {
    id: "premium",
    name: "Premium",
    description: "More room to discover the people and projects that click.",
    price: "$9",
    frequency: "per month",
    features: [
      "Everything in Free",
      "Unlimited daily discovery",
      "See who viewed your profile",
      "Advanced stack and interest filters",
      "Priority profile visibility",
    ],
    action: "Start Premium",
    variant: "default" as const,
    highlighted: true,
  },
  {
    id: "premium-pro",
    name: "Premium Pro",
    description: "For developers actively looking for their next big build.",
    price: "$19",
    frequency: "per month",
    features: [
      "Everything in Premium",
      "Unlimited connection requests",
      "Weekly curated collaborator picks",
      "Project showcase priority",
      "Early access to new features",
    ],
    action: "Go Pro",
    variant: "secondary" as const,
  },
];

function Premium() {
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  async function handleClick(planId: string) {
    try {
      const resp = await api.post(`/payment/create`, {
        planType: planId,
      });
      const { order, apiKey } = resp.data;
      const { amount, currency, id: orderId } = order;
      const plan = plans.find((p) => p.id === planId);
      var options = {
        key: apiKey, // Enter the Key ID generated from the Dashboard
        amount, // Amount is in currency subunits.
        currency,
        name: "DevMatch",
        description: `${plan?.name ?? "Premium"} plan subscription`,
        order_id: orderId,
        prefill: {
          name: `${user.firstName} ${user.lastName}`.trim(),
          email: user.email,
        },
        notes: {
          planType: planId,
        },
        theme: {
          color: "#dc2626",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {}
  }
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative overflow-hidden border-b border-border bg-card/30">
        <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-primary/10 to-transparent" />
        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-16 text-center sm:py-20">
          <Badge variant="outline" className="gap-1.5 bg-background/70 px-3">
            <Sparkles className="size-3.5 text-primary" />
            Find your people
          </Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Choose the pace that fits your next build.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-muted-foreground sm:text-lg">
            Start connecting for free, then unlock more ways to find the
            developers you want to create with.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={
                plan.highlighted
                  ? "relative border-primary bg-card shadow-lg shadow-primary/10 lg:-my-3"
                  : "bg-card"
              }
            >
              {plan.highlighted && (
                <Badge className="absolute top-4 right-4">Most popular</Badge>
              )}
              <CardHeader className="gap-3">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription className="min-h-10 max-w-xs leading-relaxed">
                  {plan.description}
                </CardDescription>
                <div className="pt-2">
                  <span className="text-4xl font-semibold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    / {plan.frequency}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="mb-4 text-sm font-medium">Includes</p>
                <ul className="space-y-3" aria-label={`${plan.name} features`}>
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-6">
                {plan.current ? (
                  <Button
                    variant={plan.variant}
                    size="lg"
                    className="w-full"
                    disabled
                  >
                    {plan.action}
                  </Button>
                ) : (
                  <Button
                    variant={plan.variant}
                    size="lg"
                    className="w-full"
                    onClick={() => handleClick(plan.id)}
                  >
                    {plan.action}
                    <ArrowRight />
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Cancel a paid plan anytime. No hidden fees.
        </p>
      </section>
    </div>
  );
}

export default Premium;
