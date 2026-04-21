import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { TEXTOS } from "../../constantes/textos";
import { CONSTANTES_EXPERIENCIA as CONST } from "../../constantes/experiencia";

const DtHeart = require("../../assets/images/Undertale-heart.png");

interface PantallaIntroProps {
  onContinuar: () => void;
}

export default function PantallaIntro({ onContinuar }: PantallaIntroProps) {
  const [mostrarConfirmacion, setMostrarConfirmacion] = React.useState(false);
  const [opcion, setOpcion] = React.useState<"si" | "no" | null>(null);

  return (
    <View style={styles.contenedor}>
      <View style={styles.contenedorInterno}>
        <View style={{ maxWidth: 600 }}>
          <Text style={styles.titulo}>{TEXTOS.PANTALLA_INTRO.TITULO}</Text>

          <Text style={styles.instruccion}>
            {TEXTOS.PANTALLA_INTRO.INSTRUCCION_1}
          </Text>

          <Text style={styles.instruccionDestacada}>
            {TEXTOS.PANTALLA_INTRO.INSTRUCCION_2}
          </Text>

          <Text style={styles.creditos}>{TEXTOS.PANTALLA_INTRO.CREDITOS}</Text>
        </View>

        <TouchableOpacity
          onPress={() => setMostrarConfirmacion(true)}
          style={styles.boton}
        >
          <Text style={styles.textoBoton}>
            {TEXTOS.PANTALLA_INTRO.BOTON_CONTINUAR}
          </Text>
        </TouchableOpacity>

        {mostrarConfirmacion && (
          <View style={styles.overlay}>
            <View style={styles.dialogo}>
              <Text style={styles.confirmacionTitulo}>
                {TEXTOS.CONFIRMACION.PREGUNTA}
              </Text>

              <View style={{ gap: 15 }}>
                <TouchableOpacity
                  delayLongPress={CONST.DELAY_LONG_PRESS}
                  onLongPress={() => setOpcion("si")}
                  onPress={onContinuar}
                  style={styles.opcionBoton}
                >
                  {opcion === "si" && (
                    <Image
                      source={DtHeart}
                      style={{ width: 25, height: 25, marginRight: 10 }}
                    />
                  )}
                  <Text
                    style={[
                      styles.textoOpcion,
                      { color: opcion === "si" ? CONST.COLORES.AMARILLO : CONST.COLORES.BLANCO },
                    ]}
                  >
                    {TEXTOS.CONFIRMACION.OPCION_SI}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  delayLongPress={CONST.DELAY_LONG_PRESS}
                  onLongPress={() => setOpcion("no")}
                  onPress={() => setMostrarConfirmacion(false)}
                  style={styles.opcionBoton}
                >
                  {opcion === "no" && (
                    <Image
                      source={DtHeart}
                      style={{ width: 25, height: 25, marginRight: 10 }}
                    />
                  )}
                  <Text
                    style={[
                      styles.textoOpcion,
                      { color: opcion === "no" ? CONST.COLORES.AMARILLO : CONST.COLORES.BLANCO },
                    ]}
                  >
                    {TEXTOS.CONFIRMACION.OPCION_NO}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: CONST.COLORES.NEGRO,
    alignItems: "center",
    justifyContent: "center",
  },
  contenedorInterno: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: CONST.PADDING_DEFECTO,
    top: -30,
  },
  titulo: {
    color: CONST.COLORES.AMARILLO,
    fontSize: CONST.TAMAÑOS_FUENTE.TITULO_INTRO,
    fontFamily: CONST.FUENTES.DETERMINATION,
    textAlign: "center",
    marginBottom: 15,
  },
  instruccion: {
    color: CONST.COLORES.BLANCO,
    fontSize: CONST.TAMAÑOS_FUENTE.INSTRUCCION,
    fontFamily: CONST.FUENTES.DETERMINATION,
    textAlign: "center",
    marginBottom: 20,
  },
  instruccionDestacada: {
    color: CONST.COLORES.AMARILLO,
    fontSize: CONST.TAMAÑOS_FUENTE.INSTRUCCION_DESTACADA,
    fontFamily: CONST.FUENTES.DETERMINATION,
    textAlign: "center",
    marginBottom: 20,
  },
  creditos: {
    color: CONST.COLORES.GRIS,
    fontSize: CONST.TAMAÑOS_FUENTE.CREDITOS,
    fontFamily: CONST.FUENTES.DETERMINATION,
    textAlign: "center",
  },
  boton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 3,
    borderColor: CONST.COLORES.BLANCO,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: CONST.COLORES.NEGRO,
    marginTop: 30,
  },
  textoBoton: {
    fontFamily: CONST.FUENTES.DETERMINATION,
    fontSize: CONST.TAMAÑOS_FUENTE.BOTON,
    color: CONST.COLORES.BLANCO,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CONST.COLORES.TRANSPARENTE_OSCURO,
  },
  dialogo: {
    borderWidth: 4,
    borderColor: CONST.COLORES.BLANCO,
    backgroundColor: CONST.COLORES.NEGRO,
    padding: 20,
    width: "80%",
  },
  confirmacionTitulo: {
    fontFamily: CONST.FUENTES.DETERMINATION,
    fontSize: CONST.TAMAÑOS_FUENTE.CONFIRMACION_TITULO,
    color: CONST.COLORES.BLANCO,
    textAlign: "center",
    marginBottom: 20,
  },
  opcionBoton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 3,
    borderColor: CONST.COLORES.BLANCO,
    padding: 10,
  },
  textoOpcion: {
    fontFamily: CONST.FUENTES.DETERMINATION,
    fontSize: CONST.TAMAÑOS_FUENTE.CONFIRMACION_OPCION,
  },
});
