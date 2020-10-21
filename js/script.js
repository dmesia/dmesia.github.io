function classSearch() {
  const classes = ["Support", "Fighter", "Mage", "Marksman", "Assassin", "Tank"] //Makes the dropdown search menu use the strings in this array.
  championClassSearch(classes)
}


classSearch() //Calls classSearch

function championClassSearch(classes) { //Creates the extra options needed to have a dropdown list according to what is passed into it.
  const select = document.querySelector('select') //The select is the dropdown menu
  return classes.forEach((championClass) => { //In this function is where I need to have the searched dropdown item compare to the champion tags.
    const option = document.createElement('option') //Populates the options actually might not be needed since the dropdown has been hardcoded
    option.value = `${championClass}`
    option.textContent = `${championClass}`
    select.append(option)
  })
}


const getChampions = async (optionValue) => { //Grabs the JSON including the champions
  removePic() //Removes the old set of pictures to refresh the page
  const url = 'https://ddragon.leagueoflegends.com/cdn/10.19.1/data/en_US/champion.json' //The JSON from Data Dragon for League of Legends champions
  try { //Try catch to run the JSON through axios and if it does, list will equal response.data.data
    const response = await axios.get(url) //Nothing happens until the JSON runs through axios
    let champions = Object.values(response.data.data) //Array for the dropdown options
    filterChampions(champions, optionValue) //calls the filter champions function and passes champions, optionValue through it
  } catch (error) {}
}


const champ = document.querySelector('.champContainer') //Global champion variable set to the champContainer in HTML just the box that the champion images and info will go into




function filterChampions(allChampions, optionValue) { //This is the filter function
  let filteredChampions = allChampions.filter(champion => //Sets the variable filteredChampions to allChampions.filter which is grabbing just the champion tags that were selected in optionValue
    champion.tags.includes(optionValue)
  )
  randomizeChampions(filteredChampions) //Runs the randomize champion on filteredChampions, first all of the champions of the correct class are grabbed and then they are randomized
}


function randomizeChampions(filteredChampions) { //use an if else statement for search? If support, run randomize champions etc? - filter takes care of this
  let randomizedChampions = [] //Empty array that the randomized champions are going to be pushed into
  for (let i = 0; i < 6; i++) { //for loop so that only six champions actually go into the array
    let num = Math.floor(Math.random() * filteredChampions.length) //This is the part where the filered champions are randomized
    randomizedChampions.push(filteredChampions[num]) //The randomized champions are then pushed into the array

  }
  renderChampions(randomizedChampions) //Runs renderChampions for each randomizedChampions
}


function renderChampions(randomizedChampions) { //This function will grab the champions with the appropriate tags when compared to class and display them on screen.
  randomizedChampions.map((champion) => { //randomizedChampions.map runs like this: it is like a for of loop that grabs the key and value of each champion

    const championImage = document.createElement('img') //the next block of code sets variables for each element I want to display on the page
    championImage.className = "champImage" //gives them classes I can use in css
    championImage.setAttribute('src', `./loading/${champion.name}_0.jpg`, 'alt', `./loading_cntd/${champion.name}_0.jpg`) //parent div and what I want going into it
    champ.appendChild(championImage) //does the actual appending

    const championName = document.createElement('h2') //Displays the champion names
    championName.className = "champName"
    championName.innerText = `${champion.name}`
    champ.appendChild(championName);

    const championTitle = document.createElement('h3') //Displays the champion titles
    championTitle.className = "champTitle"
    championTitle.innerText = `${champion.title}`
    champ.appendChild(championTitle);
  })
}

const form = document.querySelector('form') //The actual event listener for the form submission
form.addEventListener('submit', getValue)

function getValue(e) { //The search doesn't run until the user selects something and hits search
  e.preventDefault()
  const optionValue = document.querySelector('#select-class').value //Sets optionValue to whatever is picked in the search dropdown. optionValue is used very frequently in the code
  getChampions(optionValue)
}


function removePic() { //removes the old pictures on each new search so the page doesn't fill up
  const oldPic = document.querySelector('.champContainer') //Sets oldpic to the champContainer
  while (oldPic.lastChild) { //While there are images on the page they will be removed on the next search because removePic is called in getChampions
    oldPic.removeChild(oldPic.lastChild)
  }
}
