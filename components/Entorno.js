import { Dimensions, Image, Text, View } from "react-native";
import useMovimiento from "../hooks/useAcelerometro";
import useAnimacion from "../hooks/useAnimacion";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const TOTAL_PASOS = 300;

export default function Entorno() {
  const { estaCaminando, pasos } = useMovimiento();
  const sprite = useAnimacion(estaCaminando);

  const progreso = Math.min(pasos / TOTAL_PASOS, 1);

  const startY = 500;
  const endY = 100;

  const posY = startY - progreso * (startY - endY);

  const llegoAlFinal = progreso >= 1;

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* PERSONAJE */}
      <Image
        source={sprite}
        style={{
          position: "absolute",
          top: posY,
          left: SCREEN_WIDTH * 0.4,
          width: 100,
          height: 100,
        }}
        resizeMode="contain"
      />

      {/* DEBUG */}
      <Text style={{ color: "white", position: "absolute", top: 50 }}>
        {estaCaminando ? "Caminando" : "Quieto"} - {pasos}
      </Text>

      {/* FINAL */}
      {llegoAlFinal && (
        <Text style={{ color: "yellow", position: "absolute", top: 80 }}>
          Llegaste al final
        </Text>
      )}
    </View>
  );
}
