import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./components/MemberList";
import MemberList from "./components/MemberList";
import MemberForm from "./components/MemberForm";
import MemberDetail from "./components/MemberDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MemberList />}></Route>
        <Route path="/write" element={<MemberForm />}></Route>
        <Route path="/detail/:id" element={<MemberDetail />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
