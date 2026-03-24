import { Pressable, Text } from "react-native";
import { Checkbox, useTheme } from "react-native-paper";
import { Item } from "../../hooks/useListaDeCompras";

type Props = {
  item: Item;
  onToggle: (id: string) => void;
  onEliminar: (id: string) => void;
};

export default function TarjetaParaItemDeCompra({
  item,
  onToggle,
  onEliminar,
}: Props) {
  const tema = useTheme() as any; //Permite acceder a los colores custom.

  return (
    <Pressable
      onPress={() => onToggle(item.id)}
      onLongPress={() => onEliminar(item.id)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 8,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          textDecorationLine: item.done ? "line-through" : "none",
          color: item.done
            ? tema.colors.textoApagado
            : tema.colors.onBackground,
        }}
      >
        {item.name}
      </Text>
      <Checkbox
        status={item.done ? "checked" : "unchecked"}
        onPress={() => onToggle(item.id)}
        color={tema.colors.primary}
      />
    </Pressable>
  );
}
