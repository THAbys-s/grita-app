import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface PantallaFinalProps {
  onReiniciar: () => void;
}

export default function PantallaFinal({ onReiniciar }: PantallaFinalProps) {
  // Este componente es simplemente un placeholder
  // La lógica de pantalla final está en PantallaJuego
  return <View style={styles.contenedor} />;
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
});
