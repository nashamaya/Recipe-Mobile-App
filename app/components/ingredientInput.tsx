import React from "react";
import { TextInput, Button, StyleSheet, Text, View } from "react-native";

interface IngredientInputProps {
  // type of props for the IngredientInput component
  inputIngredient: string;
  setInputIngredient: (value: string) => void;
  addIngredient: () => void;
  ingredients: string[];
}

const IngredientInput: React.FC<IngredientInputProps> = ({
  // defines the IngredientInput component as a functional component that takes in the expected props
  inputIngredient,
  setInputIngredient,
  addIngredient,
  ingredients,
}) => {
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="add ingredients (eg. chicken, rice, etc.)"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        value={inputIngredient}
        onChangeText={setInputIngredient}
      />
      <View className="w-1/2 mx-auto">
        <Button
          title="add ingredient"
          onPress={addIngredient}
          color="#9f75ff"
        />
      </View>
      <Text style={styles.ingredientsList}>
        Ingredients:{ingredients.join(", ")}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    color: "white",
    fontWeight: "bold",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
  },
  ingredientsList: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: "bold",
  },
});

export default IngredientInput;
