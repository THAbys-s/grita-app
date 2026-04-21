import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import PantallaIntro from "../pantallas/PantallaIntro";
import PantallaJuego from "../pantallas/PantallaJuego";
import { CONSTANTES_EXPERIENCIA as CONST } from "../../constantes/experiencia";

type Pantalla = "intro" | "juego";

export default function ControladorDeExperiencia() {
  const [pantallaActual, setPantallaActual] = useState<Pantalla>("intro");

  const [fontsLoaded] = useFonts({
    Determination: require("../../assets/fonts/DeterminationSansWebRegular-369X.ttf"),
  });

  const cambiarPantalla = (nuevaPantalla: Pantalla) => {
    setPantallaActual(nuevaPantalla);
  };

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: CONST.COLORES.NEGRO,
        }}
      >
        <ActivityIndicator size="large" color={CONST.COLORES.AMARILLO} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {pantallaActual === "intro" && (
        <PantallaIntro onContinuar={() => cambiarPantalla("juego")} />
      )}
      {pantallaActual === "juego" && (
        <PantallaJuego onTerminar={() => cambiarPantalla("intro")} />
      )}
    </View>
  );
}
