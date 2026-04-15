"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPiedPiperAlt } from "react-icons/fa";
import { ThemeSwitcher } from "./ThemeSwitcher";

function NavButton({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={[
        "btn btn-sm rounded-full",
        active ? "btn-primary" : "btn-ghost",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  return (
    <div className="sticky top-0 z-40 border-b msp-border bg-base-100/70 backdrop-blur">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="navbar min-h-14">
          <div className="navbar-start">
            <Link href="/" className="btn btn-ghost gap-2 px-2">
              <FaPiedPiperAlt className="text-xl" />
              <span className="font-semibold tracking-tight">TraceAPI</span>
            </Link>
          </div>

          <div className="navbar-center">
            <div className="join bg-base-200/50 rounded-full p-1">
              <NavButton href="/" label="Home" />
              <NavButton href="/test-api" label="Test API" />
            </div>
          </div>

          <div className="navbar-end">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}

