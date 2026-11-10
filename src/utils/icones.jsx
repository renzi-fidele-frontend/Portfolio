/* eslint-disable react-refresh/only-export-components -- tabela de consulta de icones, nao um modulo de componentes */
/**
 * Mapa entre a chave de ícone guardada no MongoDB (campo `icone` do Servico)
 * e o componente de react-icons que a renderiza.
 *
 * As chaves têm de coincidir com ICONES_SERVICO em server/src/models/campos.js.
 */
import { CgWebsite } from "react-icons/cg";
import { BsGlobe, BsLightbulb, BsPhone } from "react-icons/bs";
import { MdOutlineDesignServices } from "react-icons/md";
import { SiGoogleads } from "react-icons/si";
import { BiCopyAlt, BiVideo, BiCodeAlt, BiCart, BiRocket, BiLineChart } from "react-icons/bi";

export const ICONES = {
   site: { componente: CgWebsite, etiqueta: "Landing page" },
   globo: { componente: BsGlobe, etiqueta: "Web / globo" },
   design: { componente: MdOutlineDesignServices, etiqueta: "Design" },
   ads: { componente: SiGoogleads, etiqueta: "Anúncios" },
   copy: { componente: BiCopyAlt, etiqueta: "Copywriting" },
   video: { componente: BiVideo, etiqueta: "Vídeo" },
   codigo: { componente: BiCodeAlt, etiqueta: "Código" },
   carrinho: { componente: BiCart, etiqueta: "E-commerce" },
   foguete: { componente: BiRocket, etiqueta: "Foguete" },
   grafico: { componente: BiLineChart, etiqueta: "Gráfico" },
   telefone: { componente: BsPhone, etiqueta: "Telefone" },
   lampada: { componente: BsLightbulb, etiqueta: "Ideia" },
};

/** Devolve o elemento JSX do ícone, com o globo como alternativa segura. */
export function renderizarIcone(chave) {
   const Componente = ICONES[chave]?.componente ?? BsGlobe;
   return <Componente />;
}

/** Etiquetas legíveis das categorias de projeto, para os selects do painel. */
export const CATEGORIAS = {
   react: "React / NextJs",
   landingPage: "Landing Page",
   institucional: "Institucional",
};
