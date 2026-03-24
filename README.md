# 🛒 Shopping List App

This is a React Native app built with Expo for managing a simple and efficient shopping list.

---

## Get started

1. Install dependencies

```bash
npm install
```

2. Start the app

```bash
npx expo start
```

In the output, you'll find options to open the app in:

- Android emulator
- iOS simulator
- Expo Go (https://expo.dev/go)

---

## About the app

This application allows users to manage a shopping list in a simple way:

- Add new products
- Mark items as completed
- Delete items
- View an empty state when no items are present

The app focuses on a clean UI and minimal interaction friction.

---

## Project structure

Main parts of the app:

- CampoParaAgregarProducto → input field to add items
- TarjetaParaItemDeCompra → UI for each item
- useListaDeCompras → custom hook handling all logic
- theme and strings → centralized styling and text

---

## Development

You can start developing by editing the main file:

App.js / App.tsx

The core logic is handled through a custom hook, making the UI components reusable and clean.

---

## Features

- Add items to the list
- Toggle item completion
- Remove items
- Themed UI using React Native Paper

---

## Limitations

- No persistent storage (data resets on reload)
- No item editing
- No cloud sync

---

## Learn more

- https://docs.expo.dev/
- https://reactnative.dev/

---

## Future improvements

- Local storage (AsyncStorage)
- Item editing
- Multiple lists
- Better UX feedback (animations, gestures)
