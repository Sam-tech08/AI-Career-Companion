import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Projects from "../pages/Projects";
import AIResumeBuilder from "../pages/AIResumeBuilder";
import Quiz from "../pages/Quiz";
import Jobs from "../pages/Jobs";
import MockInterview from "../pages/MockInterview";
import MockInterviewSession from "../pages/MockInterviewSession";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ResumeBuilder from "../pages/ResumeBuilder";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/ai-resume-builder" element={<AIResumeBuilder />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/jobs" element={<Jobs />} />
  <Route path="/mock-interview" element={<MockInterview />} />
  <Route path="/mock-interview/session" element={<MockInterviewSession />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume-builder"
          element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
