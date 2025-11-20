import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionAvailable, setSessionAvailable] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { supabase } = await import("@/lib/supabase");
        // Supabase sometimes returns tokens in the URL fragment (#) but some
        // email clients or link click handlers can strip fragments. We'll
        // attempt multiple strategies to recover a session token.

        let gotSession = false;

        // 1) Try parsing tokens from the URL hash (fragment)
        const hash = window.location.hash || "";
        if (hash) {
          const hashParams = new URLSearchParams(hash.replace(/^#/, ""));
          const access_token =
            hashParams.get("access_token") || hashParams.get("access-token");
          const refresh_token =
            hashParams.get("refresh_token") || hashParams.get("refresh-token");
          if (access_token) {
            const { error: setErr } = await supabase.auth.setSession({
              access_token,
              refresh_token: refresh_token || undefined,
            });
            if (!setErr) {
              gotSession = true;
              // clean URL to remove tokens from fragment
              try {
                window.history.replaceState(
                  {},
                  document.title,
                  window.location.pathname + window.location.search
                );
              } catch (e) {
                /* ignore */
              }
            }
          }
        }

        // 2) If not found in hash, try query params (some links use query)
        if (!gotSession) {
          const searchParams = new URLSearchParams(window.location.search);
          const access_token_q =
            searchParams.get("access_token") || searchParams.get("token");
          const refresh_token_q = searchParams.get("refresh_token");
          if (access_token_q) {
            const { error: setErr } = await supabase.auth.setSession({
              access_token: access_token_q,
              refresh_token: refresh_token_q || undefined,
            });
            if (!setErr) {
              gotSession = true;
              try {
                window.history.replaceState(
                  {},
                  document.title,
                  window.location.pathname + (window.location.hash || "")
                );
              } catch (e) {
                /* ignore */
              }
            }
          }
        }

        // 3) (skip) — supabase helper to parse from URL may not be available in all
        // client versions; we already tried hash and query parsing above.

        // 4) Fallback: check current session
        if (!gotSession) {
          const { data } = await supabase.auth.getSession();
          if (data?.session) gotSession = true;
        }

        if (gotSession) {
          if (mounted) setSessionAvailable(true);
        } else {
          // No session available — link likely expired or the email client
          // removed the fragment. Give the user actionable guidance.
          toast({
            title: "No auth session",
            description:
              "Password reset link is invalid or expired, or your email client removed the token. Open the link in a browser or request a new link.",
            variant: "destructive",
          });
        }
      } catch (err) {
        // ignore — we'll treat as no session
        toast({
          title: "Session check failed",
          description: "Could not validate password reset session.",
          variant: "destructive",
        });
      } finally {
        if (mounted) setCheckingSession(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    // Supabase recovery: user is already authenticated via recovery token
    // Use supabase.auth.updateUser({ password })
    try {
      const { supabase } = await import("@/lib/supabase");
      const { error } = await supabase.auth.updateUser({ password });
      setLoading(false);
      if (error) {
        toast({
          title: "Reset Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Password Reset!",
          description: "Your password has been updated. Please log in.",
        });
        navigate("/auth/login");
      }
    } catch (err) {
      setLoading(false);
      toast({
        title: "Reset Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md space-y-8 bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center">Reset Password</h2>
        <p className="text-muted-foreground text-center mb-4">
          Enter your new password below.
        </p>
        {!checkingSession && !sessionAvailable && (
          <div className="text-center text-sm text-red-600 mb-4">
            This reset link is invalid or expired.{" "}
            <Link to="/auth/forgot-password" className="underline">
              Request a new link
            </Link>
            .
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading || checkingSession || !sessionAvailable}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
