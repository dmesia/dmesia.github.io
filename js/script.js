function classSearch() {
  const classes = ["Support", "Fighter", "Mage", "Marksman", "Assassin", "Tank"]
  championClassSearch(classes)
}

classSearch()

function championClassSearch(classes) {
  const select = document.querySelector('select')
  return classes.forEach((championClass) => {
    const option = document.createElement('option')
    option.value = `${championClass}`
    option.textContent = `${championClass}`
    select.append(option)
  })
}

const getChampions = async (optionValue) => {
  removePic()
  const url = 'https://ddragon.leagueoflegends.com/cdn/10.19.1/data/en_US/champion.json'
  try {
    const response = await axios.get(url)
    let champions = Object.values(response.data.data)
    filterChampions(champions, optionValue)
  } catch (error) {}
}

const champ = document.querySelector('.champContainer')

function filterChampions(allChampions, optionValue) {
  let filteredChampions = allChampions.filter(champion =>
    champion.tags.includes(optionValue)
  )
  randomizeChampions(filteredChampions)
}

function randomizeChampions(filteredChampions) {
  let randomizedChampions = []
  for (let i = 0; i < 6; i++) {
    let num = Math.floor(Math.random() * filteredChampions.length)
    randomizedChampions.push(filteredChampions[num])

  }
  renderChampions(randomizedChampions)
}

function renderChampions(randomizedChampions) {
  randomizedChampions.map((champion) => {

    const championImage = document.createElement('img')
    championImage.className = "champImage"
    championImage.setAttribute('src', `./loading/${champion.name}_0.jpg`, 'alt', `./loading_cntd/${champion.name}_0.jpg`)
    champ.appendChild(championImage)

    const championName = document.createElement('h2')
    championName.className = "champName"
    championName.innerText = `${champion.name}`
    champ.appendChild(championName);

    const championTitle = document.createElement('h3')
    championTitle.className = "champTitle"
    championTitle.innerText = `${champion.title}`
    champ.appendChild(championTitle);
  })
}

const form = document.querySelector('form')
form.addEventListener('submit', getValue)

function getValue(e) {
  e.preventDefault()
  const optionValue = document.querySelector('#select-class').value
  getChampions(optionValue)
}

function removePic() {
  const oldPic = document.querySelector('.champContainer')
  while (oldPic.lastChild) {
    oldPic.removeChild(oldPic.lastChild)
  }
}