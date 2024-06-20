import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import { useSupabaseAuth } from "./integrations/supabase/auth.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  const { session } = useSupabaseAuth();

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
