import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  FileText,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Target,
  Sparkles,
  Upload,
  Send,
} from "lucide-react";

export default function Coach() {
  const [essayText, setEssayText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalyzing(false);
    }, 2000);
  };

  const features = [
    {
      icon: CheckCircle2,
      title: "Structure Analysis",
      description:
        "Evaluate the organization and flow of your essay, ensuring logical progression",
      color: "green",
    },
    {
      icon: Target,
      title: "Clarity Check",
      description:
        "Identify unclear passages and suggest improvements for better readability",
      color: "blue",
    },
    {
      icon: Lightbulb,
      title: "Mindset Alignment",
      description:
        "Assess how well your essay demonstrates leadership and global citizenship",
      color: "purple",
    },
    {
      icon: Sparkles,
      title: "Impact Enhancement",
      description:
        "Recommend ways to make your narrative more compelling and memorable",
      color: "orange",
    },
  ];

  const sampleFeedback = [
    {
      type: "strength",
      title: "Strong Opening",
      message:
        "Your introduction effectively captures attention with a personal anecdote that demonstrates leadership.",
      icon: CheckCircle2,
      color: "green",
    },
    {
      type: "improvement",
      title: "Clarity Issue",
      message:
        "Paragraph 3 contains complex sentences that may confuse readers. Consider breaking them into shorter, clearer statements.",
      icon: AlertCircle,
      color: "orange",
    },
    {
      type: "suggestion",
      title: "Add Specific Examples",
      message:
        "Your discussion of community impact would be stronger with concrete metrics or specific outcomes.",
      icon: Lightbulb,
      color: "blue",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 top-40 relative pb-12">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-purple-100">
            <Brain className="h-10 w-10 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Application Coach</h1>
            <p className="text-muted-foreground mt-1">
              Get instant, AI-powered feedback on your essays and statements
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClasses = {
              green: "bg-green-100 text-green-600",
              blue: "bg-blue-100 text-blue-600",
              purple: "bg-purple-100 text-purple-600",
              orange: "bg-orange-100 text-orange-600",
            }[feature.color];

            return (
              <Card
                key={index}
                className="border-2 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className={`p-3 rounded-lg ${colorClasses} w-fit mb-3`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Essay Input Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Your Essay
              </CardTitle>
              <CardDescription>
                Paste your essay or personal statement below for analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your essay here... (minimum 100 words)"
                className="min-h-[300px] resize-none"
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {essayText.split(" ").filter((w) => w).length} words
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAnalyze}
                    disabled={
                      analyzing ||
                      essayText.split(" ").filter((w) => w).length < 100
                    }
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {analyzing ? (
                      <>Analyzing...</>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Analyze Essay
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Section */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI Feedback
              </CardTitle>
              <CardDescription>
                Detailed analysis and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {essayText.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
                  <Brain className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Paste your essay to receive AI-powered feedback
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sampleFeedback.map((feedback, index) => {
                    const Icon = feedback.icon;
                    const colorClasses = {
                      green: "bg-green-50 border-green-200",
                      orange: "bg-orange-50 border-orange-200",
                      blue: "bg-blue-50 border-blue-200",
                    }[feedback.color];

                    const iconColorClasses = {
                      green: "bg-green-100 text-green-600",
                      orange: "bg-orange-100 text-orange-600",
                      blue: "bg-blue-100 text-blue-600",
                    }[feedback.color];

                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-2 ${colorClasses}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${iconColorClasses}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">
                              {feedback.title}
                            </h4>
                            <p className="text-sm text-gray-700">
                              {feedback.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle>How the AI Coach Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-purple-600 text-white font-bold text-sm w-8 h-8 flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Submit Your Essay</h4>
                  <p className="text-sm text-gray-700">
                    Paste or upload your personal statement, essay, or
                    application response
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-purple-600 text-white font-bold text-sm w-8 h-8 flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">AI Analysis</h4>
                  <p className="text-sm text-gray-700">
                    Our AI evaluates structure, clarity, impact, and alignment
                    with fellowship values
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-purple-600 text-white font-bold text-sm w-8 h-8 flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Get Feedback</h4>
                  <p className="text-sm text-gray-700">
                    Receive detailed recommendations to strengthen your
                    application
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              Pro Tips for Better Essays
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  <strong>Be specific:</strong> Use concrete examples and
                  metrics to demonstrate impact
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  <strong>Show growth:</strong> Highlight how experiences shaped
                  your perspective and goals
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  <strong>Connect to values:</strong> Align your narrative with
                  the fellowship's mission and values
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  <strong>Be authentic:</strong> Let your unique voice and
                  passion shine through
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
