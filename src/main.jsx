import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Portfolio from "./Pages/Portfolio/Portfolio.jsx";
import MainPage from "./Pages/MainPage/MainPage.jsx";
import "react-tabs/style/react-tabs.css";

//  Painel do CMS
import { AuthProvider } from "./Context/AuthContext.jsx";
import RotaProtegida from "./Components/Admin/RotaProtegida.jsx";
import Login from "./Pages/Admin/Login/Login.jsx";
import Painel from "./Pages/Admin/Painel/Painel.jsx";
import ListaProjetos from "./Pages/Admin/Projetos/ListaProjetos.jsx";
import FormProjeto from "./Pages/Admin/Projetos/FormProjeto.jsx";
import ListaServicos from "./Pages/Admin/Servicos/ListaServicos.jsx";
import FormServico from "./Pages/Admin/Servicos/FormServico.jsx";
import ListaTestemunhos from "./Pages/Admin/Testemunhos/ListaTestemunhos.jsx";
import FormTestemunho from "./Pages/Admin/Testemunhos/FormTestemunho.jsx";
import Conta from "./Pages/Admin/Conta/Conta.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <BrowserRouter>
         <AuthProvider>
            <Routes>
               {/* Site publico */}
               <Route element={<App />}>
                  <Route exact path="/" element={<MainPage />} />
                  <Route path="/portfolio" element={<Portfolio />} />
               </Route>

               {/* Painel do CMS: layout proprio, sem a sidebar do site */}
               <Route path="/admin/login" element={<Login />} />
               <Route element={<RotaProtegida />}>
                  <Route path="/admin" element={<Painel />}>
                     <Route index element={<Navigate to="/admin/projetos" replace />} />
                     <Route path="projetos" element={<ListaProjetos />} />
                     <Route path="projetos/novo" element={<FormProjeto />} />
                     <Route path="projetos/:id" element={<FormProjeto />} />
                     <Route path="servicos" element={<ListaServicos />} />
                     <Route path="servicos/novo" element={<FormServico />} />
                     <Route path="servicos/:id" element={<FormServico />} />
                     <Route path="testemunhos" element={<ListaTestemunhos />} />
                     <Route path="testemunhos/novo" element={<FormTestemunho />} />
                     <Route path="testemunhos/:id" element={<FormTestemunho />} />
                     <Route path="conta" element={<Conta />} />
                  </Route>
               </Route>
            </Routes>
         </AuthProvider>
      </BrowserRouter>
   </React.StrictMode>
);
