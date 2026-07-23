import { Code2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAppSelector } from "@/hooks";
import UserAvatar from "./avatar";

const links = [
  { label: "Discover", href: "/feed" },
  { label: "Subscriptions", href: "#subscriptions" },
  { label: "Safety", href: "#safety" },
];

export default function Navbar() {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="relative flex h-14 w-full items-center justify-between gap-4 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Code2 className="size-5 text-primary" />
          DevMatch
        </Link>

        <NavigationMenu className="absolute left-1/2 hidden -translate-x-1/2 md:flex">
          <NavigationMenuList className="gap-x-2">
            {links.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  render={<Link to={link.href} />}
                  className="hover:bg-accent/25 focus:bg-accent/25"
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {user.id ? (
          <UserAvatar
            firstName={user.firstName}
            lastName={user.lastName}
            imageSrc={user.photoURL}
            className="size-9"
          />
        ) : (
          <Button onClick={() => navigate("/login")} size="sm">
            Log in
          </Button>
        )}
      </div>
    </header>
  );
}
