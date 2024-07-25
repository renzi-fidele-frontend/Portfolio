import { useState } from "react";
import LeftNav from "./Components/LeftNav/LeftNav";
import "./App.css";
import "react-tabs/style/react-tabs.css";
import { NavProvider } from "./Context/NavContext";
import { Outlet } from "react-router-dom";

function App() {
   const [nav, setNav] = useState(false);

   // TODO: Adicionar modo de idiomas em PT / EN

   return (
      <NavProvider value={{ nav, setNav }}>
         <div id="App">
            <LeftNav />
            <Outlet />
         </div>
      </NavProvider>
   );
}

export default App;
