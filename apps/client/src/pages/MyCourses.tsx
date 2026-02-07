import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockCourses } from "@/data/mockData";
import CourseCard from "@/components/courses/CourseCard";
import ProfilePanel from "@/components/learner/ProfilePanel";
import Navbar from "@/components/layout/Navbar";

const MyCourses = () => {
  const [search, setSearch] = useState("");
  const enrolled = mockCourses.filter((c) => c.progress > 0 || c.access === "open");
  const filtered = enrolled.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">My Courses</h1>
        <p className="text-muted-foreground mb-8">Track your learning progress and continue where you left off</p>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Panel */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <ProfilePanel />
          </div>

          {/* Courses */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="relative max-w-sm mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search my courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {filtered.map((course, i) => (
                <CourseCard key={course.id} course={course} showProgress index={i} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <p>No courses found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
