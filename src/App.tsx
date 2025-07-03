
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CafeDetail from "./pages/CafeDetail";
import CafeReviews from "./pages/CafeReviews";
import StudyCheck from "./pages/StudyCheck";
import MyPage from "./pages/MyPage";
import Community from "./pages/Community";
import Search from "./pages/Search";
import MyReviews from "./pages/MyReviews";
import MyFavorites from "./pages/MyFavorites";
import MyCommunity from "./pages/MyCommunity";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cafe/:id" element={<CafeDetail />} />
          <Route path="/cafe/:id/reviews" element={<CafeReviews />} />
          <Route path="/study-check" element={<StudyCheck />} />
          <Route path="/community" element={<Community />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/my-reviews" element={<MyReviews />} />
          <Route path="/my-favorites" element={<MyFavorites />} />
          <Route path="/my-community" element={<MyCommunity />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
