// Video

const video = document.querySelector("video");
const imgBtn = document.querySelector("#imgBtn");
const btnClocse = document.querySelector(".btn-close");
const playBtn = document.querySelector(".play-btn");

playBtn.addEventListener("click", function () {
  video.classList.add("active");
  video.play();
  btnClocse.classList.add("active");
  // video.autoplay();
});
btnClocse.addEventListener("click", function () {
  video.classList.remove("active");
  video.removeAttribute("autoplay");
  video.pause();
  btnClocse.classList.remove("active");
});

// Local Storage

window.addEventListener("scroll", function () {
  window.localStorage.setItem("scroll", window.scrollY);
});
if (!window.localStorage.getItem("scroll")) {
  window.localStorage.setItem("scroll", window.scrollY);
}
if (window.localStorage.getItem("scroll") > 0) {
  window.scrollTo(0, window.localStorage.getItem("scroll"));
}

// Geolocation
let countryDiv = document.querySelector(".country");
let btn = countryDiv.querySelectorAll("span");
let res = document.querySelector(".res");
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    // console.log(position);
    $.get(
      "http://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        position.coords.latitude +
        "," +
        position.coords.longitude +
        "&sensor=false",
      function (data) {
        console.log(data);
        let country = "Viet Nam";
        countryDiv.classList.add("active");
        btn.forEach((e) => {
          e.addEventListener("click", function () {
            countryDiv.classList.remove("active");
            if (e.id == "yes") {
              res.classList.add("active");
              setTimeout(() => {
                res.classList.remove("active");
              }, 2000);
            }
          });
        });
      }
    );
  });
}
// Capcha

let dataImg = [
  [
    {
      src: "./images/Capcha/dog1.jpg",
      id: "true",
    },
    {
      src: "./images/Capcha/cat1.jpg",
      id: "false",
    },
    {
      src: "./images/Capcha/cat2.jpg",
      id: "false",
    },
    {
      src: "./images/Capcha/cat3.jpg",
      id: "false",
    },
    {
      name: "con chó",
    },
  ],
  [
    {
      src: "./images/Capcha/banana1.jpg",
      id: "false",
    },
    {
      src: "./images/Capcha/banana2.jpg",
      id: "false",
    },
    {
      src: "./images/Capcha/apple1.jpg",
      id: "true",
    },
    {
      src: "./images/Capcha/banana3.jpg",
      id: "false",
    },
    {
      name: "quả táo",
    },
  ]
  ,
  [
    {
      src: "./images/Capcha/fish1.jpg",
      id: "false",
    },
    {
      src: "./images/Capcha/turtle1.jpg",
      id: "true",
    },
    {
      src: "./images/Capcha/fish2.jpg",
      id: "flase",
    },
    {
      src: "./images/Capcha/fish3.jpg",
      id: "false",
    },
    {
      name: "con rùa",
    },
  ]
];

//render image

const res1 = document.querySelector('.res1');
const btnSend = document.querySelector(".form button");
const capcha = document.querySelector(".capcha");
btnSend.disabled = true;
const confirm = document.querySelector('.check-btn');
const imges = document.querySelectorAll(".capcha .sub img");
console.log(imges);
let indexImg = 0;
function renderImage() {
  for (let i = 0; i < 4; i++) {
    imges[i].setAttribute("src", dataImg[indexImg][i]["src"]);
    imges[i].setAttribute("id", dataImg[indexImg][i]["id"]);
  }
}
renderImage();
confirm.addEventListener("click", function () {
  
  capcha.classList.add("active");
});

function allowDrag(e) {
    
  e.preventDefault();
}
function drop(e) {
  // prevent default action (open as link for some elements)
  e.preventDefault();
  let data = e.dataTransfer.getData("text");
  if (data == "true") {
    capcha.remove("active");
    btnSend.style.cursor ='pointer';
    btnSend.disabled = false;
    btnSend.style.backgroundColor = '#c00010'
    res1.classList.add("active");
    res1.innerText = "Đã gửi";
    setTimeout(() => {
      res1.classList.remove("active");
    }, 2000);
  }
  else{
      if(indexImg == dataImg.length-1){
        const nameCapcha = capcha.querySelector('p');
          indexImg= 0;
          nameCapcha.innerText =`Hãy kéo ${dataImg[indexImg][4]['name']} vào ô phía trên!`
      }else{
        const nameCapcha = capcha.querySelector('p');
          indexImg++;
          nameCapcha.innerText =`Hãy kéo ${dataImg[indexImg][4]['name']} vào ô phía trên!`;
      }
      renderImage();
  }
}
function drag(e) {
  e.dataTransfer.setData("text", e.target.id);
  console.log(e.target.id);
}

