import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface DialogoUndertaleProps {
  texto: string;
  visible: boolean;
}

export default function DialogoUndertale({
  texto,
  visible,
}: DialogoUndertaleProps) {
  const [textoVisible, setTextoVisible] = useState("");
  const velocidadEscritura = 50;

  useEffect(() => {
    if (!visible) {
      setTextoVisible("");
      return;
    }

    let indice = 0;
    const intervalo = setInterval(() => {
      if (indice <= texto.length) {
        setTextoVisible(texto.substring(0, indice));
        indice++;
      } else {
        clearInterval(intervalo);
      }
    }, velocidadEscritura);

    return () => clearInterval(intervalo);
  }, [texto, visible]);

  if (!visible) return null;

  return (
    <View style={styles.contenedor}>
      <View style={styles.dialogo}>
        <Text style={styles.texto}>{textoVisible}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  dialogo: {
    backgroundColor: "#000",
    borderWidth: 3,
    borderColor: "#FFF",
    padding: 15,
    borderRadius: 5,
  },
  texto: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Courier New",
  },
});
