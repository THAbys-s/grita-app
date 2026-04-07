import { useFonts } from "expo-font";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity } from "react-native";
import useAcelerometro from "../hooks/useAcelerometro";

const fondo = require("../assets/background/background_echo_flower.jpg");
const imagenFinal = require("../assets/endgame/sans_end.png");

export default function App() {
  const { pasos } = useAcelerometro();

  const pasosBaseRef = useRef(0);

  const [iniciado, setIniciado] = useState(false);
  const [finalActivo, setFinalActivo] = useState(false);

  const pasosReales = iniciado ? pasos - pasosBaseRef.current : 0;

  const [fontsLoaded] = useFonts({
    Determination: require("../assets/fonts/DeterminationSansWebRegular-369X.ttf"),
  });

  const dialogos = [
    { paso: 5, texto: "Sin embargo...\nexiste una profecía." },
    { paso: 15, texto: "El Ángel...\naquel que ha visto la superficie..." },
    { paso: 20, texto: "Regresará.\nY el subsuelo quedará vacío." },
  ];

  const [dialogoVisible, setDialogoVisible] = useState(false);
  const [textoActual, setTextoActual] = useState("");
  const mostradoRef = useRef(new Set());

  const fadeDialogo = useRef(new Animated.Value(0)).current;
  const fadePantalla = useRef(new Animated.Value(1)).current;
  const fadeImagen = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!iniciado) return;
    if (dialogoVisible) return;
    if (finalActivo) return;

    dialogos.forEach((d, index) => {
      if (pasosReales >= d.paso && !mostradoRef.current.has(index)) {
        mostradoRef.current.add(index);

        setTextoActual(d.texto);
        setDialogoVisible(true);

        fadeDialogo.setValue(1);

        setTimeout(() => {
          Animated.timing(fadeDialogo, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }).start(() => {
            setDialogoVisible(false);
          });
        }, 5000);
      }
    });
  }, [pasosReales, iniciado, finalActivo]);

  useEffect(() => {
    if (!iniciado) return;
    if (finalActivo) return;

    if (pasosReales >= 100) {
      Animated.timing(fadePantalla, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }

    if (pasosReales >= 25) {
      setFinalActivo(true);

      fadeImagen.setValue(0);

      Animated.timing(fadeImagen, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }
  }, [pasosReales, iniciado, finalActivo]);

  if (!fontsLoaded) return null;

  if (!iniciado) {
    return (
      <TouchableOpacity
        onPress={() => {
          pasosBaseRef.current = pasos;
          setIniciado(true);
        }}
        style={{
          flex: 1,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 28,
            fontFamily: "Determination",
          }}
        >
          * Antes de darle a continuar * Esta es una obra interactiva basada en
          Grita, siguiendo la tématica del juego Undertale. Como en la obra
          original, debes esforzarte para obtener la poesía. Al tocar "Comenzar"
          el celular empezará a contar tus pasos, debes CAMINAR.
        </Text>
      </TouchableOpacity>
    );
  }

  if (finalActivo) {
    return (
      <Animated.View style={{ flex: 1, opacity: fadeImagen }}>
        <Image
          source={imagenFinal}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </Animated.View>
    );
  }

  return (
    <Animated.View style={{ flex: 1, opacity: fadePantalla }}>
      <Image
        source={fondo}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />

      {dialogoVisible && (
        <Animated.View
          style={{
            position: "absolute",
            top: 160,
            left: 20,
            right: 20,
            borderWidth: 6,
            borderColor: "white",
            backgroundColor: "black",
            padding: 10,
            flexDirection: "row",
            alignItems: "flex-start",
            opacity: fadeDialogo,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 26,
              marginRight: 10,
              fontFamily: "Determination",
            }}
          >
            *
          </Text>

          <Text
            style={{
              color: "white",
              fontSize: 22,
              fontFamily: "Determination",
              flex: 1,
            }}
          >
            {textoActual}
          </Text>
        </Animated.View>
      )}
    </Animated.View>
  );
}
