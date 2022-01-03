import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { snackBar } from './services/general'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Material Dashboard 2 React example components
import routes from "./routes";
import Sidebar from './components/Sidebar/Sidebar.jsx'
import './App.scss'
import Header from "./components/Header/Header";

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#007b55',
      dark: '#636363'
    },
    secondary: {
      main: '#007b55',
      dark: '#636363'
    },
  },
});

export default function App() {

  const { pathname } = useLocation();
  const [snackData, setSnackData] = React.useState({});

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    snackBar.subscribe(data => {
      setSnackData(data)
    })

  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });

  return <ThemeProvider theme={theme}>
    <div className="wd-admin-root">
      <Sidebar routes={routes} />
      <Snackbar
        open={snackData.open}
        autoHideDuration={3000}
        onClose={() => { snackBar.next({})}}
      >
        <Alert severity={snackData.severity}>{snackData.message}</Alert>
      </Snackbar>
      <div className="wd-admin-main">
        <Header />
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  </ThemeProvider>
}
