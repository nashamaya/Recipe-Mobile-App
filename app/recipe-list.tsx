import { SafeAreaView, ScrollView, Text, Image, View } from "react-native";
import { useLocalSearchParams } from "expo-router"; // Hook to retrieve query parameters
import { useEffect, useState } from "react";

interface Recipe {    // Define the structure of a recipe
  id: number;
  title: string;
  image: string;
  missedIngredients: {
    name: string;
  }[];
  usedIngredients: {
    name: string;
  }[];
}

export default function RecipeListPage() {
  const { recipes } = useLocalSearchParams(); // Retrieve recipes from query params
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);

  useEffect(() => {
    if (recipes) {
      setRecipeList(JSON.parse(recipes as string)); // converts the query parameter (JSON string) into an array of recipes and stores it in the state
    }
  }, [recipes]); // runs when the recipes query parameter changes

  return (
    <SafeAreaView className="flex-1 bg-red-500 p-4">
      <ScrollView>
        <Text className="text-white text-3xl font-semibold text-center mt-4 mb-6">
          Recipe List
        </Text>
        {recipeList.length > 0 ? (       // if there are recipes, map through the list and display them
          recipeList.map((recipe) => (
            <View
              key={recipe.id}
              className="p-4 mb-4 bg-white rounded-lg shadow-md"     // card-style container with padding, margin, rounded corners, and shadow
            >
              <Image
                source={{ uri: recipe.image }}       // display the recipe image
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />
              <Text className="text-black text-xl font-semibold mt-4">
                {recipe.title}
              </Text>
              <Text className="text-gray-700 mt-2">
                <Text className="font-semibold">Used Ingredients:</Text>
                {recipe.usedIngredients
                  .map((ingredient) => ingredient.name)
                  .join("-")}
              </Text>
              <Text className="text-gray-700 mt-2">
                <Text className="font-semibold">Missing Ingredients:</Text>
                {recipe.missedIngredients
                  .map((ingredient) => ingredient.name)
                  .join("-")}
              </Text>
            </View>
          ))
        ) : (
          <Text className="text-white text-center mt-4">
            No recipes to display.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
