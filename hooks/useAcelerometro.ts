import { Accelerometer } from "expo-sensors";
import { useEffect, useRef, useState } from "react";

export default function useMovimiento() {
  const [estaCaminando, setEstaCaminando] = useState(false);
  const [pasos, setPasos] = useState(0);

  const ultimoMovimiento = useRef(0);

  useEffect(() => {
    Accelerometer.setUpdateInterval(200);

    const sub = Accelerometer.addListener((data) => {
      const { x, y, z } = data;

      // magnitud del movimiento
      const magnitud = Math.sqrt(x * x + y * y + z * z);

      // Rango de Detección
      if (magnitud > 1.5) {
        setPasos((prev) => prev + 1);
        setEstaCaminando(true);
        ultimoMovimiento.current = Date.now();
      }
    });

    const intervalo = setInterval(() => {
      if (Date.now() - ultimoMovimiento.current > 800) {
        setEstaCaminando(false);
      }
    }, 300);

    return () => {
      sub.remove();
      clearInterval(intervalo);
    };
  }, []);

  return { estaCaminando, pasos };
}
