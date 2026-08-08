import { Link } from "react-router-dom";

// Sections render in order; each body entry is its own paragraph.
const sections = [
  {
    title: "What we collect",
    body: [
      "When you sign up we store the details you give us: your first and last name, your email address, and your password in hashed form. We never store your password as plain text.",
      "Your profile can also include an age, a gender, a photo URL, a short about section, and a list of skills. All of these are optional and you can edit or remove them at any time from your profile page.",
      "We record the connection requests you send, receive, accept, and ignore, because that is what makes matches work.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "Your profile is shown to other DevMatch users in their feed so they can decide whether to connect with you. That is the point of the service.",
      "Your email address is used to identify your account and to sign you in. We do not use it for marketing, and we do not sell or rent your personal information to anyone.",
    ],
  },
  {
    title: "Who can see your profile",
    body: [
      "Signed-in DevMatch users can see the profile details you have filled in when your profile appears in their feed. Your email address and password are never shown to other users.",
      "Once two people match, each can see the other's profile in their connections list.",
    ],
  },
  {
    title: "Cookies and sessions",
    body: [
      "We use a single session cookie to keep you signed in. It is not used for advertising or cross-site tracking. Clearing it, or logging out, ends your session.",
    ],
  },
  {
    title: "Keeping your data",
    body: [
      "We keep your account data for as long as your account exists. If you ask us to delete your account, we remove your profile and your connection history.",
      "No service can promise perfect security, but we hash passwords and restrict access to account data to what the service needs to run.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You can view and change everything on your profile at any time. If you want a copy of your data or want your account deleted, get in touch and we will sort it out.",
    ],
  },
];

function Privacy() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated 28 July 2026
      </p>
      <p className="mt-6 text-lg text-pretty text-muted-foreground">
        DevMatch only collects what it needs to connect you with other
        developers. This page explains what that is, in plain language.
      </p>

      <div className="mt-12 flex flex-col gap-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold tracking-tight">
              {section.title}
            </h2>
            {section.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-3 text-pretty text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            Changes to this policy
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            If we change how we handle your data we will update this page and
            the date at the top. Questions about any of it are welcome on our{" "}
            <Link
              to="/contact"
              className="text-primary underline underline-offset-4"
            >
              contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

export default Privacy;
