import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';

export default function Coach() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Brain className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">AI Application Coach</h1>
            <p className="text-muted-foreground mt-1">
              Get instant, AI-powered feedback on your essays and statements
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>
              This feature is currently under development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The AI Coach will provide detailed feedback on structure, clarity, and mindset
              alignment in your application materials.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
