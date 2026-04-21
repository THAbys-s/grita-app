import CampoParaAgregarProducto from "@/components/CampoParaAgregarProducto";
import TarjetaParaItemDeCompra from "@/components/ui/TarjetaParaItemDeCompra";
import { textos } from "@/constants/strings";
import { tema } from "@/constants/theme";
import useListaDeCompras from "@/hooks/useListaDeCompras";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function App() {
  const [text, setText] = useState("");
  const { items, AgregarItem, AlternarItem, EliminarItem } =
    useListaDeCompras();

  const handleSubmit = () => {
    AgregarItem(text); // Envia el texto directo al hook
    setText(""); // Limpia el input a apretar el boton de "Agregar".
  };

  return (
    <PaperProvider theme={tema}>
      <View
        style={{
          flex: 1,
          padding: 16,
          backgroundColor: tema.colors.background,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
          {textos.titulo}
        </Text>
        <CampoParaAgregarProducto
          value={text}
          onChange={setText}
          onSubmit={handleSubmit}
        />
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TarjetaParaItemDeCompra
              item={item}
              onToggle={AlternarItem}
              onEliminar={EliminarItem}
            />
          )}
          ListEmptyComponent={
            <Text
              style={{
                textAlign: "center",
                marginTop: 20,
                color: tema.colors.textoSutil,
              }}
            >
              {textos.listaVacia}
            </Text>
          }
        />
      </View>
    </PaperProvider>
  );
}
