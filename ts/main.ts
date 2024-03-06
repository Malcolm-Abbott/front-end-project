interface Values {
  background_image: string;
  name: string;
}

const $row = document.querySelector('.flex-main');
const $genresHeader = document.querySelector(
  '.genres-header',
) as HTMLHeadingElement;
const $flexGenres = document.querySelector('.flex-genres') as HTMLDivElement;

$row?.addEventListener('click', async (event: Event) => {
  const $eventTarget = event.target as HTMLImageElement;
  if (!$eventTarget) throw new Error('No event target!');
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
  genresResults.forEach((result: Values) => {
    $flexGenres.prepend(renderGame(result));
  });
});

const $home = document.querySelector('div[data-view="home"]') as HTMLDivElement;
const $genres = document.querySelector(
  'div[data-view="genres"]',
) as HTMLDivElement;

function viewSwap(view: 'home' | 'genres'): void {
  const $header = document.querySelector('.header') as HTMLHeadingElement;
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

$iconHome.addEventListener('click', () => {
  const $colSixGenres = document.querySelectorAll('.col-six-genres');
  $colSixGenres.forEach((element) => {
    element.remove();
  });
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
  }
});
