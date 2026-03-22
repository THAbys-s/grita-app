import { useState } from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

type Item = {
  id: string;
  name: string;
  done: boolean;
};

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState("");

  const AgregarItem = () => {
    const trimmed = text.trim();
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

  const TarjetaParaRenderizarItem = ({ item }: { item: Item }) => (
    <Pressable
      onPress={() => AlternarItem(item.id)}
      onLongPress={() => EliminarItem(item.id)}
      style={styles.row}
    >
      <Text style={[styles.rowText, item.done && styles.done]}>
        {item.name}
      </Text>
      <Text
        style={[styles.pill, item.done ? styles.pillDone : styles.pillTodo]}
      >
        {item.done ? "✔" : "•"}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Lista de Compras</Text>
      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Agregar producto (ej: Leche)"
          style={styles.input}
          returnKeyType="done"
          onSubmitEditing={AgregarItem}
        />
        <Pressable style={styles.addBtn} onPress={AgregarItem}>
          <Text style={styles.addTxt}>Agregar</Text>
        </Pressable>
      </View>
      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={TarjetaParaRenderizarItem}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Sin productos. ¡Agregá el primero! 😊
          </Text>
        }
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 12 },
  inputRow: { flexDirection: "row", gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  addBtn: {
    backgroundColor: "#1e90ff",
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addTxt: { color: "#fff", fontWeight: "600" },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowText: { fontSize: 16 },
  done: { textDecorationLine: "line-through", color: "#999" },
  pill: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "700",
  },
  pillTodo: { backgroundColor: "#eee", color: "#666" },
  pillDone: { backgroundColor: "#2ecc71", color: "#fff" },
  sep: { height: 1, backgroundColor: "#eee" },
  empty: { textAlign: "center", color: "#777", marginTop: 24 },
});
