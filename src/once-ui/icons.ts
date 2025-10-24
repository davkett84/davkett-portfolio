// src/once-ui/icons.ts
import { FaInstagram } from "react-icons/fa6";
import { iconLibrary as onceIcons } from "@once-ui-system/core";

// 👇 exporta una librería extendida
export const iconLibrary = {
  ...onceIcons,
  instagram: FaInstagram, // ahora el sistema reconocerá este icono
};
