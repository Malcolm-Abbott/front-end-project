'use strict';
const $row = document.querySelector('.flex-main');
const $genresHeader = document.querySelector('.genres-header');
const $flexGenres = document.querySelector('.flex-genres');
$row?.addEventListener('click', async (event) => {
  const $eventTarget = event.target;
  if (!$eventTarget) throw new Error('No event target!');
  if ($eventTarget.matches('img')) {
    viewSwap('genres');
    switch ($eventTarget.className) {
      case 'shooter':
        $genresHeader.textContent = 'Shooters';
        data.genres = 'shooter';
        break;
      case 'racing':
        $genresHeader.textContent = 'Racing';
        data.genres = 'racing';
        break;
      case 'sports':
        $genresHeader.textContent = 'Sports';
        data.genres = 'sports';
        break;
      case 'role-playing-games-rpg':
        $genresHeader.textContent = 'RPG';
        data.genres = 'role-playing-games-rpg';
        break;
      case 'strategy':
        $genresHeader.textContent = 'Strategy';
        data.genres = 'strategy';
        break;
      case 'simulation':
        $genresHeader.textContent = 'Simulation';
        data.genres = 'simulation';
        break;
    }
    getGenres($eventTarget.className);
    const genresResults = await getGenres($eventTarget.className);
    genresResults.forEach((result) => {
      $flexGenres.prepend(renderGame(result));
    });
  }
});
const $home = document.querySelector('div[data-view="home"]');
const $genres = document.querySelector('div[data-view="genres"]');
function viewSwap(view) {
  const $header = document.querySelector('.header');
  if (view === $home.dataset.view) {
    $home.classList.remove('hidden');
    $genres.classList.add('hidden');
    data.view = 'home';
    $header.textContent = 'Home';
    data.genres = null;
  } else {
    $genres.classList.remove('hidden');
    $home.classList.add('hidden');
    data.view = 'genres';
    $header.textContent = 'Genres';
  }
}
async function getGenres(genres) {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=721b55f2e5094e67aea26d3b8bc35d43&genres=${genres}`,
    );
    if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
    const data = await response.json();
    const arrayOfGenres = data.results;
    return arrayOfGenres;
  } catch (error) {
    console.error(error);
  }
}
function renderGame(game) {
  const $colSix = document.createElement('div');
  $colSix.className = 'col-six col-six-genres';
  const $gameImgWrapper = document.createElement('div');
  $gameImgWrapper.className = 'game-img-wrapper';
  $colSix.append($gameImgWrapper);
  const $gameImg = document.createElement('img');
  $gameImg.setAttribute('src', game.background_image);
  $gameImgWrapper.append($gameImg);
  const $gameImgText = document.createElement('div');
  $gameImgText.className = 'game-img-text';
  $colSix.append($gameImgText);
  const $p = document.createElement('p');
  $p.textContent = game.name;
  $gameImgText.append($p);
  return $colSix;
}
const $iconHome = document.querySelector('.fa-house');
$iconHome.addEventListener('click', () => {
  const $colSixGenres = document.querySelectorAll('.col-six-genres');
  $colSixGenres.forEach((element) => {
    element.remove();
  });
  $searchBar.value = '';
  viewSwap('home');
});
document.addEventListener('DOMContentLoaded', async () => {
  if (data.genres !== null) {
    viewSwap('genres');
    switch (data.genres) {
      case 'shooter':
        $genresHeader.textContent = 'Shooters';
        break;
      case 'racing':
        $genresHeader.textContent = 'Racing';
        break;
      case 'sports':
        $genresHeader.textContent = 'Sports';
        break;
      case 'role-playing-games-rpg':
        $genresHeader.textContent = 'RPG';
        break;
      case 'strategy':
        $genresHeader.textContent = 'Strategy';
        break;
      case 'simulation':
        $genresHeader.textContent = 'Simulation';
        break;
    }
    const genresResults = await getGenres(data.genres);
    genresResults.forEach((result) => {
      $flexGenres.prepend(renderGame(result));
    });
  }
});
const $searchBar = document.querySelector('#search-bar');
$searchBar.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    const string1 = $searchBar.value.toLowerCase();
    const array1 = string1.split(' ');
    let searchValue = '';
    let i = 0;
    array1.forEach((element) => {
      if (i < array1.length - 1) {
        searchValue += element + '-';
      } else {
        searchValue += element;
      }
      i++;
    });
    viewSwap('genres');
    const gameResult = await searchGameByInput(searchValue);
    $flexGenres.prepend(renderGame(gameResult));
  }
});
const $searchIcon = document.querySelector('.fa-magnifying-glass');
$searchIcon?.addEventListener('click', async () => {
  if ($searchBar.value.length > 0) {
    const string1 = $searchBar.value.toLowerCase();
    const array1 = string1.split(' ');
    let searchValue = '';
    let i = 0;
    array1.forEach((element) => {
      if (i < array1.length - 1) {
        searchValue += element + '-';
      } else {
        searchValue += element;
      }
      i++;
    });
    viewSwap('genres');
    const gameResult = await searchGameByInput(searchValue);
    $flexGenres.prepend(renderGame(gameResult));
  }
});
async function searchGame(game) {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${game}?key=721b55f2e5094e67aea26d3b8bc35d43`,
    );
    if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
async function searchGameByInput(game) {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${game}?key=721b55f2e5094e67aea26d3b8bc35d43`,
    );
    if (!response.ok) {
      alert('Game not found.');
      data.view = 'home';
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
