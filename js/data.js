'use strict';
/* exported data */
async function getGames() {
  try {
    const response = await fetch(
      'https://api.rawg.io/api/games?key=721b55f2e5094e67aea26d3b8bc35d43',
    );
    if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
    const data = await response.json();
    console.log('game data:', data.results);
  } catch (error) {
    console.error(error);
  }
}
getGames();
async function getGameGenres() {
  try {
    const response = await fetch(
      'https://api.rawg.io/api/genres?key=721b55f2e5094e67aea26d3b8bc35d43',
    );
    if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
    const data = await response.json();
    console.log('genre data:', data);
  } catch (error) {
    console.error(error);
  }
}
getGameGenres();
