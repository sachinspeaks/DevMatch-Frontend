import { Link } from "react-router-dom";
import Logo from "../assets/icon.svg?react";

const footerLinks = [
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Contact Us", href: "/contact" },
];

function Footer() {
  return (
    <footer className="border-t bg-background w-full">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <Logo className="h-6 w-6 text-primary" />
          <span className="text-sm font-semibold">DevMatch</span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} DevMatch. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
