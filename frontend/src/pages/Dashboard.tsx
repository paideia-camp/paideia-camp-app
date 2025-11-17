import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Target,
  BookOpen,
  Users,
  ArrowRight,
  Trophy,
  GraduationCap,
  Brain,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const userName = user?.user_metadata?.full_name || 'there';

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
          <p className="text-muted-foreground mt-2">
            Continue your journey toward global opportunities
          </p>
        </div>

        {/* Readiness Score */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Your Readiness Score</CardTitle>
                <CardDescription>Overall preparation level</CardDescription>
              </div>
              <Trophy className="h-12 w-12 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-4">
              <div className="text-6xl font-bold text-primary">72</div>
              <div className="text-muted-foreground mb-2">/100</div>
            </div>
            <Progress value={72} className="h-3" />
            <p className="text-sm text-muted-foreground">
              You're making great progress! Complete your diagnostic assessment to get
              personalized recommendations.
            </p>
            <Button onClick={() => navigate('/assessment')} className="w-full sm:w-auto">
              Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card
            className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
            onClick={() => navigate('/assessment')}
          >
            <CardHeader>
              <Target className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Diagnostic Assessment</CardTitle>
              <CardDescription>
                Evaluate your readiness and identify areas for improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start px-0">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
            onClick={() => navigate('/programs')}
          >
            <CardHeader>
              <GraduationCap className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Program Library</CardTitle>
              <CardDescription>
                Discover fellowships and scholarships aligned with your goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start px-0">
                Browse Programs <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
            onClick={() => navigate('/coach')}
          >
            <CardHeader>
              <Brain className="h-10 w-10 text-primary mb-2" />
              <CardTitle>AI Coach</CardTitle>
              <CardDescription>
                Get instant feedback on your application essays and statements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start px-0">
                Get Feedback <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
            onClick={() => navigate('/courses')}
          >
            <CardHeader>
              <BookOpen className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Mindset Courses</CardTitle>
              <CardDescription>
                Interactive lessons on leadership and global citizenship
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start px-0">
                Start Learning <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
            onClick={() => navigate('/mentors')}
          >
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Find a Mentor</CardTitle>
              <CardDescription>
                Connect with experienced fellows who can guide your journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start px-0">
                Connect Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
            onClick={() => navigate('/analytics')}
          >
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Track Progress</CardTitle>
              <CardDescription>
                View detailed analytics on your preparation journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start px-0">
                View Analytics <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Continue Where You Left Off</CardTitle>
            <CardDescription>Your recent activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Leadership Foundations</p>
                  <p className="text-sm text-muted-foreground">Module 2 of 5 • 60% complete</p>
                </div>
                <Button variant="ghost" size="sm">Continue</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
