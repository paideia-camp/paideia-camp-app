import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import HeroImage from "/src/images/pade_hero.png";
import Logo from "../../images/padei_logo.png";
import Navigation from "@/components/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  if (user) {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen bg-white lg:bg-transparent">
      {/* Navigation - visible only on mobile and tablet */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <Navigation />
      </div>

      {/* Left side - Branding */}
      <div
        className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between text-primary-foreground bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        {/* overlay for readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative z-10 flex flex-col justify-between h-full">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img src={Logo} alt="logo" />
            <span className="text-2xl font-bold">Paideia</span>
          </Link>
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              Your Gateway to
              <br />
              Global Opportunities
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Africa's first AI-powered platform to prepare for fellowships,
              scholarships, and accelerators.
            </p>
          </div>
          <div className="text-sm text-primary-foreground/60">
            © 2025 Paideia. Part of CAMP Network.
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 pt-24 lg:pt-8 bg-[linear-gradient(180deg,_#F0E0E7_0%,_#525EE2_100%)] lg:bg-white">
        <div className="w-full max-w-md space-y-8 bg-white lg:bg-transparent p-8 lg:p-0 rounded-2xl lg:rounded-none shadow-xl shadow-black lg:shadow-none">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-muted-foreground mt-2">
              Sign in to continue your readiness journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
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
              className="w-full font-semibold bg-blue-600 hover:bg-white hover:text-blue-600 hover:border-2 hover:border-blue-600"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="text-center text-sm flex flex-col md:flex-row gap-4">
            <span>Don't have an account?</span>
            <Link
              to="/auth/signup"
              className="text-white font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
