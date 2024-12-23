import LandingPage from "./apps/runam/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./screens/NotFound";
import One from "./apps/runam/screens/onboarding/one";
import Two from "./apps/runam/screens/onboarding/two";
import Three from "./apps/runam/screens/onboarding/three";
import ProfileLayout from "./apps/runam/AppLayout";
import ProfileLayout2 from "./apps/runam/SecLayout";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext";
import Signin from "./apps/runam/screens/auth/SignIn";
import Signup from "./apps/runam/screens/auth/SignUp";
import Errands from "./apps/runam/screens/errands/Errands"
import CreateErrand from "./apps/runam/screens/errands/Create";
import ContinueErrand from "./apps/runam/screens/errands/Continue";
import HomeScreen from "./apps/runam/screens/errands/Home";
import Settings from "./apps/runam/screens/settings";
import TaskDetails from "./apps/runam/screens/errands/TaskDetails";
import TaskDetails2 from "./apps/runam/screens/errands/TaskDetails2";
import TaskHistory from "./apps/runam/screens/errands/History";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <div id="app">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/runam" element={<LandingPage />} />
              <Route path="/runam/onboarding/*" element={<ProfileLayout2 />}>
                <Route index element={<One />} />
                <Route path="two" element={<Two />} />
                <Route path="three" element={<Three />} />
              </Route>
              <Route path="/runam/auth/*" element={<ProfileLayout2 />}>
                <Route index element={<Signin />} />
                <Route path="signin" element={<Signin />} />
                <Route path="signup" element={<Signup />} />
              </Route>
              <Route path="/runam/errands/*" element={<ProfileLayout />}>
              <Route index element={<HomeScreen />} />
              <Route path=":id" element={<TaskDetails />} />
              <Route path="runner/:id" element={<TaskDetails2 />} />
              <Route path="pending" element={<Errands />} />
              <Route path="history" element={<TaskHistory />} />
              <Route path="create" element={<CreateErrand />} />
              <Route path="continue" element={<ContinueErrand />} />
              <Route path="create/:urlCategory" element={<CreateErrand />} />
              </Route>
              <Route path="/runam/settings/*" element={<ProfileLayout />}>
              <Route index element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
