"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Lock,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from "lucide-react";

export default function SettingsPage() {
  const [currentEmail, setCurrentEmail] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingAccount, setSavingAccount] = useState(false);
  const [accountMsg, setAccountMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const [exporting, setExporting] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [confirmText, setConfirmText] = useState("");
  const [importing, setImporting] = useState(false);
  const [importMsg, setImportMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings/account")
      .then((r) => r.json())
      .then((u) => setCurrentEmail(u.email ?? ""))
      .catch(() => {})
      .finally(() => setLoadingUser(false));
  }, []);

  const submitAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setAccountMsg(null);

    if (newPassword && newPassword !== confirmPassword) {
      setAccountMsg({ type: "err", text: "New passwords do not match." });
      return;
    }
    if (!newEmail && !newPassword) {
      setAccountMsg({ type: "err", text: "Enter a new email or password to update." });
      return;
    }

    setSavingAccount(true);
    try {
      const res = await fetch("/api/admin/settings/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newEmail: newEmail || undefined,
          newPassword: newPassword || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setAccountMsg({ type: "err", text: json.error || "Update failed." });
      } else {
        setAccountMsg({
          type: "ok",
          text: "Account updated. If you changed your email, log out and back in with the new address.",
        });
        setCurrentEmail(json.email);
        setCurrentPassword("");
        setNewEmail("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      setAccountMsg({ type: "err", text: "Network error. Try again." });
    } finally {
      setSavingAccount(false);
    }
  };

  const downloadBackup = async () => {
    setExporting(true);
    try {
      const res = await fetch("/api/admin/settings/backup");
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `paris-easy-move-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      alert("Failed to download backup.");
    } finally {
      setExporting(false);
    }
  };

  const submitImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setImportMsg(null);

    if (!importFile) {
      setImportMsg({ type: "err", text: "Choose a backup JSON file first." });
      return;
    }
    if (confirmText !== "RESTORE") {
      setImportMsg({ type: "err", text: 'Type "RESTORE" to confirm this destructive action.' });
      return;
    }

    setImporting(true);
    try {
      const text = await importFile.text();
      const parsed = JSON.parse(text);

      const res = await fetch("/api/admin/settings/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      const json = await res.json();

      if (!res.ok) {
        setImportMsg({ type: "err", text: json.error || "Restore failed." });
      } else {
        setImportMsg({
          type: "ok",
          text: "Database restored successfully. Refresh the app to see the new data.",
        });
        setImportFile(null);
        setConfirmText("");
      }
    } catch {
      setImportMsg({ type: "err", text: "That file isn't valid JSON." });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your admin credentials and database backups.
        </p>
      </div>

      {/* Account settings */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <h2 className="text-sm font-semibold text-slate-900 mb-1">Account</h2>
        <p className="text-xs text-slate-400 mb-5">
          {loadingUser ? "Loading..." : `Signed in as ${currentEmail}`}
        </p>

        <form onSubmit={submitAccount} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 block">
              Current password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                placeholder="Required to make any change"
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                New email <span className="text-slate-300">(optional)</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder={currentEmail || "admin@example.com"}
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                New password <span className="text-slate-300">(optional)</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                />
              </div>
            </div>
          </div>

          {newPassword && (
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                Confirm new password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                />
              </div>
            </div>
          )}

          {accountMsg && (
            <div
              className={`flex items-start gap-2 text-sm rounded-lg px-3.5 py-2.5 ${
                accountMsg.type === "ok"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-rose-50 text-rose-700 border border-rose-200"
              }`}
            >
              {accountMsg.type === "ok" ? (
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              )}
              {accountMsg.text}
            </div>
          )}

          <button
            type="submit"
            disabled={savingAccount}
            className="flex items-center gap-2 bg-slate-900 text-amber-400 text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {savingAccount && <Loader2 className="w-4 h-4 animate-spin" />}
            Save changes
          </button>
        </form>
      </div>

      {/* Backup */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <h2 className="text-sm font-semibold text-slate-900 mb-1">Database Backup</h2>
        <p className="text-xs text-slate-400 mb-5">
          Download a full export of locations, vehicles, rates, bookings, and admin users as JSON.
        </p>
        <button
          onClick={downloadBackup}
          disabled={exporting}
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-50"
        >
          {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          Download backup (.json)
        </button>
      </div>

      {/* Restore */}
      <div className="bg-white rounded-2xl border border-rose-200 shadow-sm p-6">
        <div className="flex items-start gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-rose-50 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Restore from Backup</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              This <strong className="text-rose-600 font-semibold">permanently replaces</strong> all
              current locations, vehicles, rates, bookings, and admin users with the contents of the
              uploaded file. This cannot be undone.
            </p>
          </div>
        </div>

        <form onSubmit={submitImport} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 block">
              Backup file
            </label>
            <label className="flex items-center gap-2 border border-dashed border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-500 cursor-pointer hover:border-slate-400 hover:bg-slate-50 transition-colors">
              <Upload className="w-4 h-4" />
              {importFile ? importFile.name : "Choose a .json backup file"}
              <input
                type="file"
                accept="application/json"
                onChange={(e) => setImportFile(e.target.files?.[0] ?? null)}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 block">
              Type <span className="font-mono bg-slate-100 px-1 rounded">RESTORE</span> to confirm
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="RESTORE"
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/10 focus:border-rose-400"
            />
          </div>

          {importMsg && (
            <div
              className={`flex items-start gap-2 text-sm rounded-lg px-3.5 py-2.5 ${
                importMsg.type === "ok"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-rose-50 text-rose-700 border border-rose-200"
              }`}
            >
              {importMsg.type === "ok" ? (
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              )}
              {importMsg.text}
            </div>
          )}

          <button
            type="submit"
            disabled={importing || confirmText !== "RESTORE"}
            className="flex items-center gap-2 bg-rose-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {importing && <Loader2 className="w-4 h-4 animate-spin" />}
            Restore database
          </button>
        </form>
      </div>
    </div>
  );
}