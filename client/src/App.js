import { CssBaseline, ThemeProvider } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Components
import Home from "scenes/homePage";
import Login from "scenes/loginPage";
import Profile from "scenes/profilePage";
import { theme_Settings } from "theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(theme_Settings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" exact element={<Login />}></Route>
            <Route
              path="/"
              exact
              element={isAuth ? <Home /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/profile/:userId"
              exact
              element={isAuth ? <Profile /> : <Navigate to="/login" />}
            />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
