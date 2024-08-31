// app/pokemon/[name]/page.tsx
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import './details.css';

interface PokemonDetails {
  name: string;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
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
  const params = useParams<{ name: string }>();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (params.name) {
      const fetchPokemonDetails = async () => {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
          const data = await response.json();
          setPokemonDetails(data);
        } catch (error) {
          console.error("Error fetching Pokémon details:", error);
        }
      };

      fetchPokemonDetails();
    }
  }, [params.name]);

  if (!pokemonDetails) {
    return <p>Loading...</p>;
  }

  const renderStatBar = (statName: string, baseStat: number) => {
    const maxStat = 255;
    const percentage = (baseStat / maxStat) * 100;
    const shortStatName = statAbbreviations[statName] || statName;

    return (
      <div className="stat-bar">
        <div className="stat-label">
          <span>{shortStatName}</span>
          <div className="separator" />
          <span className="stat-value">{baseStat}</span>
        </div>
        <div className="bar-container">
          <div className="stat-bar-fill" style={{ width: `${percentage}%` }} />
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
        <ul>
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

export async function generateStaticParams() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100'); // Fetch a list of Pokémon
  const data = await res.json();
  const paths = data.results.map((pokemon: any) => ({
    params: { name: pokemon.name },
  }));

  return {
    paths,
    fallback: 'blocking', // or 'true' or 'false' depending on your needs
  };
}
