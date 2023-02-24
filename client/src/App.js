import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/system";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Home from "scenes/homePage";
import Login from "scenes/loginPage";
import Profile from "scenes/profilePage";
import { themeSettings } from "theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => {
    createTheme(themeSettings(mode));
  }, [mode]);

  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/login" exact element={<Login />}></Route>
            <Route path="/profile/:userId" exact element={<Profile />}></Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
