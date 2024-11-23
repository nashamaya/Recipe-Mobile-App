import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";

interface RecipeItemProps {
  title: string;
  image: string;
  usedIngredients: { name: string }[];
  missedIngredients: { name: string }[];
}

const RecipeItem: React.FC<RecipeItemProps> = ({    // describes the expected props for the RecipeItem component
  title,
  image,
  usedIngredients,
  missedIngredients,
}) => {
  return (
    <View style={styles.recipeTextContainer}>
      <Text style={styles.recipeTitle}>{title}</Text>

      <View style={styles.recipeContainer}>
        <Image source={{ uri: image }} style={styles.recipeImage} />

        <Text style={styles.usedIngredientsHeader}>Used Ingredients:</Text>
        <View style={styles.ingredientsRow}>
          {usedIngredients.length > 0 &&
            usedIngredients.map((ingredient, index) => (
              <Text key={index} style={styles.ingredientItem}>
                - {ingredient.name}
              </Text>
            ))}
        </View>

        <Text style={styles.missedIngredientsHeader}>Missing Ingredients:</Text>
        <View style={styles.ingredientsRow}>
          {missedIngredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredientItem}>
              - {ingredient.name}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recipeContainer: {
    flexDirection: "column",
    padding: 10,
    width: "100%",
  },
  recipeImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  recipeTitle: {
    fontSize: 16,
  },
  recipeTextContainer: {
    flexDirection: "column",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  missedIngredientsHeader: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: "600",
  },
  ingredientItem: {
    fontSize: 14,
    marginRight: 5,
    marginBottom: 5,
    maxWidth: "50%",
  },
  usedIngredientsHeader: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: "600",
  },
  ingredientsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
});

export default RecipeItem;
