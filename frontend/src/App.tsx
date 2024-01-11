import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import "./App.css";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import { UserAttributes } from "./models/User";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = React.useState<UserAttributes | null>(null);

  return (
    <div className="App">
      {user ? (
        <>
          <Navbar user={user} />
          <Routes>
            {routes.map((r, index) => (
              <Route
                key={index}
                path={r.path}
                element={<r.component user={user} />}
              />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<SignIn setUser={setUser} />} />
          <Route path="/signup" element={<SignUp setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
