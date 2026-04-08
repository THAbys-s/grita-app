import { useFonts } from "expo-font";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, Text, View } from "react-native";
import useAcelerometro from "../hooks/useAcelerometro";

const fondo = require("../assets/background/background_echo_flower.jpg");
const DtHeart = require("../assets/images/Undertale-heart.png");

export default function App() {
  const { pasos } = useAcelerometro();

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [opcion, setOpcion] = useState<"si" | "no" | null>(null);

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
  const overlayOscuro = useRef(new Animated.Value(0)).current;

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

        Animated.timing(overlayOscuro, {
          toValue: (index + 1) / dialogos.length,
          duration: 1000,
          useNativeDriver: true,
        }).start();

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
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
            top: -30,
          }}
        >
          <View style={{ maxWidth: 600 }}>
            <Text
              style={{
                color: "yellow",
                fontSize: 50,
                fontFamily: "Determination",
                textAlign: "center",
                marginBottom: 15,
              }}
            >
              *Antes de darle a continuar*
            </Text>

            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontFamily: "Determination",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              Asegúrate de estar en un lugar seguro para caminar.
              {"\n\n"}
              Para leer el poema, debes caminar y acumular pasos (llevando el
              celular en la mano)
            </Text>

            <Text
              style={{
                color: "yellow",
                fontSize: 30,
                fontFamily: "Determination",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              Tus pasos contarán si tu celular esta mirando enfrente como al
              sacar una foto.
              {"\n\n"}
              De esta manera, la aplicación no fallará.
            </Text>

            <Text
              style={{
                color: "gray",
                fontSize: 15,
                fontFamily: "Determination",
                textAlign: "center",
              }}
            >
              Así mismo, créditos a Toby Fox por crear Undertale, el juego del
              cual se extrajo el poema.
            </Text>
          </View>

          <Pressable
            onPress={() => setMostrarConfirmacion(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 3,
              borderColor: "white",
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: "black",
              marginTop: 30,
            }}
          >
            <Text
              style={{
                fontFamily: "Determination",
                fontSize: 24,
                color: "white",
              }}
            >
              Continuar
            </Text>
          </Pressable>

          {mostrarConfirmacion && (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.8)",
              }}
            >
              <View
                style={{
                  borderWidth: 4,
                  borderColor: "white",
                  backgroundColor: "black",
                  padding: 20,
                  width: "80%",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Determination",
                    fontSize: 22,
                    color: "white",
                    textAlign: "center",
                    marginBottom: 20,
                  }}
                >
                  * ¿Estás seguro de continuar?
                  {"\n\n"}
                  Es recomendable leer todo antes de empezar.
                </Text>

                <View style={{ gap: 15 }}>
                  <Pressable
                    delayLongPress={500}
                    onLongPress={() => setOpcion("si")}
                    onPress={() => {
                      pasosBaseRef.current = pasos;
                      setIniciado(true);
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 3,
                      borderColor: "white",
                      padding: 10,
                    }}
                  >
                    {opcion === "si" && (
                      <Image
                        source={DtHeart}
                        style={{ width: 25, height: 25, marginRight: 10 }}
                      />
                    )}
                    <Text
                      style={{
                        fontFamily: "Determination",
                        fontSize: 22,
                        color: opcion === "si" ? "yellow" : "white",
                      }}
                    >
                      Sí
                    </Text>
                  </Pressable>

                  <Pressable
                    delayLongPress={500}
                    onLongPress={() => setOpcion("no")}
                    onPress={() => {
                      setMostrarConfirmacion(false);
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 3,
                      borderColor: "white",
                      padding: 10,
                    }}
                  >
                    {opcion === "no" && (
                      <Image
                        source={DtHeart}
                        style={{ width: 25, height: 25, marginRight: 10 }}
                      />
                    )}
                    <Text
                      style={{
                        fontFamily: "Determination",
                        fontSize: 22,
                        color: opcion === "no" ? "yellow" : "white",
                      }}
                    >
                      No
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }

  if (finalActivo) {
    return (
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeImagen,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "Determination",
            fontSize: 32,
            color: "yellow",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          * Gracias por recorrer esta obra.
        </Text>

        <Text
          style={{
            fontFamily: "Determination",
            fontSize: 22,
            color: "white",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Para volver a verla, debes regresar
          {"\n"}
          al lugar donde comenzaste.
        </Text>

        <Text
          style={{
            fontFamily: "Determination",
            fontSize: 22,
            color: "yellow",
            textAlign: "center",
          }}
        >
          Respira hondo...
          {"\n"}y retrocede.
        </Text>
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
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          opacity: overlayOscuro,
        }}
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
