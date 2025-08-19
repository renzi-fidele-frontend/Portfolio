import { Suspense, useState } from "react";
import LeftNav from "./Components/LeftNav/LeftNav";
import "./App.css";
import { NavProvider } from "./Context/NavContext";
import { Outlet } from "react-router-dom";
import { LangProvider } from "./Context/LangContext";
import PreLoader from "./Components/PreLoader/PreLoader";

function App() {
   const [nav, setNav] = useState(false);
   const [idioma, setIdioma] = useState("pt");

   return (
      <LangProvider value={{ idioma, setIdioma }}>
         <NavProvider value={{ nav, setNav }}>
            <Suspense fallback={<PreLoader />}>
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
