import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Button,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router"; // Import the router hook
import IngredientInput from "./components/ingredientInput";
import axios from "axios";

export default function Index() {
  interface Recipe {
    id: number;
    title: string;
    image: string;
    missedIngredientsCount: number;
    missedIngredients: {
      name: string;
    }[];
    usedIngredients: {
      name: string;
    }[];
  }

  const [recipes, setRecipes] = useState<Recipe[]>([]); // State to store fetched recipes
  const [ingredients, setIngredients] = useState<string[]>([]); // State to store user-providedingredients
  const [inputIngredient, setInputIngredient] = useState<string>(""); // State to store the input ingredient

  const router = useRouter(); // Initialize the router

  // Function to add ingredients to the list
  const addIngredient = () => {
    if (inputIngredient.trim()) {
      setIngredients([...ingredients, inputIngredient.trim()]);
      setInputIngredient("");  // clear the input field after adding
    }
  };

  // Function to fetch recipes based on user-provided ingredients from the API using the Spoonacular API
  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients`,
        {
          params: {
            ingredients: ingredients.join(","), // combine ingredients using commas to separate them
            apiKey: process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY,
          },
        }
      );

      setRecipes(response.data); // update or store the state with the fetched recipes
      console.log("Fetched Recipes:", response.data);

      // Clear the ingredients and input field
      setIngredients([]); // clear ingredients array
      setInputIngredient(""); // reset input field

      // Navigate to recipe-list page and pass the recipes as a query parameter
      router.push({
        pathname: "/recipe-list",
        params: { recipes: JSON.stringify(response.data) },
      });
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/recipe.png")} // Background image for the page
      className="flex-1 justify-center items-center p-4" // full-screen background, centered content
    >
      <SafeAreaView className="bg-orange-500/65 p-4 rounded-lg absolute">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View>
            <Text className="text-black text-3xl font-bold text-center mb-6">
              What have you got in the fridge?
            </Text>

            <IngredientInput
              inputIngredient={inputIngredient}   // pass the input ingredient to the component
              setInputIngredient={setInputIngredient} // set the input ingredient
              addIngredient={addIngredient} // add the input ingredient to the list
              ingredients={ingredients} // pass the list of ingredients to the component
            />

            <View className="mt-6 w-1/2 mx-auto">
              <Button
                title="Get Recipes"
                onPress={fetchRecipes} // fetch the recipes when the button is pressed
                color="#9f75ff"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
