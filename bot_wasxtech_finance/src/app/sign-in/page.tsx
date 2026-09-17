"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    const { error: signInError } = await authClient.signIn.email({ email, password });
    setSubmitting(false);

    if (signInError) {
      setError("E-mail ou senha incorretos.");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-sm">
        <h1 className="text-lg font-semibold text-text-primary">Entrar</h1>
        <p className="mt-1 text-sm text-text-muted">
          Acesse suas finanças no FinanceBot.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <div>
            <label className="mb-1 block text-xs text-text-muted">E-mail</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-text-muted">Senha</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-expense">{error}</p>}

          <Button type="submit" disabled={submitting}>
            {submitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-text-muted">
          Ainda não tem conta?{" "}
          <Link href="/sign-up" className="text-accent hover:underline">
            Criar conta
          </Link>
        </p>
      </Card>
    </div>
  );
}
