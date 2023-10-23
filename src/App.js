import { useState } from "react";
import NavBar from "./components/Nav/NavBar.jsx";
import Pokemon from "./components/Poke/Pokemon.jsx";
import PokemonList from "./components/Poke/PokemonList.jsx";
import Container from "./components/Reusability/Container.jsx";
import Logo from "./components/Reusability/Logo.jsx";
import PokemonDetails from "./components/Poke/PokemonDetails.jsx";
import PokemonFavorites from "./components/Poke/PokemonFavorites.jsx";
import Btn from "./components/Reusability/Btn.jsx";
import { useAllPokemons } from "./useAllPokemons.js";
import { useQueryPokemon } from "./useQueryPokemon.js";
import useLocalStorageState from "./useLocalStorageState.js";

//////////////////////////////////////
function App() {
  const [query, setQuery] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const [showDetails, setShowDetails] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const [moreDetails, setMoreDetails] = useState({});

  // Custom Hook
  const { allPokemons } = useAllPokemons();
  const { onePokemon, isLoading, error } = useQueryPokemon(query);
  const [addFavorite, setAddFavorite] = useLocalStorageState([], "poke");

  //////////////////////////////////////
  const isThereOnePokemon = onePokemon ? onePokemon : allPokemons;

  //////////////////////////////////////
  // Seleccionando pokemon - component list
  const handleSelection = function (poke) {
    setSelectedPokemon((Pokemon) => (Pokemon?.id === poke.id ? null : poke));
  };

  // Agregando y eliminando pokemon
  const handleAddFavorite = (poke) =>
    setAddFavorite((pokemons) => [...pokemons, poke]);

  const handleDeleteFavorite = (id) =>
    setAddFavorite((pokemons) => pokemons.filter((poke) => poke.id !== id));

  // Mostrando mas informacion del pokemon
  const handleMoreDetails = (poke) => setMoreDetails(poke);

  /////////////////
  // Mostrando y cerrando cada componente
  const handleShowDetails = () => {
    setShowDetails(true);
    setShowFavorites(false);
  };

  const handleShowFavorites = () => {
    setShowFavorites(true);
    setShowDetails(false);
  };

  const handleCloseView = () => {
    setShowDetails(false);
    setShowFavorites(false);
  };

  //////////////////////////////////////
  return (
    <div className="app">
      <NavBar>
        <Logo onCloseView={handleCloseView} />
        <Btn classBtn="btn" onClick={handleShowFavorites}>
          My Favorites 💖{addFavorite.length > 0 ? addFavorite.length : ""}
        </Btn>
      </NavBar>

      {/* H O M E  P A G E */}
      {!showDetails && !showFavorites && (
        <Container key={22}>
          <PokemonList
            data={isThereOnePokemon}
            selectedPokemon={selectedPokemon}
            onSelection={handleSelection}
            setQuery={setQuery}
            query={query}
            error={error}
            isLoading={isLoading}
          />

          {selectedPokemon && (
            <Pokemon
              btnTxt="🔮 More Details"
              data={selectedPokemon}
              addFavorite={addFavorite}
              onAddFavorite={handleAddFavorite}
              onDeleteFavorite={handleDeleteFavorite}
              onShowDetails={handleShowDetails}
              onMoreDetails={handleMoreDetails}
            />
          )}
        </Container>
      )}

      {/* P O K É M O N  D E T A I L S  P A G E  */}
      {!showFavorites && showDetails && (
        <Container key={33}>
          <Pokemon
            btnTxt="💖 Add to my favorites"
            data={moreDetails}
            addFavorite={addFavorite}
            onAddFavorite={handleAddFavorite}
            onDeleteFavorite={handleDeleteFavorite}
          />

          <PokemonDetails data={moreDetails} />
        </Container>
      )}

      {/* P O K É M O N  F A V O R I T E S  P A G E  */}
      {!showDetails && showFavorites && (
        <PokemonFavorites
          key={44}
          data={addFavorite}
          onDeleteFavorite={handleDeleteFavorite}
          onMoreDetails={handleMoreDetails}
          onShowDetails={handleShowDetails}
        />
      )}
    </div>
  );
}

export default App;
