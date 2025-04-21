// elementos con los que interactuo
const characterGrid = document.getElementById('characterGrid');
const searchInput = document.getElementById('searchInput');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

let currentPage = 1;
let currentSearch = '';

async function fetchCharacters(page = 1, name = '') {
  const url = `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('No se encontraron personajes');
    const data = await response.json();
    renderCharacters(data.results);
    pageInfo.textContent = `Página ${page}`;
    prevPage.disabled = page === 1;
    nextPage.disabled = !data.info.next;
    
  } catch (error) {
    characterGrid.innerHTML = `<p style="color: white;">${error.message}</p>`;
    pageInfo.textContent = `Página ${page}`;
    prevPage.disabled = true;
    nextPage.disabled = true;
  }
}

function renderCharacters(characters) {
  characterGrid.innerHTML = characters.map(character => `
    <div class="character__card">
      <h3>${character.name}</h3>
      <p>${character.species}</p>
      <img src="${character.image}" alt="${character.name}" />
    </div>
  `).join('');
}

searchInput.addEventListener('input', (e) => {
  currentSearch = e.target.value;
  currentPage = 1;
  fetchCharacters(currentPage, currentSearch);
});

prevPage.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage, currentSearch);
  }
});

nextPage.addEventListener('click', () => {
  currentPage++;
  fetchCharacters(currentPage, currentSearch);
});

fetchCharacters();
