const resultTemplate = document.querySelector("[card-search-result]");
const resultsContainer = document.getElementById("results_container");

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

SearchCards("Ys");

function SearchCards(inputValue) {
  const url = `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/${inputValue}`;
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
      data.slice(0, 50).forEach((element) => {
        const result = resultTemplate.content.cloneNode(true).children[0];
        const resultText = result.querySelector("[result-text]");

        resultText.textContent = element.name;
        resultText.id = element.cardId;

        result.addEventListener("click", function () {
          openDetail(element.cardId);
        });

        resultsContainer.append(result);
      });
    })
    .catch((error) => console.log("ERROR"));
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
    })
    .catch((error) => console.log("ERROR"));

  overlay.classList.replace("overlay-slide-left", "overlay-slide-right");
}

function closeDetail() {
  overlay.classList.replace("overlay-slide-right", "overlay-slide-left");
}

hideDetail.addEventListener("click", closeDetail);
