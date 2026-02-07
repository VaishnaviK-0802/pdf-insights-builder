import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Play, FileText, Image as ImageIcon, HelpCircle, CheckCircle2, Circle, PanelLeftClose, PanelLeftOpen, Paperclip, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockCourses, mockLessons, mockQuiz } from "@/data/mockData";
import QuizPlayer from "@/components/learner/QuizPlayer";
import { motion, AnimatePresence } from "framer-motion";

const typeIcons: Record<string, React.ElementType> = {
  video: Play,
  document: FileText,
  image: ImageIcon,
  quiz: HelpCircle,
};

const LessonPlayerPage = () => {
  const { courseId } = useParams();
  const course = mockCourses.find((c) => c.id === courseId) || mockCourses[0];
  const lessons = mockLessons.filter((l) => l.courseId === course.id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    new Set(lessons.filter((l) => l.completed).map((l) => l.id))
  );

  const current = lessons[currentIndex];
  const completedCount = completedIds.size;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  const markComplete = () => {
    setCompletedIds((prev) => new Set([...prev, current.id]));
  };

  const goNext = () => {
    markComplete();
    if (currentIndex < lessons.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const renderContent = () => {
    if (current.type === "quiz") {
      return <QuizPlayer quiz={mockQuiz} />;
    }
    if (current.type === "video") {
      return (
        <div className="aspect-video bg-foreground/5 rounded-xl flex items-center justify-center border border-border">
          <div className="text-center space-y-3">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Play className="h-10 w-10 text-primary ml-1" />
            </div>
            <p className="text-muted-foreground text-sm">Video Player — {current.title}</p>
            <p className="text-xs text-muted-foreground/60">Duration: {current.duration}</p>
          </div>
        </div>
      );
    }
    if (current.type === "document") {
      return (
        <div className="bg-card rounded-xl border border-border p-8 min-h-[400px] flex items-center justify-center">
          <div className="text-center space-y-3">
            <FileText className="h-16 w-16 text-primary/40 mx-auto" />
            <p className="text-muted-foreground">Document Viewer — {current.title}</p>
            <Button variant="outline" size="sm">Download Document</Button>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-card rounded-xl border border-border p-8 min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-3">
          <ImageIcon className="h-16 w-16 text-primary/40 mx-auto" />
          <p className="text-muted-foreground">Image Viewer — {current.title}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top bar */}
      <div className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <Link to={`/course/${course.id}`}>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <ArrowLeft className="h-4 w-4" /> Exit
            </Button>
          </Link>
          <span className="text-sm font-heading font-semibold text-foreground truncate">{course.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">{progressPercent}% complete</span>
          <Progress value={progressPercent} className="w-32 h-2" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-r border-border bg-card overflow-y-auto shrink-0"
            >
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-sm text-card-foreground">Course Content</h3>
                  <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground">
                    <PanelLeftClose className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-1">
                  {lessons.map((lesson, i) => {
                    const Icon = typeIcons[lesson.type] || BookOpen;
                    const isActive = i === currentIndex;
                    const isDone = completedIds.has(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-full text-left flex items-center gap-3 p-2.5 rounded-lg text-sm transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                        ) : (
                          <Circle className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground/40"}`} />
                        )}
                        <span className="flex-1 truncate font-medium">{lesson.title}</span>
                        <Icon className="h-3.5 w-3.5 shrink-0 opacity-50" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="fixed left-2 top-20 z-10 p-2 rounded-md bg-card border border-border shadow-card hover:bg-muted"
            >
              <PanelLeftOpen className="h-4 w-4 text-muted-foreground" />
            </button>
          )}

          <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <span className="uppercase tracking-wide">{current.type}</span>
                <span>•</span>
                <span>{current.duration}</span>
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground">{current.title}</h2>
              <p className="text-muted-foreground mt-2">{current.description}</p>
            </div>

            {renderContent()}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} / {lessons.length}
              </span>
              {currentIndex < lessons.length - 1 ? (
                <Button onClick={goNext} className="gap-2 bg-gradient-hero text-primary-foreground font-semibold">
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={markComplete} className="gap-2 bg-gradient-accent text-accent-foreground font-semibold">
                  Complete Course <CheckCircle2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LessonPlayerPage;
