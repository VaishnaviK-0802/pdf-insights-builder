import { useState } from "react";
import { Search, Plus, MoreHorizontal, LayoutGrid, List, Eye, EyeOff, Pencil, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockCourses } from "@/data/mockData";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import type { Course } from "@/data/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  published: "bg-success/10 text-success",
  archived: "bg-destructive/10 text-destructive",
};

const AdminDashboard = () => {
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [search, setSearch] = useState("");

  const courses = mockCourses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = {
    draft: courses.filter((c) => c.status === "draft"),
    published: courses.filter((c) => c.status === "published"),
    archived: courses.filter((c) => c.status === "archived"),
  };

  const CourseActions = ({ course }: { course: Course }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="gap-2"><Pencil className="h-3.5 w-3.5" /> Edit</DropdownMenuItem>
        <DropdownMenuItem className="gap-2"><Eye className="h-3.5 w-3.5" /> Preview</DropdownMenuItem>
        <DropdownMenuItem className="gap-2"><Users className="h-3.5 w-3.5" /> Attendees</DropdownMenuItem>
        <DropdownMenuItem className="gap-2 text-destructive"><Trash2 className="h-3.5 w-3.5" /> Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Course Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage and organize your courses</p>
          </div>
          <Button className="bg-gradient-hero text-primary-foreground font-semibold gap-2">
            <Plus className="h-4 w-4" /> Create Course
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="flex gap-1 bg-muted rounded-lg p-1">
            <Button
              variant={view === "kanban" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setView("kanban")}
              className="gap-1.5"
            >
              <LayoutGrid className="h-4 w-4" /> Kanban
            </Button>
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setView("list")}
              className="gap-1.5"
            >
              <List className="h-4 w-4" /> List
            </Button>
          </div>
        </div>

        {/* Kanban View */}
        {view === "kanban" && (
          <div className="grid md:grid-cols-3 gap-6">
            {(["draft", "published", "archived"] as const).map((status) => (
              <div key={status} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={statusColors[status] + " capitalize font-medium"}>{status}</Badge>
                    <span className="text-xs text-muted-foreground">{grouped[status].length}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {grouped[status].map((course, i) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-card rounded-xl border border-border p-4 shadow-card hover:shadow-elevated transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading font-bold text-sm text-card-foreground truncate">{course.title}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{course.instructor}</p>
                        </div>
                        <CourseActions course={course} />
                      </div>
                      <img src={course.image} alt="" className="w-full h-28 object-cover rounded-lg mb-3" />
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{course.totalLessons} lessons</span>
                        <span>{course.enrolledCount} students</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {course.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">{tag}</Badge>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                  {grouped[status].length === 0 && (
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center text-sm text-muted-foreground">
                      No {status} courses
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {view === "list" && (
          <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Course</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Instructor</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Status</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Lessons</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Students</th>
                    <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img src={course.image} alt="" className="h-10 w-14 rounded-md object-cover" />
                          <div>
                            <p className="text-sm font-semibold text-foreground">{course.title}</p>
                            <div className="flex gap-1 mt-0.5">
                              {course.tags.slice(0, 2).map((t) => (
                                <Badge key={t} variant="outline" className="text-[10px] px-1.5 py-0">{t}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{course.instructor}</td>
                      <td className="py-3 px-4">
                        <Badge className={statusColors[course.status] + " capitalize text-xs"}>{course.status}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{course.totalLessons}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{course.enrolledCount}</td>
                      <td className="py-3 px-4 text-right">
                        <CourseActions course={course} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
