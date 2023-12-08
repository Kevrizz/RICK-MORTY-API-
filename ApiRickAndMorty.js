import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ApiRickAndMorty.css';


const ApiRickAndMorty = () => {
  const [characterData, setCharacterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=1`);
      setCharacterData(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Rick and Morty Characters</h2>
          <ul>
            {characterData.map((character) => (
              <li key={character.id}>
                <h3>{character.name}</h3>
                <p>Status: {character.status}</p>
                <p>Species: {character.species}</p>
                <img src={character.image} alt={character.name} />
              </li>
            ))}
          </ul>
          <div>
            <button onClick={handlePrevPage} disabled={page === 1}>
              Anterior
            </button>
            <button onClick={handleNextPage}>Siguiente</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiRickAndMorty;
