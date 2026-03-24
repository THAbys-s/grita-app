import { View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { textos } from "../constants/strings";

type Props = {
  value: string;
  onChange: (text: string) => void; // Actualiza el texto mientras el usuario escribe.
  onSubmit: () => void;
};

export default function CampoParaAgregarProducto({
  value,
  onChange,
  onSubmit,
}: Props) {
  const tema = useTheme();

  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={textos.placeholder}
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        mode="outlined"
        style={{ flex: 1, backgroundColor: tema.colors.background }}
      />
      <Button mode="contained-tonal" onPress={onSubmit}>
        Agregar
      </Button>
    </View>
  );
}
