import { Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SidebarProvider } from "@/components/ui/sidebar";

import { ThemeProvider } from '@/contexts/theme-context';

import { Lesson } from "@/routes/lesson";
import { Courses } from "@/routes/courses";
import { Course } from "@/routes/course";
import { Landing } from "@/routes/landing";
import { Glossary } from "@/routes/glossary";
import { NotFound } from "@/routes/not-found";
import { SignUp } from "@/routes/signup";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        defaultTheme="system"
        storageKey="vite-ui-theme"
      >
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<Course />} />
            <Route path="/courses/:courseId/:lessonId" element={<Lesson />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
