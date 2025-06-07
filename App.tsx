import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider } from "@/contexts/UserContext";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import GameDetailPage from "@/pages/GameDetailPage";
import GradePage from "@/pages/GradePage";
import AboutPage from "@/pages/AboutPage";
import ParentsPage from "@/pages/ParentsPage";
import TeachersPage from "@/pages/TeachersPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Parent pages
import ParentsGettingStartedPage from "@/pages/ParentsGettingStartedPage";
import ParentsPremiumPage from "@/pages/ParentsPremiumPage";
import ParentsProgressPage from "@/pages/ParentsProgressPage";
import ParentsSafetyPage from "@/pages/ParentsSafetyPage";
import ParentsFAQPage from "@/pages/ParentsFAQPage";

// Teacher pages
import TeachersClassroomToolsPage from "@/pages/TeachersClassroomToolsPage";
import TeachersLessonPlansPage from "@/pages/TeachersLessonPlansPage";
import TeachersSubscriptionsPage from "@/pages/TeachersSubscriptionsPage";
import TeachersRemoteLearningPage from "@/pages/TeachersRemoteLearningPage";
import TeachersResourcesPage from "@/pages/TeachersResourcesPage";

// Misc pages
import CookiesPage from "@/pages/CookiesPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import ContactPage from "@/pages/ContactPage";
import GamesBySubjectPage from "@/pages/GamesBySubjectPage";
import ClassroomToolsPage from "@/pages/ClassroomToolsPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/game/:slug" component={GameDetailPage} />
      <Route path="/grade/:slug" component={GradePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/parents" component={ParentsPage} />
      <Route path="/teachers" component={TeachersPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/privacy" component={PrivacyPage} />
      
      {/* Parent pages */}
      <Route path="/parents/getting-started" component={ParentsGettingStartedPage} />
      <Route path="/parents/premium" component={ParentsPremiumPage} />
      <Route path="/parents/progress" component={ParentsProgressPage} />
      <Route path="/parents/safety" component={ParentsSafetyPage} />
      <Route path="/parents/faq" component={ParentsFAQPage} />
      
      {/* Teacher pages */}
      <Route path="/teachers/classroom-tools" component={TeachersClassroomToolsPage} />
      <Route path="/teachers/lesson-plans" component={TeachersLessonPlansPage} />
      <Route path="/teachers/school-subscriptions" component={TeachersSubscriptionsPage} />
      <Route path="/teachers/remote-learning" component={TeachersRemoteLearningPage} />
      <Route path="/teachers/resources" component={TeachersResourcesPage} />
      
      {/* Misc pages */}
      <Route path="/cookies" component={CookiesPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:id" component={BlogPostPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/games-by-subject" component={GamesBySubjectPage} />
      <Route path="/classroom-tools" component={ClassroomToolsPage} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
