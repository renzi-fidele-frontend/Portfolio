import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthValue } from "../../Context/AuthContext";
import PreLoader from "../PreLoader/PreLoader";

/**
 * Deixa passar apenas quem tem sessão de admin válida. Enquanto o token
 * guardado está a ser validado mostra o PreLoader, para não piscar o login
 * a quem já está autenticado.
 */
const RotaProtegida = () => {
   const { estado } = AuthValue();
   const loc = useLocation();

   if (estado === "a-verificar") return <PreLoader />;
   if (estado !== "autenticado") return <Navigate to="/admin/login" state={{ de: loc.pathname }} replace />;

   return <Outlet />;
};

export default RotaProtegida;
