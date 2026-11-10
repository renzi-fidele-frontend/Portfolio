import { Suspense, useState } from "react";
import LeftNav from "./Components/LeftNav/LeftNav";
import "./App.css";
import { NavProvider } from "./Context/NavContext";
import { Outlet } from "react-router-dom";
import { LangProvider } from "./Context/LangContext";
import { ConteudoProvider } from "./Context/ConteudoContext";
import PreLoader from "./Components/PreLoader/PreLoader";
import AvisoConteudo from "./Components/AvisoConteudo/AvisoConteudo";
import i18n from "./i18n/i18n";

function App() {
   const [nav, setNav] = useState(false);
   const [idioma, setIdioma] = useState(i18n.language);

   return (
      <LangProvider value={{ idioma, setIdioma }}>
         <NavProvider value={{ nav, setNav }}>
            {/* Projetos, servicos e testemunhos vem do CMS; um pedido para todo o site */}
            <ConteudoProvider>
               <Suspense fallback={<PreLoader />}>
                  <div id="App">
                     <LeftNav />
                     <Outlet />
                     <AvisoConteudo />
                  </div>
               </Suspense>
            </ConteudoProvider>
         </NavProvider>
      </LangProvider>
   );
}

export default App;
