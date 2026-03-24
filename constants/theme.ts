import { MD3LightTheme } from "react-native-paper";

export const tema = {
  ...MD3LightTheme, // Hereda todo el tema claro por defecto de Paper usando spread operator.
  colors: {
    ...MD3LightTheme.colors, // Sobre-escribe el tema default con colores custom.
    primary: "#1e90ff",
    fondo: "#fff",
    borde: "#ddd",
    textoApagado: "#999",
    superficie: "#eee",
    textoSuperficie: "#666",
    exito: "#2ecc71",
    textoSutil: "#777",
  },
};
