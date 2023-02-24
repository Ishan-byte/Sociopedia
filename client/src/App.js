import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Home from "scenes/homePage";
import Login from "scenes/loginPage";
import Profile from "scenes/profilePage";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/profile/:userId" exact element={<Profile />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
