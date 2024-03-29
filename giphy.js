const giphyUrl = "https://api.giphy.com/v1/gifs/trending?"

const params = {
    api_key: "pD2FwvTrnByUtoDfc41i5H20aLzgh9jq",
    limit: "10",
    rating: "g",
};

const images = [];

const fetchGifs = () => fetch(giphyUrl + new URLSearchParams(params))
    .then((response) => response.json())
    .then((json) => {
        const container = document.getElementById("giphy-container");
        const loadingGif = document.getElementById("loading-gif");
        loadingGif.setAttribute("aria-label", "hidden");
        loadingGif.setAttribute("class", "hidden");
        for (let { url, src, alt } of json.data.map((d) => ({ url: d.url, src: d.images.original.url, alt: d.title }))) {
            const imgElement = document.createElement("img");
            imgElement.src = src;
            imgElement.alt = alt;
            imgElement.setAttribute("class", "giphy-image");

            const linkElement = document.createElement("a");
            linkElement.href = url;
            linkElement.target = "_blank";
            linkElement.appendChild(imgElement);
            images.push(imgElement);

            container.appendChild(linkElement);
        }
    });

setTimeout(fetchGifs, 500);

const recentlyPressedKeys = [];
let easterEggIsActive = false;

const konamiCode = [
    "ARROWUP",
    "ARROWUP",
    "ARROWDOWN",
    "ARROWDOWN",
    "ARROWLEFT",
    "ARROWRIGHT",
    "ARROWLEFT",
    "ARROWRIGHT",
    "B",
    "A",
];

const addKeyPress = (key) => {
    recentlyPressedKeys.push(key.toUpperCase());
    if (recentlyPressedKeys.length > konamiCode.length) {
        recentlyPressedKeys.shift();
    }
};

const deactivateEasterEgg = () => {
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        image.setAttribute("class", "giphy-image")
    }
    easterEggIsActive = false;
};

const activateEasterEgg = () => {
  if (easterEggIsActive) {
      return;
  }
  easterEggIsActive = true;
  for (let i = 0; i < images.length; i++) {
      const image = images[i];
      image.setAttribute("class", "giphy-image rotate")
  }
  setTimeout(deactivateEasterEgg, 2000);
};

const checkRecentlyPressedKeys = () => {
    for (let i = 0; i < Math.min(recentlyPressedKeys.length, konamiCode.length); i++) {
        if (recentlyPressedKeys[i] !== konamiCode[i]) {
            return;
        }
    }
    if (recentlyPressedKeys.length === konamiCode.length) {
        activateEasterEgg();
        recentlyPressedKeys.length = 0;
    }
};

const keyPressed = (e) => {
    addKeyPress(e.key);
    checkRecentlyPressedKeys();
}

document.addEventListener("keydown", keyPressed);
