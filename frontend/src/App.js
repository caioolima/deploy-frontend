import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import AuthLayout from "./components/AuthLayout/auth";
import Terms from "./pages/Terms/terms";
import Service from "./pages/Terms/service";
import Privacy from "./pages/Terms/privacy";
import UserProfileContainer from "./pages/Profile/UserProfileContainer";
import Introduction from "./pages/ConnecterHome/introduction";
import SearchUser from "./pages/SearchUser/SearchUser";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute"; // Importa o novo componente PublicRoute
import FirstWorldCountries from "./pages/Community/World Community/FirstWorldCountries";
import Community from "./pages/Community/Community Services/Community";
import ChatScreen from "./pages/Community/Chat/ChatScreen";
import FeedPage from "./pages/Feed/feed";
import BackpackingArticle from "./pages/Community/Articles/BestPlaces/BackpackingArticle";
import BackpackingIntroduction from "./pages/Community/Articles/IntroductionBackpacker/BackpackerArticle";
import PerfectPhotos from "./pages/Community/Articles/PhotosArticle/PerfectPhotosArticle";
import SupportPage from "./pages/Support/Support Page/SupportPage";
import AccountSupport from "./pages/Support/Account Support/AccountSuport";
import FAQ from "./pages/Support/FAQ/FAQ";
import FeatureRequests from "./pages/Support/Feature Requests/FeatureRequests";
import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <PublicRoute>
              <AuthLayout>
                <Introduction />
              </AuthLayout>
            </PublicRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <PublicRoute>
              <AuthLayout>
                <HomeScreen />
              </AuthLayout>
            </PublicRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/reset"
        element={
          <AuthLayout>
            <ResetPassword />
          </AuthLayout>
        }
      />
      <Route
        path="/terms"
        element={
          <AuthLayout>
            <Terms />
          </AuthLayout>
        }
      />
      <Route
        path="/service"
        element={
          <AuthLayout>
            <Service />
          </AuthLayout>
        }
      />
      <Route
        path="/privacy"
        element={
          <AuthLayout>
            <Privacy />
          </AuthLayout>
        }
      />
      <Route
        path="/profile/:userId"
        element={
          <LanguageProvider>
            <UserProfileContainer />
          </LanguageProvider>
        }
      />
      <Route path="/search" element={<SearchUser />} />
      <Route
        path="*"
        element={
          <LanguageProvider>
            <PublicRoute>
              <NotFoundPage />
            </PublicRoute>{" "}
          </LanguageProvider>
        }
      />
      <Route path="/worldcommunity" element={<FirstWorldCountries />} />
      <Route
        path="/comunidade/:countryId/:communityId/chat"
        element={  <LanguageProvider><ChatScreen /></LanguageProvider>}
      />
      <Route
        path="/community/:countryId/:communityId"
        element={<Community />}
      />
      <Route path="/feed/:userId" element={<FeedPage />} />

      <Route path="/backpacking-article" element={<BackpackingArticle />} />
      <Route
        path="/backpacking-introduction"
        element={<BackpackingIntroduction />}
      />
      <Route path="/perfect-photos" element={<PerfectPhotos />} />
      <Route path="/support-page" element={<SupportPage />}></Route>
      <Route path="/support-page" element={<SupportPage />} />
      <Route path="/support/account" element={<AccountSupport />} />
      <Route path="/support/faq" element={<FAQ />} />
      <Route path="/support/feature-requests" element={<FeatureRequests />} />
    </Routes>
  );
}

export default App;
