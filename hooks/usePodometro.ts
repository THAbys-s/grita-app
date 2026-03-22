import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";

export function usePodometro() {
  const [estaCaminando, setEstaCaminando] = useState(false);
  const [pasos, setPasos] = useState(0);

  useEffect(() => {
    let temporizador: ReturnType<typeof setTimeout>;

    const iniciar = async () => {
      const { granted } = await Pedometer.requestPermissionsAsync();
      if (!granted) return;

      const suscripcion = Pedometer.watchStepCount((resultado) => {
        setPasos(resultado.steps);
        setEstaCaminando(true);

        // Si no hay pasos en 2 segundos, EstaCaminando se vuelve falso.
        clearTimeout(temporizador);
        temporizador = setTimeout(() => {
          setEstaCaminando(false);
        }, 2000);
      });

      return () => {
        suscripcion.remove();
        setEstaCaminando(false);
        clearTimeout(temporizador);
      };
    };

    iniciar();
  }, []);

  return { estaCaminando, pasos };
}
