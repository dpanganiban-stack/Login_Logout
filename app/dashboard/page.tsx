"use client";

import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { clearTokens } from "@/lib/auth";
import { CONFIG } from "@/lib/contig";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { isChecking } = useAuthGuard({ requireAuth: true });

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Verifying session...</p>
      </div>
    );
  }

  const handleLogout = () => {
    clearTokens();
    window.location.replace(CONFIG.ROUTES.LOGIN);
  };

  return (
    <div className="login-shell min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex justify-between items-center border-b pb-4">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Welcome back!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You are authenticated. Your active JWT session is stored in LocalStorage.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
