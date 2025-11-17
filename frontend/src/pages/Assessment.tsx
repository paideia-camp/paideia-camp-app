import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Target, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Assessment() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    goals: '',
    background: '',
    experience: '',
    essayDraft: '',
    targetPrograms: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setLoading(false);
    toast({
      title: 'Assessment Complete!',
      description: 'Your readiness report is ready.',
    });
    navigate('/assessment/results');
  };

  const totalSteps = 4;

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Target className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold">Readiness Diagnostic Assessment</h1>
          <p className="text-muted-foreground">
            Help us understand your goals and background to provide personalized recommendations
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex items-center flex-1">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  i + 1 <= step
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted bg-background text-muted-foreground'
                }`}
              >
                {i + 1 < step ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-colors ${
                    i + 1 < step ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && 'Your Goals'}
              {step === 2 && 'Background & Experience'}
              {step === 3 && 'Target Programs'}
              {step === 4 && 'Essay Draft (Optional)'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'What opportunities are you pursuing?'}
              {step === 2 && 'Tell us about your professional and academic journey'}
              {step === 3 && 'Which programs are you interested in?'}
              {step === 4 && 'Share a draft for AI-powered feedback'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goals">Career & Education Goals</Label>
                  <Textarea
                    id="goals"
                    placeholder="e.g., I want to pursue a master's degree in public policy and eventually work in international development..."
                    value={formData.goals}
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                    rows={6}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="background">Educational Background</Label>
                  <Textarea
                    id="background"
                    placeholder="Degree, institution, field of study..."
                    value={formData.background}
                    onChange={(e) => handleInputChange('background', e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Professional Experience</Label>
                  <Textarea
                    id="experience"
                    placeholder="Your work experience, leadership roles, achievements..."
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="targetPrograms">Programs of Interest</Label>
                  <Textarea
                    id="targetPrograms"
                    placeholder="e.g., YALI, Chevening, Rhodes Scholarship, Tony Elumelu Foundation..."
                    value={formData.targetPrograms}
                    onChange={(e) => handleInputChange('targetPrograms', e.target.value)}
                    rows={4}
                  />
                  <p className="text-sm text-muted-foreground">
                    Not sure? We'll recommend programs based on your profile.
                  </p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="essayDraft">Personal Statement or Essay</Label>
                  <Textarea
                    id="essayDraft"
                    placeholder="Paste your essay draft here for detailed AI feedback..."
                    value={formData.essayDraft}
                    onChange={(e) => handleInputChange('essayDraft', e.target.value)}
                    rows={10}
                  />
                  <p className="text-sm text-muted-foreground">
                    This is optional but highly recommended for comprehensive feedback.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
              >
                Previous
              </Button>

              {step < totalSteps ? (
                <Button onClick={() => setStep((s) => s + 1)}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Analyzing...' : 'Complete Assessment'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
