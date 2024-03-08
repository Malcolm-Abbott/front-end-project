interface Data {
  view: 'home' | 'genres' | 'game';
  genres: string | null;
}

let data: Data = {
  view: 'home',
  genres: null,
};

window.addEventListener('beforeunload', (): void => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('game-repo-data', dataJSON);
});

const previousDataJSON = localStorage.getItem('game-repo-data');

if (previousDataJSON) data = JSON.parse(previousDataJSON);
