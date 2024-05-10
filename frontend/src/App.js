import "./App.css";
import { useState } from "react";
import Login from "./components/account/Login.js";
import Home from "./components/home/Home.js";
import DataProvider from "./context/DataProvider.js";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import Header from "./components/header/Header.js";
import CreatePost from "./components/create/CreatePost.js";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? <><Header /><Outlet/></> : <Navigate replace to="/login" />;  
};
function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
        
        <div className="App" style={{ marginTop: 64 }}>
          <Routes>
            <Route
              path="/login"
              element={<Login isUserAuthenticated={isUserAuthenticated} />}
            />
            <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated}/>}><Route path="/" element={<Home />} /></Route>
            <Route path="/create" element={<PrivateRoute isAuthenticated={isAuthenticated}/>}><Route path="/create" element={<CreatePost />} /></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
    // </BrowserRouter>
  );
}

export default App;
