import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, RefreshCw, Trash2, Mail, Phone, MessageCircle } from "lucide-react";
import { toast } from "@/components/ui/sonner";

type EstimationRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string | null;
  property_type: string | null;
  surface: string | null;
  beds: string | null;
  online_status: string | null;
  platform: string | null;
  listing_url: string | null;
  goal: string | null;
  message: string | null;
  source: string;
  status: string;
  created_at: string;
};

const STATUS_OPTIONS = [
  { value: "new", label: "Nouveau" },
  { value: "contacted", label: "Contacté" },
  { value: "qualified", label: "Qualifié" },
  { value: "won", label: "Gagné" },
  { value: "lost", label: "Perdu" },
];

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-yellow-100 text-yellow-700",
    qualified: "bg-purple-100 text-purple-700",
    won: "bg-green-100 text-green-700",
    lost: "bg-gray-100 text-gray-600",
  };
  return map[status] ?? "bg-gray-100 text-gray-600";
};

const toCsv = (rows: EstimationRequest[]) => {
  const headers = [
    "created_at", "status", "source", "name", "email", "phone",
    "city", "property_type", "surface", "beds", "online_status",
    "platform", "goal", "listing_url", "message",
  ];
  const escape = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push(headers.map((h) => escape((r as any)[h])).join(","));
  }
  return lines.join("\n");
};

const EstimationRequestsAdmin = () => {
  const [rows, setRows] = useState<EstimationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("estimation_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Erreur de chargement");
      console.error(error);
    } else {
      setRows((data as EstimationRequest[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const visible = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("estimation_requests")
      .update({ status })
      .eq("id", id);
    if (error) {
      toast.error("Mise à jour impossible");
      return;
    }
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    toast.success("Statut mis à jour");
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer cette demande ?")) return;
    const { error } = await supabase.from("estimation_requests").delete().eq("id", id);
    if (error) {
      toast.error("Suppression impossible");
      return;
    }
    setRows((prev) => prev.filter((r) => r.id !== id));
    toast.success("Demande supprimée");
  };

  const exportCsv = () => {
    if (visible.length === 0) {
      toast.error("Aucune demande à exporter");
      return;
    }
    const csv = toCsv(visible);
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `demandes-estimation-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">Demandes d'estimation</h2>
          <span className="text-sm text-muted-foreground">{rows.length} au total</span>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={load}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
          <Button size="sm" onClick={exportCsv}>
            <Download className="w-4 h-4 mr-2" />
            Exporter CSV
          </Button>
        </div>
      </div>

      {loading ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">Chargement…</CardContent></Card>
      ) : visible.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">Aucune demande</CardContent></Card>
      ) : (
        <div className="grid gap-3">
          {visible.map((r) => (
            <Card key={r.id}>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-[260px]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold">{r.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded ${statusBadge(r.status)}`}>
                        {STATUS_OPTIONS.find((s) => s.value === r.status)?.label ?? r.status}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        {r.source === "whatsapp" ? "WhatsApp" : "Email"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleString("fr-FR")}
                      </span>
                    </div>
                    <div className="mt-2 text-sm flex flex-wrap gap-x-4 gap-y-1">
                      <a href={`mailto:${r.email}`} className="flex items-center gap-1 hover:underline">
                        <Mail className="w-3.5 h-3.5" />{r.email}
                      </a>
                      <a href={`tel:${r.phone}`} className="flex items-center gap-1 hover:underline">
                        <Phone className="w-3.5 h-3.5" />{r.phone}
                      </a>
                      <a
                        href={`https://wa.me/${r.phone.replace(/\D/g, "")}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:underline"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />WhatsApp
                      </a>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {[r.city, r.property_type, r.surface && `${r.surface} m²`, r.beds && `${r.beds} couchages`]
                        .filter(Boolean).join(" · ")}
                    </div>
                    <div className="mt-1 text-sm">
                      <span className="text-muted-foreground">Objectif : </span>{r.goal || "—"}
                      <span className="text-muted-foreground"> · En ligne : </span>{r.online_status || "—"}
                      <span className="text-muted-foreground"> · Plateforme : </span>{r.platform || "—"}
                    </div>
                    {r.listing_url && (
                      <a href={r.listing_url} target="_blank" rel="noopener noreferrer"
                         className="text-xs text-primary hover:underline break-all">
                        {r.listing_url}
                      </a>
                    )}
                    {r.message && (
                      <p className="mt-2 text-sm bg-muted/50 rounded p-2 whitespace-pre-wrap">{r.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Select value={r.status} onValueChange={(v) => updateStatus(r.id, v)}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((s) => (
                          <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" onClick={() => remove(r.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EstimationRequestsAdmin;
