const imgDiv = document.querySelector("#images");
const query = document.querySelector("form input");
const searchButton = document.querySelector("form button");
const errorMessage = document.querySelector("#error");

searchButton.addEventListener("click", () => {
  fetchImg(query.value);
});

async function fetchImg(query) {
  errorMessage.textContent = "";

  try {
    const fetchedData = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=zEN1LyMwQsOt02o2sG1i2cXquWWAVE1R&s=${query}`,
      { mode: "cors" }
    );

    const imgData = await fetchedData.json();

    createImage(imgData.data.images.original.url);
  } catch (error) {
    errorMessage.textContent = error.message;
  }
}

function createImage(src) {
  const img = document.createElement("img");
  img.src = src;
  img.onclick = () => downloadImage(src);
  imgDiv.insertBefore(img, imgDiv.firstChild);
}

async function downloadImage(imageSrc) {
  const image = await fetch(imageSrc);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = "";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}