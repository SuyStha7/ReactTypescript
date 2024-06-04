import { Route, Routes } from "react-router-dom";
import Login from "./components/Form/Login";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
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
