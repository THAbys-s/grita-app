import { Accelerometer } from "expo-sensors";
import { useEffect, useState } from "react";

export function useMovimiento() {
  const [estaCaminando, setEstaCaminando] = useState(false);

  useEffect(() => {
    let ultimaMagnitud = 0;
    let movimientoAcumulado = 0;
    let intervalo;
    let sub;

    Accelerometer.setUpdateInterval(200); // cada 200ms

    sub = Accelerometer.addListener(({ x, y, z }) => {
      const magnitud = Math.sqrt(x * x + y * y + z * z);
      const delta = Math.abs(magnitud - ultimaMagnitud);

      ultimaMagnitud = magnitud;

      // acumulamos cambios reales de movimiento
      if (delta > 0.2) {
        movimientoAcumulado += delta;
      }
    });

    intervalo = setInterval(() => {
      if (movimientoAcumulado > 1) {
        setEstaCaminando(true);
      } else {
        setEstaCaminando(false);
      }

      movimientoAcumulado = 0;
    }, 2000);

    return () => {
      sub?.remove();
      clearInterval(intervalo);
    };
  }, []);

  return { estaCaminando };
}
