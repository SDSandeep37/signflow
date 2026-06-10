import "./App.css";
import Landing from "./Pages/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Dashoard from "./Pages/Dashoard";
import { UserAuthProvider } from "./Contexts/AuthContext";

import Documents from "./Pages/Documents";
import DashboardLayout from "./components/DashboardLayout";
import Document from "./Pages/Document";
const App = () => {
  return (
    <Router>
      <UserAuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashoard />} />
              <Route path="documents" element={<Documents />} />
              <Route path="documents/:id" element={<Document />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserAuthProvider>
    </Router>
  );
};

export default App;
// const App = () => {
//   return (
//     <div className="bg-fuchsia-500">
//       <ul className="flex flex-col items-center justify-center h-screen text-white text-4xl font-bold">
//         <li>Every signature tells a story — securely</li>
//         <li>Secure digital signing made effortless.</li>
//       </ul>
//     </div>
//   );
// };

// export default App;
