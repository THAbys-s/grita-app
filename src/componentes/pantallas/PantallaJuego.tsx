import React from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import useAcelerometro from "../../hooks/useAcelerometro";
import { TEXTOS } from "../../constantes/textos";
import { CONSTANTES_EXPERIENCIA as CONST } from "../../constantes/experiencia";

const fondo = require("../../assets/background/background_echo_flower.jpg");

interface PantallaJuegoProps {
  onTerminar: () => void;
}

export default function PantallaJuego({ onTerminar }: PantallaJuegoProps) {
  const { pasos: pasosActuales } = useAcelerometro();

  const [dialogoVisible, setDialogoVisible] = React.useState(false);
  const [textoActual, setTextoActual] = React.useState("");
  const mostradoRef = React.useRef(new Set<number>());
  const pasosBaseRef = React.useRef(0);
  const [finalActivo, setFinalActivo] = React.useState(false);

  const fadeDialogo = React.useRef(new Animated.Value(0)).current;
  const fadePantalla = React.useRef(new Animated.Value(1)).current;
  const fadeImagen = React.useRef(new Animated.Value(0)).current;
  const overlayOscuro = React.useRef(new Animated.Value(0)).current;

  const pasosReales = pasosActuales - pasosBaseRef.current;

  React.useEffect(() => {
    pasosBaseRef.current = pasosActuales;
  }, []);

  React.useEffect(() => {
    if (dialogoVisible || finalActivo) return;

    TEXTOS.DIALOGOS.forEach((d, index) => {
      if (pasosReales >= d.paso && !mostradoRef.current.has(index)) {
        mostradoRef.current.add(index);

        setTextoActual(d.texto);
        setDialogoVisible(true);

        fadeDialogo.setValue(1);

        Animated.timing(overlayOscuro, {
          toValue: (index + 1) / TEXTOS.DIALOGOS.length,
          duration: CONST.DURACION_OVERLAY,
          useNativeDriver: true,
        }).start();

        setTimeout(() => {
          Animated.timing(fadeDialogo, {
            toValue: 0,
            duration: CONST.DURACION_FADE_DIALOGO,
            useNativeDriver: true,
          }).start(() => {
            setDialogoVisible(false);
          });
        }, CONST.DURACION_DIALOGO);
      }
    });
  }, [pasosReales, finalActivo]);

  React.useEffect(() => {
    if (finalActivo) return;

    if (pasosReales >= CONST.PASOS_DESVANECIMIENTO) {
      Animated.timing(fadePantalla, {
        toValue: 0,
        duration: CONST.DURACION_FADE_PANTALLA,
        useNativeDriver: true,
      }).start();
    }

    if (pasosReales >= CONST.PASOS_FINAL) {
      setFinalActivo(true);

      fadeImagen.setValue(0);

      Animated.timing(fadeImagen, {
        toValue: 1,
        duration: CONST.DURACION_FADE_IMAGEN,
        useNativeDriver: true,
      }).start();
    }
  }, [pasosReales, finalActivo]);

  if (finalActivo) {
    return (
      <Animated.View
        style={[styles.pantallaFinal, { opacity: fadeImagen }]}
      >
        <Text style={styles.tituloFinal}>{TEXTOS.PANTALLA_FINAL.TITULO}</Text>

        <Text style={styles.mensajeFinal}>
          {TEXTOS.PANTALLA_FINAL.MENSAJE}
        </Text>

        <Text style={styles.reflexionFinal}>
          {TEXTOS.PANTALLA_FINAL.REFLEXION}
        </Text>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.contenedor, { opacity: fadePantalla }]}>
      <Image
        source={fondo}
        style={styles.fondo}
        resizeMode="cover"
      />
      <Animated.View
        style={[styles.overlay, { opacity: overlayOscuro }]}
      />
      {dialogoVisible && (
        <Animated.View
          style={[styles.dialogo, { opacity: fadeDialogo }]}
        >
          <Text style={styles.asterisco}>{TEXTOS.GENERAL.ASTERISCO}</Text>

          <Text style={styles.textoDialogo}>{textoActual}</Text>
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  fondo: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: CONST.COLORES.NEGRO,
  },
  dialogo: {
    position: "absolute",
    top: 160,
    left: CONST.PADDING_HORIZONTAL_DIALOGO,
    right: CONST.PADDING_HORIZONTAL_DIALOGO,
    borderWidth: 6,
    borderColor: CONST.COLORES.BLANCO,
    backgroundColor: CONST.COLORES.NEGRO,
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  asterisco: {
    color: CONST.COLORES.BLANCO,
    fontSize: CONST.TAMAÑOS_FUENTE.DIALOGO_ASTERISCO,
    marginRight: 10,
    fontFamily: CONST.FUENTES.DETERMINATION,
  },
  textoDialogo: {
    color: CONST.COLORES.BLANCO,
    fontSize: CONST.TAMAÑOS_FUENTE.DIALOGO_TEXTO,
    fontFamily: CONST.FUENTES.DETERMINATION,
    flex: 1,
  },
  pantallaFinal: {
    flex: 1,
    backgroundColor: CONST.COLORES.NEGRO,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: CONST.PADDING_HORIZONTAL_DIALOGO,
  },
  tituloFinal: {
    fontFamily: CONST.FUENTES.DETERMINATION,
    fontSize: CONST.TAMAÑOS_FUENTE.TITULO_FINAL,
    color: CONST.COLORES.AMARILLO,
    textAlign: "center",
    marginBottom: 20,
  },
  mensajeFinal: {
    fontFamily: CONST.FUENTES.DETERMINATION,
    fontSize: CONST.TAMAÑOS_FUENTE.MENSAJE_FINAL,
    color: CONST.COLORES.BLANCO,
    textAlign: "center",
    marginBottom: 20,
  },
  reflexionFinal: {
    fontFamily: CONST.FUENTES.DETERMINATION,
    fontSize: CONST.TAMAÑOS_FUENTE.MENSAJE_FINAL,
    color: CONST.COLORES.AMARILLO,
    textAlign: "center",
  },
});
