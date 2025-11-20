import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Brain,
  Users,
  Globe,
  Target,
  Lightbulb,
  Clock,
  CheckCircle2,
  Lock,
  Play,
} from "lucide-react";

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "Leadership Foundations",
      description:
        "Develop core leadership skills essential for fellowship success",
      duration: "2 hours",
      modules: 8,
      progress: 75,
      status: "In Progress",
      icon: Users,
      color: "blue",
      locked: false,
    },
    {
      id: 2,
      title: "Systems Thinking Essentials",
      description:
        "Learn to analyze complex problems and design innovative solutions",
      duration: "1.5 hours",
      modules: 6,
      progress: 100,
      status: "Completed",
      icon: Brain,
      color: "green",
      locked: false,
    },
    {
      id: 3,
      title: "Global Citizenship",
      description:
        "Understand global challenges and your role in creating change",
      duration: "2.5 hours",
      modules: 10,
      progress: 30,
      status: "In Progress",
      icon: Globe,
      color: "purple",
      locked: false,
    },
    {
      id: 4,
      title: "Effective Communication",
      description:
        "Master the art of clear, persuasive communication in writing and speech",
      duration: "2 hours",
      modules: 7,
      progress: 0,
      status: "Not Started",
      icon: Target,
      color: "orange",
      locked: false,
    },
    {
      id: 5,
      title: "Innovation & Entrepreneurship",
      description:
        "Develop an entrepreneurial mindset and learn to drive innovation",
      duration: "3 hours",
      modules: 12,
      progress: 0,
      status: "Locked",
      icon: Lightbulb,
      color: "yellow",
      locked: true,
    },
    {
      id: 6,
      title: "Cultural Intelligence",
      description:
        "Navigate diverse cultural contexts with sensitivity and awareness",
      duration: "1.5 hours",
      modules: 5,
      progress: 0,
      status: "Locked",
      icon: Globe,
      color: "pink",
      locked: true,
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> =
      {
        blue: {
          bg: "bg-blue-100",
          text: "text-blue-600",
          border: "border-blue-200",
        },
        green: {
          bg: "bg-green-100",
          text: "text-green-600",
          border: "border-green-200",
        },
        purple: {
          bg: "bg-purple-100",
          text: "text-purple-600",
          border: "border-purple-200",
        },
        orange: {
          bg: "bg-orange-100",
          text: "text-orange-600",
          border: "border-orange-200",
        },
        yellow: {
          bg: "bg-yellow-100",
          text: "text-yellow-600",
          border: "border-yellow-200",
        },
        pink: {
          bg: "bg-pink-100",
          text: "text-pink-600",
          border: "border-pink-200",
        },
      };
    return colors[color] || colors.blue;
  };

  const getStatusBadge = (status: string) => {
    if (status === "Completed") {
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    }
    if (status === "In Progress") {
      return (
        <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>
      );
    }
    if (status === "Locked") {
      return (
        <Badge variant="secondary">
          <Lock className="h-3 w-3 mr-1" />
          Locked
        </Badge>
      );
    }
    return <Badge variant="outline">Not Started</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 top-40 relative pb-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-100">
              <BookOpen className="h-10 w-10 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Mindset Micro-Courses</h1>
              <p className="text-muted-foreground mt-1">
                Interactive lessons on leadership and global citizenship
              </p>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">6</div>
                <p className="text-sm text-muted-foreground">Total Courses</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">1</div>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">2</div>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  34%
                </div>
                <p className="text-sm text-muted-foreground">
                  Overall Progress
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course) => {
            const Icon = course.icon;
            const colors = getColorClasses(course.color);

            return (
              <Card
                key={course.id}
                className={`border-2 ${
                  colors.border
                } hover:shadow-lg transition-all ${
                  course.locked ? "opacity-60" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${colors.bg}`}>
                        <Icon className={`h-6 w-6 ${colors.text}`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          {course.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {course.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.modules} modules</span>
                    </div>
                    {getStatusBadge(course.status)}
                  </div>

                  {!course.locked && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">
                          {course.progress}%
                        </span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  <Button
                    className="w-full"
                    disabled={course.locked}
                    variant={course.locked ? "secondary" : "default"}
                  >
                    {course.locked ? (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Complete previous courses to unlock
                      </>
                    ) : course.progress === 0 ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Course
                      </>
                    ) : course.progress === 100 ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Review Course
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Continue Learning
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Learning Path Info */}
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Your Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Complete courses in sequence to unlock advanced modules. Each
              course builds on the previous one, creating a comprehensive
              preparation journey.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>
                Earn certificates upon completion to showcase your skills
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
