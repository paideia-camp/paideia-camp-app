import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Target,
  BookOpen,
  Users,
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BarChart3,
} from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { useState } from "react";
import HeroImage from "@/images/pade_hero.png";
import Carousel1Image from "@/images/dashboardcaurosel1.png";
import DashboardLastImage from "@/images/dashboardlast.png";

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const userName = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "there";

  // Personalized recommendations data
  const recommendations = [
    {
      title: "Systems Thinking for Leaders",
      organization: "Stanford University",
      description:
        "Learn to analyze complex systems and design solutions that address root causes.",
      match: "88% Match",
      deadline: "Dec 15, 2024",
      image: Carousel1Image,
    },
    {
      title: "Young African Leaders Initiative",
      organization: "U.S. Department of State",
      description:
        "Develop leadership skills and connect with emerging leaders across Africa.",
      match: "92% Match",
      deadline: "Jan 30, 2025",
      image: HeroImage,
    },
    {
      title: "Global Governance Fellowship",
      organization: "United Nations",
      description:
        "Gain hands-on experience in international policy and global governance.",
      match: "85% Match",
      deadline: "Feb 28, 2025",
      image: DashboardLastImage,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % recommendations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? recommendations.length - 1 : prev - 1
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 top-40 relative pb-12">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold">Welcome Back, {userName}! 👋</h1>
          <p className="text-muted-foreground mt-2">
            You have identified 8 Opportunities. Your Next Step is Achieve a
            Full Score
          </p>
        </div>

        {/* Quick Access Grid */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Run Diagnostic */}
            <Card
              className="cursor-pointer transition-all hover:shadow-lg border-2 hover:border-primary/50"
              onClick={() => navigate("/assessment")}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                  >
                    Assessment
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2">Run Diagnostic</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Assess your readiness and get personalized
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Start Assessment
                </Button>
              </CardContent>
            </Card>

            {/* Mindset Modules */}
            <Card
              className="cursor-pointer transition-all hover:shadow-lg border-2 hover:border-primary/50"
              onClick={() => navigate("/programs")}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-purple-50">
                    <Brain className="h-6 w-6 text-purple-600" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-700"
                  >
                    In Progress
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2">Mindset Modules</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Build your mindset with our AI-driven
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Explore Modules
                </Button>
              </CardContent>
            </Card>

            {/* Find Progress */}
            <Card
              className="cursor-pointer transition-all hover:shadow-lg border-2 hover:border-primary/50"
              onClick={() => navigate("/analytics")}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-green-50">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                  >
                    Live updates
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2">Find Progress</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Review your progress and see what's
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Access Progress
                </Button>
              </CardContent>
            </Card>

            {/* Application Coach */}
            <Card
              className="cursor-pointer transition-all hover:shadow-lg border-2 hover:border-primary/50"
              onClick={() => navigate("/coach")}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-orange-50">
                    <Sparkles className="h-6 w-6 text-orange-600" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-700"
                  >
                    AI Powered
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Application Coach
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get real-time feedback on your drafts
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Review Essay
                </Button>
              </CardContent>
            </Card>

            {/* View Progress */}
            <Card
              className="cursor-pointer transition-all hover:shadow-lg border-2 hover:border-primary/50"
              onClick={() => navigate("/tracker")}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-indigo-50">
                    <TrendingUp className="h-6 w-6 text-indigo-600" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700"
                  >
                    New Programs
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2">View Progress</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Track your journey and achievements
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  See Progress
                </Button>
              </CardContent>
            </Card>

            {/* Mentor Service */}
            <Card
              className="cursor-pointer transition-all hover:shadow-lg border-2 hover:border-primary/50"
              onClick={() => navigate("/mentors")}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-pink-50">
                    <Users className="h-6 w-6 text-pink-600" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-pink-100 text-pink-700"
                  >
                    Connect
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2">Mentor Service</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with experienced mentors
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Find Mentor
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Personalized For You - Carousel */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Personalized For You</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {recommendations.map((recommendation, index) => (
                    <div
                      key={index}
                      className="min-w-full flex flex-col md:flex-row gap-6"
                    >
                      <div className="md:w-1/3">
                        <img
                          src={recommendation.image}
                          alt={recommendation.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <div className="md:w-2/3 flex flex-col justify-between">
                        <div>
                          <Badge className="mb-3 bg-red-500 hover:bg-red-600">
                            HOT
                          </Badge>
                          <h3 className="text-2xl font-bold mb-2">
                            {recommendation.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-1">
                            {recommendation.organization}
                          </p>
                          <p className="text-sm mb-4">
                            {recommendation.description}
                          </p>
                          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground mb-4">
                            <span className="font-semibold text-green-600">
                              {recommendation.match}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Deadline: {recommendation.deadline}
                            </span>
                          </div>
                        </div>
                        <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {recommendations.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "w-8 bg-blue-600"
                        : "w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Your Progress */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-2">
                  <span className="font-medium">Readiness Score</span>
                  <span className="text-2xl font-bold text-blue-600">
                    78/100
                  </span>
                </div>
                <Progress value={78} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">
                  +8% from last assessment
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-2">
                  <span className="font-medium">Improvement Gap</span>
                  <span className="text-2xl font-bold text-green-600">
                    + 15 %
                  </span>
                </div>
                <Progress value={15} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">
                  Keep up the great work!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row items-start gap-4 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <div className="p-2 rounded-lg bg-yellow-100">
                  <Calendar className="h-5 w-5 text-yellow-700" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Chevening Scholarship</p>
                  <p className="text-sm text-muted-foreground">
                    Application closes: Nov 5, 2024
                  </p>
                </div>
                <Badge className="bg-yellow-500 hover:bg-yellow-600">
                  3 days left
                </Badge>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Calendar className="h-5 w-5 text-blue-700" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Tony Elumelu Foundation</p>
                  <p className="text-sm text-muted-foreground">
                    Application closes: Jan 1, 2025
                  </p>
                </div>
                <Badge className="bg-blue-500 hover:bg-blue-600">
                  16 days left
                </Badge>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-4 p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="p-2 rounded-lg bg-green-100">
                  <Calendar className="h-5 w-5 text-green-700" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Mandela Washington Fellowship</p>
                  <p className="text-sm text-muted-foreground">
                    Application closes: Oct 10, 2025
                  </p>
                </div>
                <Badge className="bg-green-500 hover:bg-green-600">
                  50 days left
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-green-100">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Completed Readiness Assessment</p>
                  <p className="text-sm text-muted-foreground">
                    Score: 78/100 • Nov 1, 2024
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-blue-100">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    Started "Systems Thinking" Module
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Progress: 40% • Oct 31, 2024
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-purple-100">
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    Applied to Chevening Scholarship
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Status: In Review • Oct 30, 2024
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-orange-100">
                  <Users className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    Connected with Mentor: Dr. Sarah Johnson
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Next session: Nov 8, 2024
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Keep Building Your Future */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-3">
                  Keep Building Your Future! 🚀
                </h2>
                <p className="mb-4 text-purple-100">
                  "Every great achievement starts with a single step. Stay
                  focused, keep learning, and never stop pursuing your goals!"
                </p>
                <Link
                  to="/courses"
                  // variant="secondary"
                  className="bg-white text-purple-600 hover:bg-green-500 rounded-xl py-3 px-5 my-5 hover:font-bold hover:text-white"
                >
                  Continue Learning
                </Link>
              </div>
              <div className="md:w-1/3">
                <img
                  src={DashboardLastImage}
                  alt="Keep building"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
