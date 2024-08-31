"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import './details.css';

interface PokemonDetails {
  name: string;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string; // High-resolution image URL
      }
    };
  };
  height: number;
  weight: number;
  base_experience: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

const statAbbreviations: { [key: string]: string } = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SATK',
  'special-defense': 'SDEF',
  speed: 'SPD',
};

export default function PokemonDetailPage() {
  const params = useParams<{ name: string }>(); // Get Pokémon name from URL
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemonDetails(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.name) {
      fetchPokemonDetails();
    }
  }, [params.name]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!pokemonDetails) {
    return <p>No Pokémon data available</p>;
  }

  const renderStatBar = (statName: string, baseStat: number) => {
    const maxStat = 255; 
    const percentage = (baseStat / maxStat) * 100;
    const shortStatName = statAbbreviations[statName] || statName; // Get abbreviated name

    return (
      <div className="stat-bar">
        <div className="stat-label">
          <span>{shortStatName}</span>
          <div className="separator" />
          <span className="stat-value">{baseStat}</span>
        </div>
        <div className="bar-container">
          <div
            className="stat-bar-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="pokemon-detail-container">
      <div className="content">
        <h1>{pokemonDetails.name.toUpperCase()}</h1>
        <img
          src={pokemonDetails.sprites.other['official-artwork'].front_default}
          alt={pokemonDetails.name}
          className="pokemon-image"
        />
        <div className="info-item">
          <img src="/height.svg" alt="Height Icon" />
          <p>{pokemonDetails.height} decimeters</p>
        </div>
        <div className="info-item">
          <img src="/weight.svg" alt="Weight Icon" />
          <p>{pokemonDetails.weight} hectograms</p>
        </div>
        <h2>Abilities</h2>
        <ul className="abilities-list">
          {pokemonDetails.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
        <h2>Base Stats</h2>
        <div className="stats-container">
          {pokemonDetails.stats.map((stat, index) => (
            <React.Fragment key={index}>
              {renderStatBar(stat.stat.name, stat.base_stat)}
            </React.Fragment>
          ))}
        </div>
      </div>
      <button onClick={() => router.back()} className="back-button">Go Back</button>
    </div>
  );
}
