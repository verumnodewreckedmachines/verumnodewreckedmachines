import { FormEvent, useState } from "react";

interface LoginProps {
  onAuthenticated: () => void;
}

export default function Login({ onAuthenticated }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      onAuthenticated();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Falha no login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] px-6 py-16 text-white">
      <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-6 rounded-lg border border-gray-700 bg-gray-900 p-8">
        <div>
          <h1 className="text-2xl font-semibold">VERUM NODE</h1>
          <p className="mt-2 text-sm text-gray-400">Autentique-se para acessar o sistema.</p>
        </div>
        <label className="block text-sm">
          Usuário
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            required
            className="mt-2 w-full rounded border border-gray-700 bg-gray-950 px-3 py-2 text-white"
          />
        </label>
        <label className="block text-sm">
          Senha
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            className="mt-2 w-full rounded border border-gray-700 bg-gray-950 px-3 py-2 text-white"
          />
        </label>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-emerald-600 px-4 py-2 font-medium hover:bg-emerald-500 disabled:opacity-50"
        >
          {isSubmitting ? "Autenticando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
