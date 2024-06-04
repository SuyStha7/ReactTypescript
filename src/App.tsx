import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/form'
          element={<Login />}
        />
      </Routes>
    </div>
  );
};

export default App;
