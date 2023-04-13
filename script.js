const input = document.getElementById("input");
const grid = document.querySelector(".grid");
const refrBtn = document.querySelector(".refr");

window.addEventListener("load", dayNightMode);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") loadImg();
});
refrBtn.addEventListener("click", loadImg);

function loadImg() {
  removeImages();
  const url =
    "https://api.unsplash.com/photos/random/?query=" +
    input.value +
    "&count=4&client_id=93BaDEu8kgjuEhoFpGqvEdsjwrUlQMzk1HL7x0wxHak";
  fetch(url)
    .then((response) => {
      console.log(response);
      if (response.ok) return response.json();
      else alert(response.status);
    })
    .then((data) => {
      const imageNodes = [];
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        imageNodes[i] = document.createElement("div");
        imageNodes[i].className = "img";
        imageNodes[i].style.backgroundImage = "url(" + data[i].urls.raw + ")";
        imageNodes[i].addEventListener("dblclick", function () {
          window.open(data[i].links.download, "_blank");
        });
        grid.appendChild(imageNodes[i]);
      }
    });
}

function removeImages() {
  grid.innerHTML = " ";
}

function dayNightMode() {
  const date = new Date();
  const hour = date.getHours();

  if (hour >= 7 && hour < 19) {
    document.body.style.backgroundColor = "whitesmoke";
    document.body.style.color = "black ";
  } else {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white ";
  }
}
// "https://api.unsplash.com/search/photos/?query="
// getElementsByClassName("grid")[0];
