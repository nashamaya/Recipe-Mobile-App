import React from "react";
import { FlatList, Text } from "react-native";
import RecipeItem from "./recipeItem";

interface RecipeListProps {   // Define the type of props to the RecipeList component
  recipes: any[];     // recipes is an array of any type
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {  // Define the RecipeList component as a functional component that takes in recipes as props
  return recipes.length > 0 ? (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <RecipeItem
          title={item.title}
          image={item.image}
          usedIngredients={item.usedIngredients}
          missedIngredients={item.missedIngredients}
        />
      )}
    />
  ) : (
    <Text>No recipes to display. Add ingredients to find recipes.</Text>
  );
};

export default RecipeList;
