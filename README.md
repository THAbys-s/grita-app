# Lista de Compras.

Esta es una aplicación hecha con React Native que cumple la función de ser una simple y eficiente lista de compras.

---

## Primeros Pasos.

1. Instala las dependencias necesarias.

```bash
npm install
npm install react-native-paper
```

2. Inicia por primera vez la app.

```bash
npx expo start
```

En la terminal veras distintas opciones para abrir la app en:

- Emulador de Android.
- Simulador de iOS.
- Expo Go (https://expo.dev/go)

---

## Acerca de la App.

La principal función de la aplicación resulta en ser una lista de compras eficiente y accesible.

- Agrega nuevos productos.
- Marca cada item como completo.
- Borra cada item.

Es así, como esta aplicación se centra en tener una UI limpia e interactiva.

---

## Estructura del Proyecto.

Partes importantes de la app:

- CampoParaAgregarProducto -> input para agregar items.
- TarjetaParaItemDeCompra -> Interfaz para cada item.
- useListaDeCompras -> Hook personalizado que contiene la lógica de cada item.
- theme y strings -> Constantes que almacenan estilos y strings reutilizables.

---

## Desarrollo.

Puedes editar la aplicación a través del archivo "index.tsx":

La lógica principal del proyecto esta separada en distintos hooks, con el principal próposito de optimizar el uso de componentes reutilizables.

---

## Dependencias.

- React Native Paper (Botones y elementos de UI reutilizables)

## Limitaciones Actuales.

- No mantiene una memoria de la lista. (Olvida todo al cerrar la App)
- No permite editar items ya creados.
