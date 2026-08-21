import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface AlertRecord {
  eventId: string;
  severity: "info" | "warning" | "critical";
  source: string;
  message: string;
  deliveryStatus: string;
  acknowledgedAt: string | null;
  createdAt: string;
}

export default function Alerts() {
  const queryClient = useQueryClient();
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [liveStatus, setLiveStatus] = useState<"connecting" | "connected" | "fallback">("connecting");
  const socketRef = useRef<WebSocket | null>(null);
  const { data: alerts = [], isLoading } = useQuery<AlertRecord[]>({
    queryKey: ["/api/alerts"],
    refetchInterval: liveStatus === "fallback" ? 10_000 : false,
  });

  useEffect(() => {
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    let disposed = false;

    const connect = () => {
      if (disposed) return;
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const socket = new WebSocket(`${protocol}//${window.location.host}/ws/alerts`);
      socketRef.current = socket;
      socket.onopen = () => setLiveStatus("connected");
      socket.onmessage = event => {
        try {
          const message = JSON.parse(event.data) as { type?: string };
          if (message.type === "alert.created") {
            queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
          }
        } catch {
          // Ignore malformed broadcast frames and keep the connection alive.
        }
      };
      socket.onerror = () => setLiveStatus("fallback");
      socket.onclose = () => {
        socketRef.current = null;
        if (!disposed) {
          setLiveStatus("fallback");
          retryTimer = setTimeout(connect, 5_000);
        }
      };
    };

    connect();
    return () => {
      disposed = true;
      if (retryTimer) clearTimeout(retryTimer);
      socketRef.current?.close();
    };
  }, [queryClient]);

  const acknowledge = useMutation({
    mutationFn: async (eventId: string) => {
      const response = await fetch(`/api/alerts/${eventId}/ack`, { method: "POST", credentials: "include" });
      if (!response.ok) throw new Error("Falha ao confirmar alerta");
      return response.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/alerts"] }),
  });

  const playAlert = (alert: AlertRecord) => {
    if (!audioEnabled || !("speechSynthesis" in window)) return;
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(`${alert.severity}: ${alert.message}`));
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] p-6 text-white">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Alertas Operacionais</h1>
            <p className="mt-1 text-sm text-gray-400">Histórico persistido e confirmação do operador</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">Tempo real: {liveStatus === "connected" ? "conectado" : liveStatus === "fallback" ? "fallback" : "conectando"}</span>
            <button className="rounded border border-gray-600 px-3 py-2 text-sm" onClick={() => setAudioEnabled(value => !value)}>
              Áudio: {audioEnabled ? "ativo" : "desativado"}
            </button>
          </div>
        </header>

        {isLoading && <p className="text-gray-400">Carregando alertas...</p>}
        {!isLoading && alerts.length === 0 && <p className="text-gray-400">Nenhum alerta registrado.</p>}

        <div className="space-y-3">
          {alerts.map(alert => (
            <article key={alert.eventId} className="rounded border border-gray-700 bg-gray-900 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold uppercase">{alert.severity}</span>
                    <span className="text-xs text-gray-500">{alert.source}</span>
                    <span className="text-xs text-gray-500">{alert.deliveryStatus}</span>
                  </div>
                  <p className="mt-2">{alert.message}</p>
                  <time className="mt-2 block text-xs text-gray-500">{new Date(alert.createdAt).toLocaleString()}</time>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button className="rounded border border-gray-600 px-3 py-1 text-sm" onClick={() => playAlert(alert)} disabled={!audioEnabled}>
                    Ouvir
                  </button>
                  <button className="rounded bg-emerald-700 px-3 py-1 text-sm disabled:opacity-50" onClick={() => acknowledge.mutate(alert.eventId)} disabled={alert.deliveryStatus === "acknowledged" || acknowledge.isPending}>
                    {alert.deliveryStatus === "acknowledged" ? "Confirmado" : "Confirmar"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
