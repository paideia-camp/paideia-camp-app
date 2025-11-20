import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { User, Mail, Target, Loader2, CheckCircle2 } from "lucide-react";

export default function Profile() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    goals: "",
    background: "",
  });

  const [originalEmail, setOriginalEmail] = useState("");

  useEffect(() => {
    if (user) {
      // Load user profile data
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("campprofiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          full_name: data.full_name || "",
          email: data.email || user.email || "",
          goals:
            typeof data.goals === "string"
              ? data.goals
              : JSON.stringify(data.goals || ""),
          background:
            typeof data.background === "string"
              ? data.background
              : JSON.stringify(data.background || ""),
        });
        setOriginalEmail(data.email || user.email || "");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const emailChanged = formData.email !== originalEmail;

      // Update profile in campprofiles table
      const { error: profileError } = await supabase
        .from("campprofiles")
        .upsert({
          id: user?.id,
          full_name: formData.full_name,
          email: formData.email,
          goals: formData.goals,
          background: formData.background,
          updated_at: new Date().toISOString(),
        });

      if (profileError) throw profileError;

      // If email changed, update auth email and sign out
      if (emailChanged) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: formData.email,
        });

        if (emailError) throw emailError;

        // Show success message
        setShowSuccess(true);

        // Wait 3 seconds then sign out
        setTimeout(async () => {
          toast({
            title: "Email Updated",
            description:
              "Please check your new email to verify the change. You will be signed out now.",
          });

          await signOut();
          window.location.href = "/auth/login";
        }, 3000);
      } else {
        // Show success without signing out
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);

        toast({
          title: "Success",
          description: "Profile updated successfully!",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-3xl mx-auto top-40 relative pb-12">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account information and preferences
          </p>
        </div>

        {showSuccess && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-900">
                    Profile Updated Successfully!
                  </p>
                  <p className="text-sm text-green-700">
                    {formData.email !== originalEmail
                      ? "Please check your email to verify the change. You will be signed out shortly."
                      : "Your changes have been saved."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and account information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="full_name">
                  <User className="inline h-4 w-4 mr-2" />
                  Full Name
                </Label>
                <Input
                  id="full_name"
                  type="text"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  required
                />
                {formData.email !== originalEmail && (
                  <p className="text-sm text-amber-600">
                    ⚠️ Changing your email will require verification and you'll
                    be signed out
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals">
                  <Target className="inline h-4 w-4 mr-2" />
                  Goals
                </Label>
                <Textarea
                  id="goals"
                  value={formData.goals}
                  onChange={(e) =>
                    setFormData({ ...formData, goals: e.target.value })
                  }
                  placeholder="What are your career and educational goals? What programs are you targeting?"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="background">Background & Experience</Label>
                <Textarea
                  id="background"
                  value={formData.background}
                  onChange={(e) =>
                    setFormData({ ...formData, background: e.target.value })
                  }
                  placeholder="Tell us about your background, skills, and experience..."
                  rows={4}
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={loadProfile}
                  disabled={saving}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
