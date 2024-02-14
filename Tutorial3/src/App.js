import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./Register";
import Profile from "./Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/*" element={<Navigate to="/register" />} />
      </Routes>
    </div>
  );
}

export default App;
