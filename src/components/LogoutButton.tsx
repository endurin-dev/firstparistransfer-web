"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white w-full"
    >
      <LogOut className="w-4 h-4" /> Sign Out
    </button>
  );
}
