import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function Mentors() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Users className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Find a Mentor</h1>
            <p className="text-muted-foreground mt-1">
              Connect with experienced fellows who can guide your journey
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
              Connect with mentors who have successfully navigated fellowship and scholarship applications.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
