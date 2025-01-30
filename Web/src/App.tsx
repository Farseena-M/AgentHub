import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddAgent from "./pages/AddAgent";
import ViewPage from "./pages/ViewPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-agent" element={<AddAgent />} />
        <Route path="/view-agents-tasks" element={<ViewPage />} />
      </Routes>
    </div>
  );
};

export default App;
