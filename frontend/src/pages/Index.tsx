import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  GraduationCap,
  Target,
  Brain,
  BookOpen,
  Users,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect to dashboard if already logged in
  if (user) {
    navigate('/dashboard');
    return null;
  }

  const features = [
    {
      icon: Target,
      title: 'Diagnostic Assessment',
      description: 'AI-powered evaluation of your readiness for global opportunities',
    },
    {
      icon: GraduationCap,
      title: 'Program Intelligence',
      description: 'Curated database of fellowships, scholarships, and accelerators',
    },
    {
      icon: Brain,
      title: 'AI Application Coach',
      description: 'Real-time feedback on essays, statements, and application materials',
    },
    {
      icon: BookOpen,
      title: 'Mindset Micro-Courses',
      description: 'Interactive lessons on leadership and global citizenship',
    },
    {
      icon: Users,
      title: 'Mentor Network',
      description: 'Connect with experienced fellows and program alumni',
    },
    {
      icon: TrendingUp,
      title: 'Progress Analytics',
      description: 'Track your readiness journey with detailed insights',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b">
        <div className="container px-4 py-20 mx-auto max-w-7xl">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-2 text-primary">
              <GraduationCap className="h-12 w-12" />
              <span className="text-3xl font-bold">Paideia</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Your Gateway to<br />
              <span className="text-primary">Global Opportunities</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Africa's first AI-powered platform to prepare for fellowships, scholarships,
              and accelerators. Join the CAMP Readiness Engine and transform your potential
              into success.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/auth/signup')}>
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/auth/login')}>
                Sign In
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground pt-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>AI-powered guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>Proven results</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container px-4 py-20 mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools and resources to prepare you for world-class opportunities
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <Card key={idx} className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t bg-muted/30">
        <div className="container px-4 py-20 mx-auto max-w-7xl">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of African leaders preparing for global opportunities
            </p>
            <Button size="lg" onClick={() => navigate('/auth/signup')}>
              Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © 2024 Paideia. Part of CAMP Network. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
