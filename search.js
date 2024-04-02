const resultTemplate = document.querySelector("[card-search-result]");
const waitText = document.querySelector("[wait-text]");
const resultsContainer = document.getElementById("results-container");

const searchBar = document.querySelector("[searchbar]");
const searchButton = document.querySelector("[search-button]");

const sortRarityButton = document.getElementById("sort-rarity");
const sortClassButton = document.getElementById("sort-class");
const sortSetButton = document.getElementById("sort-set");
const sortFactionButton = document.getElementById("sort-faction");
const sortTypeButton = document.getElementById("sort-type");
const sortRaceButton = document.getElementById("sort-race");
const noSortButton = document.getElementById("sort-none");

const hideDetail = document.getElementById("hide-btn");
const overlay = document.getElementById("overlay");
const title = overlay.querySelector("[detail-name]");
const set = overlay.querySelector("[detail-set]");
const rare = overlay.querySelector("[detail-rare]");
const type = overlay.querySelector("[detail-type]");
const faction = overlay.querySelector("[detail-faction]");
const race = overlay.querySelector("[detail-race]");
const elite = overlay.querySelector("[detail-elite]");
const collectible = overlay.querySelector("[detail-collectible]");
const detailImage = overlay.querySelector("[detail-image]");

var currentSortButton = noSortButton;

var cardData = new Array();

function SearchCards(inputValue) {
  resultsContainer.innerHTML = "";

  const url = `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/${inputValue}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "24b7a63a44msh1a8549990a23d2ep1dcfa8jsnb53a67af2aa7",
      "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
    },
  };

  waitText.innerHTML = "Searching the database for you...";

  fetch(url, options)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      cardData = data.slice(0, 50);
      displayData(cardData);
    })
    .catch((error) => {
      waitText.innerHTML = "No cards to be found. Try Searching again.";
      console.log("ERROR");
    });
}

function openDetail(cardID) {
  title.textContent = "Please Wait";
  set.textContent = "";
  rare.textContent = "";
  type.textContent = "";
  faction.textContent = "";
  race.textContent = "";
  elite.textContent = "";
  collectible.textContent = "";
  detailImage.src = "";

  const url = `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${cardID}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "24b7a63a44msh1a8549990a23d2ep1dcfa8jsnb53a67af2aa7",
      "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      title.textContent = data[0].name;
      set.textContent = data[0].cardSet;
      rare.textContent = data[0].rarity;
      type.textContent = data[0].type;
      faction.textContent = data[0].faction;
      race.textContent = data[0].race;
      elite.textContent = `Is Elite: ${data[0].elite}`;
      collectible.textContent = `Is Collectible: ${data[0].collectible}`;

      if (data[0].img != undefined) {
        detailImage.src = data[0].img;
      }
    })
    .catch((error) => console.log("ERROR"));

  overlay.classList.replace("overlay-slide-left", "overlay-slide-right");
}

function closeDetail() {
  overlay.classList.replace("overlay-slide-right", "overlay-slide-left");
}

function displayData(data) {
  waitText.innerHTML = "";

  data.forEach((element) => {
    const result = resultTemplate.content.cloneNode(true).children[0];
    const resultText = result.querySelector("[result-text]");

    resultText.textContent = element.name;

    if (currentSortButton === sortRarityButton) {
      resultText.textContent += " - " + element.rarity;
    } else if (currentSortButton === sortClassButton) {
      resultText.textContent += " - " + element.playerClass;
    } else if (currentSortButton === sortSetButton) {
      resultText.textContent += " - " + element.cardSet;
    } else if (currentSortButton === sortFactionButton) {
      resultText.textContent += " - " + element.faction;
    } else if (currentSortButton === sortTypeButton) {
      resultText.textContent += " - " + element.type;
    } else if (currentSortButton === sortRaceButton) {
      resultText.textContent += " - " + element.race;
    }

    result.addEventListener("click", function () {
      openDetail(element.cardId);
    });

    resultsContainer.append(result);
  });
}

function displayByRarity() {
  if (currentSortButton === sortRarityButton) {
    return;
  }

  currentSortButton.classList.remove("active");
  currentSortButton = sortRarityButton;
  sortRarityButton.classList.add("active");

  const url = "https://omgvamp-hearthstone-v1.p.rapidapi.com/info";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "24b7a63a44msh1a8549990a23d2ep1dcfa8jsnb53a67af2aa7",
      "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      rarityList = new Array();

      for (let i = 0; i < data.qualities.length; i++) {
        list = new Array();

        cardData.forEach((element) => {
          if (element.rarity === data.qualities[i]) {
            list.push(element);
          }
        });

        rarityList.push(list);
      }

      result = new Array();

      rarityList.forEach((element) => {
        element.forEach((card) => {
          result.push(card);
        });
      });

      ClearResults();
      displayData(result);
    })
    .catch((error) => console.log("ERROR"));
}

function displayByClass() {
  if (currentSortButton === sortClassButton) {
    return;
  }

  currentSortButton.classList.remove("active");
  currentSortButton = sortClassButton;
  sortClassButton.classList.add("active");

  const url = "https://omgvamp-hearthstone-v1.p.rapidapi.com/info";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "24b7a63a44msh1a8549990a23d2ep1dcfa8jsnb53a67af2aa7",
      "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      classList = new Array();

      for (let i = 0; i < data.classes.length; i++) {
        list = new Array();

        cardData.forEach((element) => {
          if (element.playerClass === data.classes[i]) {
            list.push(element);
          }
        });

        classList.push(list);
      }

      result = new Array();

      classList.forEach((element) => {
        element.forEach((card) => {
          result.push(card);
        });
      });

      ClearResults();
      displayData(result);
    })
    .catch((error) => console.log("ERROR"));
}

function displayBySet() {
  if (currentSortButton === sortSetButton) {
    return;
  }

  currentSortButton.classList.remove("active");
  currentSortButton = sortSetButton;
  sortSetButton.classList.add("active");

  const url = "https://omgvamp-hearthstone-v1.p.rapidapi.com/info";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "24b7a63a44msh1a8549990a23d2ep1dcfa8jsnb53a67af2aa7",
      "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setList = new Array();

      for (let i = 0; i < data.sets.length; i++) {
        list = new Array();

        cardData.forEach((element) => {
          if (element.cardSet === data.sets[i]) {
            list.push(element);
          }
        });

        setList.push(list);
      }

      result = new Array();

      setList.forEach((element) => {
        element.forEach((card) => {
          result.push(card);
        });
      });

      ClearResults();
      displayData(result);
    })
    .catch((error) => console.log("ERROR"));
}

function displayByFaction() {
  if (currentSortButton === sortFactionButton) {
    return;
  }

  currentSortButton.classList.remove("active");
  currentSortButton = sortFactionButton;
  sortFactionButton.classList.add("active");

  const url = "https://omgvamp-hearthstone-v1.p.rapidapi.com/info";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "24b7a63a44msh1a8549990a23d2ep1dcfa8jsnb53a67af2aa7",
      "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      factionList = new Array();

      for (let i = 0; i < data.factions.length; i++) {
        list = new Array();

        cardData.forEach((element) => {
          if (element.faction === data.factions[i]) {
            list.push(element);
          }
        });

        factionList.push(list);
      }

      result = new Array();

      factionList.forEach((element) => {
        element.forEach((card) => {
          result.push(card);
        });
      });

      ClearResults();
      displayData(result);
    })
    .catch((error) => console.log("ERROR"));
}

function displayByType() {
  if (currentSortButton === sortTypeButton) {
    return;
  }

  currentSortButton.classList.remove("active");
  currentSortButton = sortTypeButton;
  sortTypeButton.classList.add("active");

  const url = "https://omgvamp-hearthstone-v1.p.rapidapi.com/info";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "24b7a63a44msh1a8549990a23d2ep1dcfa8jsnb53a67af2aa7",
      "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      typeList = new Array();

      for (let i = 0; i < data.types.length; i++) {
        list = new Array();

        cardData.forEach((element) => {
          if (element.type === data.types[i]) {
            list.push(element);
          }
        });

        typeList.push(list);
      }

      result = new Array();

      typeList.forEach((element) => {
        element.forEach((card) => {
          result.push(card);
        });
      });

      ClearResults();
      displayData(result);
    })
    .catch((error) => console.log("ERROR"));
}

function displayByRace() {
  if (currentSortButton === sortRaceButton) {
    return;
  }

  currentSortButton.classList.remove("active");
  currentSortButton = sortRaceButton;
  sortRaceButton.classList.add("active");

  const url = "https://omgvamp-hearthstone-v1.p.rapidapi.com/info";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "24b7a63a44msh1a8549990a23d2ep1dcfa8jsnb53a67af2aa7",
      "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      raceList = new Array();

      for (let i = 0; i < data.races.length; i++) {
        list = new Array();

        cardData.forEach((element) => {
          if (element.race === data.races[i]) {
            list.push(element);
          }
        });

        raceList.push(list);
      }

      result = new Array();

      raceList.forEach((element) => {
        element.forEach((card) => {
          result.push(card);
        });
      });

      ClearResults();
      displayData(result);
    })
    .catch((error) => console.log("ERROR"));
}

function ClearResults() {
  resultsContainer.innerHTML = "";
}

searchButton.addEventListener("click", function () {
  if (searchBar.value.trim() != "") {
    SearchCards(searchBar.value.trim());
  }
});

hideDetail.addEventListener("click", closeDetail);

sortRarityButton.addEventListener("click", displayByRarity);
sortClassButton.addEventListener("click", displayByClass);
sortSetButton.addEventListener("click", displayBySet);
sortFactionButton.addEventListener("click", displayByFaction);
sortTypeButton.addEventListener("click", displayByType);
sortRaceButton.addEventListener("click", displayByRace);

noSortButton.addEventListener("click", function () {
  if (currentSortButton != noSortButton) {
    currentSortButton.classList.remove("active");
    currentSortButton = noSortButton;
    noSortButton.classList.add("active");

    ClearResults();
    displayData(cardData);
  }
});
