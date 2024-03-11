interface Values {
  background_image: string;
  name: string;
  description_raw: string;
  website: string;
  slug: string;
}

const $row = document.querySelector('.flex-main') as HTMLDivElement;
const $genresHeader = document.querySelector(
  '.genres-header',
) as HTMLHeadingElement;
const $flexGenres = document.querySelector('.flex-genres') as HTMLDivElement;
const $gameDescriptionContainer = document.querySelector(
  '.game-description-container',
) as HTMLDivElement;

if (!$genresHeader) throw new Error('The $genresHeader query failed');
if (!$flexGenres) throw new Error('The $flexGenres query failed');
if (!$gameDescriptionContainer)
  throw new Error('The $gameDescriptionContainer query failed');

$row?.addEventListener('click', async (event: Event) => {
  const $eventTarget = event.target as HTMLImageElement;
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
    genresResults.forEach((result: Values) => {
      $flexGenres.prepend(renderGame(result));
    });
  } else if ($eventTarget.className === 'game-img') {
    viewSwap('game');
    const gameResult = await getGame($eventTarget.id);
    data.game = $eventTarget.id;
    $gameDescriptionContainer.prepend(renderGamePage(gameResult));
  }
});

const $home = document.querySelector('div[data-view="home"]') as HTMLDivElement;
const $genres = document.querySelector(
  'div[data-view="genres"]',
) as HTMLDivElement;
const $game = document.querySelector('div[data-view="game"]') as HTMLDivElement;

function viewSwap(view: 'home' | 'genres' | 'game'): void {
  const $header = document.querySelector('.header') as HTMLHeadingElement;
  switch (view) {
    case 'home':
      $home.classList.remove('hidden');
      $genres.className = 'hidden';
      $game.className = 'hidden';
      data.view = 'home';
      $header.textContent = 'Home';
      data.genres = null;
      data.game = null;
      break;
    case 'genres':
      $genres.classList.remove('hidden');
      $home.className = 'hidden';
      data.view = 'genres';
      $header.textContent = 'Genres';
      data.game = null;
      break;
    case 'game':
      $game.classList.remove('hidden');
      $home.className = 'hidden';
      $genres.className = 'hidden';
      data.view = 'game';
      data.genres = null;
      break;
  }
}

async function getGenres(genres: string): Promise<any> {
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

function renderGame(game: Values): HTMLDivElement {
  const $colSix = document.createElement('div') as HTMLDivElement;
  $colSix.className = 'col-six col-six-genres';

  const $gameImgWrapper = document.createElement('div') as HTMLDivElement;
  $gameImgWrapper.className = 'game-img-wrapper';
  $colSix.append($gameImgWrapper);

  const $gameImg = document.createElement('img') as HTMLImageElement;
  $gameImg.setAttribute('src', game.background_image);
  $gameImgWrapper.append($gameImg);

  const $gameImgText = document.createElement('div') as HTMLDivElement;
  $gameImgText.className = 'game-img-text';
  $colSix.append($gameImgText);

  const $p = document.createElement('p') as HTMLParagraphElement;
  $p.textContent = game.name;
  $gameImgText.append($p);

  return $colSix;
}

const $iconHome = document.querySelector('.fa-house') as HTMLElement;

$iconHome.addEventListener('click', (): void => {
  const $colSixGenres = document.querySelectorAll('.col-six-genres');
  const $flexDetails = document.querySelector(
    '.flex-details',
  ) as HTMLDivElement;
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

document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
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
    genresResults.forEach((result: Values) => {
      $flexGenres.prepend(renderGame(result));
    });
  } else if (data.game !== null) {
    viewSwap('game');
    const gameResult = await searchGameByInput(data.game);
    $gameDescriptionContainer.prepend(renderGamePage(gameResult));
  }
});

const $searchBar = document.querySelector('#search-bar') as HTMLInputElement;

$searchBar.addEventListener('keydown', async (event: any): Promise<void> => {
  if (event.key === 'Enter') {
    const string1: string = $searchBar.value.toLowerCase();
    const array1: string[] = string1.split(' ');
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
    $gameDescriptionContainer.prepend(renderGamePage(gameResult));
    const $flexDetails2 = document.querySelector(
      '.flex-details',
    ) as HTMLDivElement;
    data.game = $flexDetails2?.id;
  }
});

const $searchIcon = document.querySelector(
  '.fa-magnifying-glass',
) as HTMLElement;

$searchIcon?.addEventListener('click', async (): Promise<void> => {
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
    $gameDescriptionContainer.prepend(renderGamePage(gameResult));
    const $flexDetails2 = document.querySelector(
      '.flex-details',
    ) as HTMLDivElement;
    data.game = $flexDetails2?.id;
  }
});

async function getGame(game: string): Promise<any> {
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

async function searchGameByInput(game: string): Promise<any> {
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

function renderGamePage(game: Values): HTMLDivElement {
  const $row = document.createElement('div') as HTMLDivElement;
  $row.className = 'row flex-details';
  $row.id = game.slug;

  const $colOneThird = document.createElement('div') as HTMLDivElement;
  $colOneThird.className = 'col-one-third';
  $row.append($colOneThird);

  const $img = document.createElement('img') as HTMLImageElement;
  $img.setAttribute('src', game.background_image);
  $colOneThird.append($img);

  const $colTwoThirds = document.createElement('div') as HTMLDivElement;
  $colTwoThirds.className = 'col-two-thirds';
  $row.append($colTwoThirds);

  const $descriptionHeading = document.createElement(
    'h1',
  ) as HTMLHeadingElement;
  $descriptionHeading.className = 'description-heading';
  $descriptionHeading.textContent = 'Description';
  $colTwoThirds.append($descriptionHeading);

  const $descriptionParagraph = document.createElement(
    'p',
  ) as HTMLParagraphElement;
  $descriptionParagraph.className = 'description-paragraph';
  $descriptionParagraph.textContent = game.description_raw;
  $colTwoThirds.append($descriptionParagraph);

  const $flexOfficial = document.createElement('div') as HTMLDivElement;
  $flexOfficial.className = 'col-one-third flex-official';
  $row.append($flexOfficial);

  const $colFull = document.createElement('div') as HTMLDivElement;
  $colFull.className = 'col-full';
  $flexOfficial.append($colFull);

  const $officialSiteHeading = document.createElement(
    'h2',
  ) as HTMLHeadingElement;
  $officialSiteHeading.className = 'official-site-heading';
  $officialSiteHeading.textContent = 'Visit Official Website';
  $colFull.append($officialSiteHeading);

  const $officialSiteLinkAnchor = document.createElement(
    'a',
  ) as HTMLAnchorElement;
  $officialSiteLinkAnchor.className = 'official-site-link-anchor';
  $officialSiteLinkAnchor.textContent = game.website;
  $officialSiteLinkAnchor.setAttribute('href', game.website);
  $officialSiteLinkAnchor.setAttribute('target', '_blank');
  $colFull.append($officialSiteLinkAnchor);

  return $row;
}
