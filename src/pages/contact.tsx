import { Bug, LifeBuoy, Mail, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

// Placeholder addresses — swap these for the real inboxes.
const contactMethods = [
  {
    icon: Mail,
    title: "General",
    body: "Questions, feedback, or anything that doesn't fit the boxes below.",
    address: "hello@devmatch.dev",
  },
  {
    icon: LifeBuoy,
    title: "Support",
    body: "Trouble signing in, editing your profile, or with a connection.",
    address: "support@devmatch.dev",
  },
  {
    icon: ShieldCheck,
    title: "Privacy",
    body: "Data requests, account deletion, or questions about our policy.",
    address: "privacy@devmatch.dev",
  },
  {
    icon: Bug,
    title: "Bugs",
    body: "Something broken? Tell us what you did and what happened instead.",
    address: "bugs@devmatch.dev",
  },
];

function Contact() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Contact Us
      </h1>
      <p className="mt-6 text-lg text-pretty text-muted-foreground">
        We read everything that comes in and usually reply within a couple of
        working days. Pick whichever inbox fits.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {contactMethods.map(({ icon: Icon, title, body, address }) => (
          <a
            key={address}
            href={`mailto:${address}`}
            className="flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-background text-primary">
              <Icon className="size-5" />
            </span>
            <h2 className="font-semibold tracking-tight">{title}</h2>
            <p className="text-sm text-pretty text-muted-foreground">{body}</p>
            <span className="text-sm font-medium text-primary">{address}</span>
          </a>
        ))}
      </div>

      <p className="mt-10 text-sm text-pretty text-muted-foreground">
        Before you write in, the{" "}
        <Link
          to="/privacy"
          className="text-primary underline underline-offset-4"
        >
          privacy policy
        </Link>{" "}
        covers most questions about what we store and how to get it removed.
      </p>
    </div>
  );
}

export default Contact;
