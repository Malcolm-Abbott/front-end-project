interface Data {
  view: 'home' | 'genres' | 'game';
  genres: string | null;
  game: string | null;
  platform: string | null;
}

let data: Data = {
  view: 'home',
  genres: null,
  game: null,
  platform: null,
};

window.addEventListener('beforeunload', (): void => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('game-repo-data', dataJSON);
});

window.addEventListener('pagehide', (): void => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('game-repo-data', dataJSON);
});

const previousDataJSON = localStorage.getItem('game-repo-data');

if (previousDataJSON) data = JSON.parse(previousDataJSON);
