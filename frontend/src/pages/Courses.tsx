import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export default function Courses() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <BookOpen className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Mindset Micro-Courses</h1>
            <p className="text-muted-foreground mt-1">
              Interactive lessons on leadership and global citizenship
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
              Access interactive micro-courses on leadership, systems thinking, and global citizenship.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
