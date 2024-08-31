"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import './pokemon.css';

interface PokemonList {
  count: number;
  next: string;
  previous?: any;
  results: Pokemon[];
}
interface Pokemon {
  name: string;
  url: string;
  imageUrl?: string;
}

export default function Page() {
  const [pokemonData, setPokemonData] = useState<PokemonList>({} as PokemonList);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadMorePokemon = async () => {
    setLoading(true);
    try {
      const result = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=28&offset=${offset}`);
      const data = await result.json();
      const pokemonList: PokemonList = data as PokemonList;
      
      const detailedResults = await Promise.all(
        pokemonList.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const pokemonDetail = await response.json();
          // Assume the SVG URL is available in sprites.other['official-artwork'].front_default
          return {
            name: pokemon.name,
            url: pokemon.url,
            imageUrl: pokemonDetail.sprites.other['official-artwork'].front_default, // SVG URL
          };
        })
      );

      // Append new Pokémon to the existing list
      setPokemonData((prevData) => ({
        ...pokemonList,
        results: [...(prevData.results || []), ...detailedResults],
      }));
      setOffset(offset + 28);  // Increase offset for next fetch
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    loadMorePokemon();
  }, []);

  const DisplayPokemonList = () => {
    if (pokemonData && pokemonData.results) {
      return (
        <ul className="pokemon-list">
          {pokemonData.results.map((p) => (
            <li key={p.name} className="list-item">
              <Link href={"/pokemon/" + p.name} className="list-item-link">
                <img src={p.imageUrl} alt={p.name} className="pokemon-image" />
                <span className="pokemon-name">{p.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      );
    } else {
      return <p>Loading...</p>;
    }
  };

  return (
    <div className="main">
      <header className="header-home">
        <div className="text">
          <h1>Pokemon</h1>
          <div className="logo">
            <img src="/pokeball.svg" alt="pokeball" />
          </div>
        </div>
      </header>
      <div className="container">
        <DisplayPokemonList />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <button onClick={loadMorePokemon} className="load-more-button">
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
