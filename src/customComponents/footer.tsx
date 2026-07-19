import Logo from "../assets/icon.svg?react";

function Footer() {
  return (
    <footer className="border-t bg-background w-full">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <Logo className="h-6 w-6 text-primary" />
          <span className="text-sm font-semibold">DevMatch</span>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} DevMatch. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
