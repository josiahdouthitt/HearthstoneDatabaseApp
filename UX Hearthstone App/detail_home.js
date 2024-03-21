const featuredTemplate = document.querySelector("[featured-card-template]");

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

const featured = document.getElementById("cards-featured-container");

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

function GetRandomCards() {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const first_choice = characters.charAt(
    Math.floor(Math.random() * characters.length)
  );
  //const second_choice = characters.charAt(Math.floor(Math.random() * characters.length));

  const url = `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/${first_choice}`;
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
      const useData = data.slice(0, 50);

      for (let i = 0; i < 4; i++) {
        cardData = useData[Math.floor(Math.random() * useData.length)];

        const result = featuredTemplate.content.cloneNode(true).children[0];
        const fText = result.children[1];
        const image = result.children[0];

        if (cardData.img != undefined) {
          image.src = cardData.img;
        }
        fText.textContent = cardData.name;
        result.id = cardData.cardId;

        result.addEventListener("click", function () {
          openDetail(result.id);
        });

        featured.append(result);
      }
    })
    .catch((error) => console.log("ERROR"));
}

hideDetail.addEventListener("click", closeDetail);
GetRandomCards();
