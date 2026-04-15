import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import MemberList from "./components/MemberList";
import MemberWrite from "./components/MemberWrite";
import MemberDetail from "./components/MemberDetail";

function AppContent() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<MemberList />} />
      <Route
        path="/write"
        element={<MemberWrite onCancel={() => navigate("/")} />}
      />
      <Route
        path="/detail/:id"
        element={<MemberDetail onBack={() => navigate("/")} />}
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent></AppContent>
    </Router>
  );
}

export default App;
