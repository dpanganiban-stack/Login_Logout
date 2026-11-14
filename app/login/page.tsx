"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, UserRound } from "lucide-react";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { apiClient } from "@/lib/api";
import { setTokens } from "@/lib/auth";
import { CONFIG } from "@/lib/contig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: false });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isChecking) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiClient<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      setTokens(data.accessToken, data.refreshToken);
      router.push(CONFIG.ROUTES.DASHBOARD);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-shell flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-[360px]">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-[#3d3f68]/80 shadow-[0_12px_24px_rgba(32,31,58,0.4)] backdrop-blur-sm">
          <UserRound className="h-8 w-8 text-white" />
        </div>

        <Card className="border-0 bg-[#2d305d]/75 shadow-[0_30px_60px_rgba(33,31,67,0.45)] backdrop-blur-sm">
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4 p-6 sm:p-7">
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/80" />
                <Label htmlFor="username" className="sr-only">
                  Email ID
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Username"
                  className="h-11 rounded-xl border border-white/15 bg-[#4d4f77]/25 pl-10 text-sm text-white placeholder:text-white/65 focus-visible:border-white/30 focus-visible:ring-0"
                />
              </div>

              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/80" />
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="h-11 rounded-xl border border-white/15 bg-[#4d4f77]/25 pl-10 text-sm text-white placeholder:text-white/65 focus-visible:border-white/30 focus-visible:ring-0"
                />
              </div>

              <Button
                type="submit"
                className="h-11 w-full rounded-xl bg-white text-[0.8rem] font-semibold tracking-[0.08em] text-[#2d305d] shadow-[0_8px_18px_rgba(255,255,255,0.25)] hover:bg-white/90"
                disabled={loading}
              >
                {loading ? "LOGGING IN..." : "LOGIN"}
              </Button>

              <p className="pt-1 text-center text-xs text-white/75">
                Don't have an account?{" "}
                <Link href={CONFIG.ROUTES.REGISTER} className="font-medium text-white underline decoration-white/60 underline-offset-4 hover:text-white">
                  Register
                </Link>
              </p>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
