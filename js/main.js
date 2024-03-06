'use strict';
const $row = document.querySelector('.flex-main');
$row?.addEventListener('click', async (event) => {
  const $eventTarget = event.target;
  if (!$eventTarget) throw new Error('No event target!');
  viewSwap('genres');
  const $genresHeader = document.querySelector('.genres-header');
  switch ($eventTarget.className) {
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
  getGenres($eventTarget.className);
  const genresResults = await getGenres($eventTarget.className);
  const $flexGenres = document.querySelector('.flex-genres');
  genresResults.forEach((result) => {
    $flexGenres.prepend(renderGame(result));
  });
});
const $home = document.querySelector('div[data-view="home"]');
const $genres = document.querySelector('div[data-view="genres"]');
function viewSwap(view) {
  if (view === $home.dataset.view) {
    $home.classList.remove('hidden');
    $genres.classList.add('hidden');
    data.view = 'home';
  } else {
    $genres.classList.remove('hidden');
    $home.classList.add('hidden');
    data.view = 'genres';
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
  $colSix.className = 'col-six';
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
