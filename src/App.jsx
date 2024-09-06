import { Suspense, useState } from "react";
import LeftNav from "./Components/LeftNav/LeftNav";
import "./App.css";
import { NavProvider } from "./Context/NavContext";
import { Outlet } from "react-router-dom";
import { LangProvider } from "./Context/LangContext";

function App() {
   const [nav, setNav] = useState(false);
   const [idioma, setIdioma] = useState("pt");
   // TODO: Adicionar modo de idiomas em PT / EN

   return (
      <LangProvider value={{ idioma, setIdioma }}>
         <NavProvider value={{ nav, setNav }}>
            <Suspense fallback={<p>Loading...</p>}>
               <div id="App">
                  <LeftNav />
                  <Outlet />
               </div>
            </Suspense>
         </NavProvider>
      </LangProvider>
   );
}

export default App;
