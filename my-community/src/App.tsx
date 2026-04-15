import NoticeList from "./page/notice/NoticeList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Join from "./page/member/Join";
import Login from "./page/member/Login";
import NoticeDetail from "./page/notice/NoticeDetail";
import NoticeForm from "./page/notice/NoticeForm";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/notice/list" element={<NoticeList />} />
            <Route path="/notice/detail/:id" element={<NoticeDetail />} />
            <Route path="/notice/write" element={<NoticeForm />} />
            <Route path="/notice/update/:id" element={<NoticeForm />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
