"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import logo from "../../../assests/freshcart-logo.49f1b44d.svg";
import Image from "next/image";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function NavigationMenuDemo() {
  const { data, status } = useSession();

  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const data = await fetch(`/api/cart`);
      if (!data.ok) throw new Error("failed to fetch cart");
      return data.json();
    },
  });

  const links = [
    { path: "/", element: "home" },
    { path: "/categories", element: "categories" },
    { path: "/brands", element: "brands" },
  ];

  const auth = [
    { path: "/login", element: "login" },
    { path: "/register", element: "register" },
  ];

  function handleLogout() {
    signOut({ redirect: false, callbackUrl: "/login" });
  }

  return (
    <NavigationMenu className="fixed max-w-full justify-between px-10 md:px-20 py-4">
      <Image src={logo} alt="fresh-card-logo" />
      <NavigationMenuList>
        <NavigationMenuItem className="flex md:hidden">
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {status === "authenticated" ? (
          <>
            {links.map((link) => (
              <NavigationMenuItem className="hidden md:flex" key={link.element}>
                <NavigationMenuLink asChild className={"hover:bg-transparent"}>
                  <Link href={link.path} className="capitalize">
                    {link.element}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            <Link href={"/cart"} className="mx-3">
              <div className="flex gap-2">
                <FaShoppingCart />
                <span>{cartData?.numOfCartItems}</span>
              </div>
            </Link>

            <Link href={"/wishlist"} className="mx-3">
              <FaHeart />
            </Link>
            <h2 className="capitalize">Hi {data.user.name}</h2>
            <p className="mx-2" onClick={handleLogout}>
              LogOut
            </p>
          </>
        ) : (
          <>
            {auth.map((link) => (
              <NavigationMenuItem className="hidden md:flex" key={link.element}>
                <NavigationMenuLink asChild className={"hover:bg-transparent"}>
                  <Link href={link.path} className="capitalize">
                    {link.element}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
