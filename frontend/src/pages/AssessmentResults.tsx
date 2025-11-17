import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import {
  Trophy,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function AssessmentResults() {
  const navigate = useNavigate();

  const strengths = [
    'Strong leadership experience',
    'Clear career vision',
    'Impressive academic background',
    'Community engagement',
  ];

  const weaknesses = [
    'Essay structure needs improvement',
    'Limited international exposure',
    'Could strengthen technical skills section',
  ];

  const recommendations = [
    'Complete the "Leadership Foundations" micro-course',
    'Work on your essay with the AI Coach',
    'Research YALI and Mandela Washington Fellowship programs',
    'Connect with mentors who have similar backgrounds',
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Trophy className="h-16 w-16 text-primary mx-auto" />
          <h1 className="text-3xl font-bold">Your Readiness Assessment Results</h1>
          <p className="text-muted-foreground">
            Based on your responses, here's your personalized readiness report
          </p>
        </div>

        {/* Overall Score */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="text-2xl">Overall Readiness Score</CardTitle>
            <CardDescription>Your preparation level for target opportunities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-4">
              <div className="text-6xl font-bold text-primary">72</div>
              <div className="text-muted-foreground mb-2">/100</div>
            </div>
            <Progress value={72} className="h-3" />
            <p className="text-sm text-muted-foreground">
              You're well on your way! Focus on the recommendations below to boost your score.
            </p>
          </CardContent>
        </Card>

        {/* Breakdown */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Strengths */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <CardTitle>Your Strengths</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                <CardTitle>Areas for Improvement</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {weaknesses.map((weakness, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <CardTitle>Personalized Recommendations</CardTitle>
            </div>
            <CardDescription>Action items to improve your readiness</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-primary">{idx + 1}</span>
                  </div>
                  <span className="flex-1">{rec}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Program Matches */}
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Top Program Matches</CardTitle>
            </div>
            <CardDescription>Based on your profile, these programs align well with your goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'YALI Regional Leadership Center', match: 95 },
              { name: 'Mandela Washington Fellowship', match: 90 },
              { name: 'Chevening Scholarship', match: 88 },
            ].map((program, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div>
                  <p className="font-medium">{program.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {program.match}% match with your profile
                  </p>
                </div>
                <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                  {program.match}%
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => navigate('/programs')}>
            Explore Programs <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/courses')}>
            Start Learning
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
