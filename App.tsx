import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Button from "./src/components/Button";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DragableCard from "./src/components/DragableCard";
import AccessDetails from "./src/components/AccessDetails";
import { useEffect, useState } from "react";

export default function App() {
  const [pokemonName, setPokemonName] = useState("");

  async function getPokemonName() {
    const id = Math.floor(Math.random() * 100);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const pokemon = await response.json();
    const pokemonName = pokemon.name;

    setPokemonName(pokemonName);
  }

  const refetchPokemon = () => {
    getPokemonName();
  };

  useEffect(() => {
    getPokemonName();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <DragableCard onLeftBorder={refetchPokemon}>
        <AccessDetails name={pokemonName} />
      </DragableCard>
      <View style={styles.buttonContainer}>
        <Button title="Add to cart" onClick={refetchPokemon} />
      </View>

      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
  },
});
