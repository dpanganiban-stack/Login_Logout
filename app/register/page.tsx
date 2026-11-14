"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { apiClient } from "@/lib/api";
import { CONFIG } from "@/lib/contig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: false });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isChecking) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiClient("/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      router.push(CONFIG.ROUTES.LOGIN);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-shell flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-[360px] border-0 bg-[#2d305d]/75 text-white shadow-[0_30px_60px_rgba(33,31,67,0.45)] backdrop-blur-sm">
        <CardHeader className="px-6 pt-6 sm:px-7 sm:pt-7">
          <CardTitle className="text-2xl text-white">Create Account</CardTitle>
          <CardDescription className="text-white/75">
            Register a new account to get started.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4 px-6 pb-3 sm:px-7">
            {error && (
              <div className="rounded-md border border-red-300/30 bg-red-950/40 p-3 text-sm text-red-100">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white/90">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-11 rounded-xl border border-white/15 bg-[#4d4f77]/25 text-sm text-white focus-visible:border-white/30 focus-visible:ring-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 rounded-xl border border-white/15 bg-[#4d4f77]/25 text-sm text-white focus-visible:border-white/30 focus-visible:ring-0"
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4 border-0 bg-transparent px-6 pb-6 pt-3 sm:px-7 sm:pb-7">
            <Button
              type="submit"
              className="h-11 w-full rounded-xl bg-white text-[0.8rem] font-semibold tracking-[0.08em] text-[#2d305d] shadow-[0_8px_18px_rgba(255,255,255,0.25)] hover:bg-white/90"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
            <p className="text-center text-xs text-white/75">
              Already have an account?{" "}
              <Link
                href={CONFIG.ROUTES.LOGIN}
                className="font-medium text-white underline decoration-white/60 underline-offset-4 hover:text-white"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
