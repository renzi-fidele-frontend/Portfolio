import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Portfolio from "./Pages/Portfolio/Portfolio.jsx";
import MainPage from "./Pages/MainPage/MainPage.jsx";
import "react-tabs/style/react-tabs.css";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <BrowserRouter>
         <Routes>
            <Route element={<App />}>
               <Route exact path="/" element={<MainPage />} />
               <Route path="/portfolio" element={<Portfolio />} />
            </Route>
         </Routes>
      </BrowserRouter>
   </React.StrictMode>
);
