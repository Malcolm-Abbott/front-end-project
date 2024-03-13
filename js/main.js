'use strict';
const $row = document.querySelector('.flex-main');
const $genresHeader = document.querySelector('.genres-header');
const $flexGenres = document.querySelector('.flex-genres');
const $gameDescriptionContainer = document.querySelector(
  '.game-description-container',
);
if (!$genresHeader) throw new Error('The $genresHeader query failed');
if (!$flexGenres) throw new Error('The $flexGenres query failed');
if (!$gameDescriptionContainer)
  throw new Error('The $gameDescriptionContainer query failed');
$row?.addEventListener('click', async (event) => {
  const $eventTarget = event.target;
  if (!$eventTarget) throw new Error('No event target!');
  if ($eventTarget.className === 'genres-img') {
    viewSwap('genres');
    switch ($eventTarget.id) {
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
    getGenres($eventTarget.id);
    const genresResults = await getGenres($eventTarget.id);
    genresResults.forEach((result) => {
      $flexGenres.prepend(renderGame(result));
    });
  } else if ($eventTarget.className === 'game-img') {
    viewSwap('game');
    const gameResult = await getGame($eventTarget.id);
    $header.textContent = gameResult.name;
    data.game = $eventTarget.id;
    $gameDescriptionContainer.prepend(renderGamePage(gameResult));
    const $trailerImg = document.querySelector('.trailer');
    const trailer = await getTrailer(data.game);
    if (trailer) $trailerImg.setAttribute('src', trailer.trailerImg);
  }
});
$flexGenres?.addEventListener('click', async (event) => {
  const $eventTarget = event.target;
  if (!$eventTarget) throw new Error('No event target!');
  if ($eventTarget.matches('img')) {
    viewSwap('game');
    const gameResult = await getGame($eventTarget.id);
    $header.textContent = gameResult.name;
    data.game = $eventTarget.id;
    $gameDescriptionContainer.prepend(renderGamePage(gameResult));
    const $trailerImg = document.querySelector('.trailer');
    const trailer = await getTrailer(data.game);
    if (trailer) $trailerImg.setAttribute('src', trailer.trailerImg);
  }
});
const $home = document.querySelector('div[data-view="home"]');
const $genres = document.querySelector('div[data-view="genres"]');
const $game = document.querySelector('div[data-view="game"]');
const $header = document.querySelector('.header');
function viewSwap(view) {
  switch (view) {
    case 'home':
      $home.classList.remove('hidden');
      $genres.className = 'hidden';
      $game.className = 'hidden';
      data.view = 'home';
      $header.textContent = 'Home';
      data.genres = null;
      data.game = null;
      $filterBar.className = 'hidden';
      $filterIcon.style.display = 'none';
      break;
    case 'genres':
      $genres.classList.remove('hidden');
      $home.className = 'hidden';
      data.view = 'genres';
      $header.textContent = 'Genres';
      data.game = null;
      $filterBar.classList.remove('hidden');
      $filterIcon.style.display = 'inline-block';
      break;
    case 'game':
      $game.classList.remove('hidden');
      $home.className = 'hidden';
      $genres.className = 'hidden';
      data.view = 'game';
      data.genres = null;
      $filterBar.className = 'hidden';
      $filterIcon.style.display = 'none';
      break;
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
  $gameImg.id = game.slug;
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
  const $flexDetails = document.querySelector('.flex-details');
  switch (data.view) {
    case 'genres':
      $colSixGenres.forEach((element) => {
        element.remove();
      });
      break;
    case 'game':
      $flexDetails?.remove();
      break;
  }
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
  } else if (data.game !== null) {
    viewSwap('game');
    const gameResult = await searchGameByInput(data.game);
    $header.textContent = gameResult.name;
    $gameDescriptionContainer.prepend(renderGamePage(gameResult));
    const $trailerImg = document.querySelector('.trailer');
    const trailer = await getTrailer(data.game);
    if (trailer) $trailerImg.setAttribute('src', trailer.trailerImg);
  } else if (data.view === 'home') {
    $filterIcon.style.display = 'none';
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
    const $flexDetails = document.querySelector('.flex-details');
    if ($flexDetails) {
      $flexDetails.remove();
    }
    viewSwap('game');
    $searchBar.value = '';
    const gameResult = await searchGameByInput(searchValue);
    $header.textContent = gameResult.name;
    $gameDescriptionContainer.prepend(renderGamePage(gameResult));
    const $flexDetails2 = document.querySelector('.flex-details');
    data.game = $flexDetails2?.id;
    const $trailerImg = document.querySelector('.trailer');
    const trailer = await getTrailer(data.game);
    if (trailer) $trailerImg.setAttribute('src', trailer.trailerImg);
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
    const $flexDetails = document.querySelector('.flex-details');
    if ($flexDetails) {
      $flexDetails.remove();
    }
    viewSwap('game');
    $searchBar.value = '';
    const gameResult = await searchGameByInput(searchValue);
    $header.textContent = gameResult.name;
    $gameDescriptionContainer.prepend(renderGamePage(gameResult));
    const $flexDetails2 = document.querySelector('.flex-details');
    data.game = $flexDetails2?.id;
    const $trailerImg = document.querySelector('.trailer');
    const trailer = await getTrailer(data.game);
    if (trailer) $trailerImg.setAttribute('src', trailer.trailerImg);
  }
});
async function getGame(game) {
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
async function getTrailer(game) {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${game}/movies?key=721b55f2e5094e67aea26d3b8bc35d43`,
    );
    if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
    const result = await response.json();
    const trailers = result.results;
    if (trailers.length < 1) return;
    const trailerImg = trailers[0]?.preview;
    const trailerLinkSet = trailers[0]?.data;
    const trailerLink = trailerLinkSet[480];
    if (trailerLink === undefined || trailerImg === undefined)
      alert(`${game} trailer unavailable`);
    const trailer = {
      trailerImg,
      trailerLink,
    };
    return trailer;
  } catch (error) {
    console.error(error);
  }
}
function renderGamePage(game) {
  const $row = document.createElement('div');
  $row.className = 'row flex-details';
  $row.id = game.slug;
  const $colOneThird = document.createElement('div');
  $colOneThird.className = 'col-one-third';
  $row.append($colOneThird);
  const $img = document.createElement('img');
  $img.setAttribute('src', game.background_image);
  $colOneThird.append($img);
  const $colTwoThirds = document.createElement('div');
  $colTwoThirds.className = 'col-two-thirds';
  $row.append($colTwoThirds);
  const $descriptionHeading = document.createElement('h1');
  $descriptionHeading.className = 'description-heading';
  $descriptionHeading.textContent = 'Description';
  $colTwoThirds.append($descriptionHeading);
  const $descriptionParagraph = document.createElement('p');
  $descriptionParagraph.className = 'description-paragraph';
  $descriptionParagraph.textContent = game.description_raw;
  $colTwoThirds.append($descriptionParagraph);
  const $flexOfficial = document.createElement('div');
  $flexOfficial.className = 'col-one-third flex-official';
  $row.append($flexOfficial);
  const $colFull = document.createElement('div');
  $colFull.className = 'col-full';
  $flexOfficial.append($colFull);
  const $officialSiteHeading = document.createElement('h2');
  $officialSiteHeading.className = 'official-site-heading';
  $officialSiteHeading.textContent = 'Visit Official Website';
  $colFull.append($officialSiteHeading);
  const $officialSiteLinkAnchor = document.createElement('a');
  $officialSiteLinkAnchor.className = 'official-site-link-anchor';
  $officialSiteLinkAnchor.textContent = game.website;
  $officialSiteLinkAnchor.setAttribute('href', game.website);
  $officialSiteLinkAnchor.setAttribute('target', '_blank');
  $colFull.append($officialSiteLinkAnchor);
  const $trailerDiv = document.createElement('div');
  $trailerDiv.className = 'col-two-thirds trailer-div';
  $row.append($trailerDiv);
  const $trailerHeading = document.createElement('h2');
  $trailerHeading.className = 'trailer-heading';
  $trailerHeading.textContent = 'Watch Trailer';
  $trailerDiv.append($trailerHeading);
  const $trailerWrapper = document.createElement('div');
  $trailerWrapper.className = 'trailer-wrapper';
  $trailerDiv.append($trailerWrapper);
  const $trailerImg = document.createElement('img');
  $trailerImg.className = 'trailer';
  $trailerImg.setAttribute('src', './images/placeholder-image.png');
  $trailerWrapper.append($trailerImg);
  const $playIcon = document.createElement('i');
  $playIcon.className = 'fa-solid fa-play fa-2xl';
  $trailerWrapper.append($playIcon);
  return $row;
}
$gameDescriptionContainer?.addEventListener('click', async (event) => {
  const $eventTarget = event.target;
  if ($eventTarget.matches('.fa-play')) {
    const $trailerImg = document.querySelector('.trailer');
    if (!data.game) throw new Error('Game description unavailable');
    const trailer = await getTrailer(data.game);
    if (!trailer) return alert(`trailer unavailable`);
    const $trailer = document.createElement('video');
    $trailer.setAttribute('autoplay', 'true');
    const $source = document.createElement('source');
    $source.setAttribute('src', trailer.trailerLink);
    $source.setAttribute('type', 'video/mp4');
    $trailer.append($source);
    $trailerImg?.replaceWith($trailer);
    const $playIcon = document.querySelector('.fa-play');
    $trailer.addEventListener('loadeddata', () => {
      $playIcon.style.display = 'none';
    });
    $trailer.addEventListener('ended', () => {
      $playIcon.style.display = 'inline-block';
      $trailer?.replaceWith($trailerImg);
    });
  }
});
async function getGenresByPlatform(platform) {
  try {
    let parentPlatform;
    switch (platform.toLowerCase()) {
      case 'pc':
        parentPlatform = 1;
        break;
      case 'playstation':
        parentPlatform = 2;
        break;
      case 'xbox':
        parentPlatform = 3;
        break;
      default:
        alert('Invalid platform. Acceptable platforms: PC, PlayStation, Xbox');
    }
    const genre = data.genres;
    const response = await fetch(
      `https://api.rawg.io/api/games?key=721b55f2e5094e67aea26d3b8bc35d43&genres=${genre}&parent_platforms=${parentPlatform}`,
    );
    if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
    const result = await response.json();
    const arrayOfGenres = result.results;
    return arrayOfGenres;
  } catch (error) {
    console.error(error);
  }
}
const $filterBar = document.querySelector('#filter-bar');
const $filterIcon = document.querySelector('.fa-filter');
$filterBar?.addEventListener('keydown', async (event) => {
  try {
    if (event.key === 'Enter') {
      const genresByPlatformResults = await getGenresByPlatform(
        $filterBar.value,
      );
      const $colSixGenres = document.querySelectorAll('.col-six-genres');
      $colSixGenres.forEach((element) => {
        element.remove();
      });
      genresByPlatformResults.forEach((result) => {
        $flexGenres.prepend(renderGame(result));
      });
      $filterBar.value = '';
    }
  } catch (error) {
    console.error(error);
  }
});
$filterIcon?.addEventListener('click', async () => {
  try {
    const filterBarValue = $filterBar.value;
    if (filterBarValue.length > 0) {
      const genresByPlatformResults = await getGenresByPlatform(filterBarValue);
      const $colSixGenres = document.querySelectorAll('.col-six-genres');
      $colSixGenres.forEach((element) => {
        element.remove();
      });
      genresByPlatformResults.forEach((result) => {
        $flexGenres.prepend(renderGame(result));
      });
      $filterBar.value = '';
    }
  } catch (error) {
    console.error(error);
  }
});
