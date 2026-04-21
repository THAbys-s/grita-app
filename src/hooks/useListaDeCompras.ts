import { useState } from "react";

export type Item = {
  id: string;
  name: string;
  done: boolean;
};

export default function useListaDeCompras() {
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState("");

  const AgregarItem = (nuevoTexto: string) => {
    const trimmed = nuevoTexto.trim();
    if (!trimmed) return;
    setItems((prev) => [
      ...prev,
      { id: String(Date.now()), name: trimmed, done: false },
    ]);
    setText("");
  };

  const AlternarItem = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it)),
    );
  };

  const EliminarItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return {
    items,
    text,
    setText,
    AgregarItem,
    AlternarItem,
    EliminarItem,
  };
}
