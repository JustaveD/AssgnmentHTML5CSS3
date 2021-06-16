const slideShow = document.querySelector("#slide-images");
const slideImages = document.querySelectorAll("#slide-images img");
const infoDetail = document.querySelector(".info-detail");
const dataMember = [
  {
    name: "Martin",
    text1:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velalias autem blanditiis non? Eligendi",
    text2:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velalias autem blanditiis non? Eligendi",
  },
  {
    name: "Loyer",
    text1:
      "Lorem ipsum dolor sit,dolor sit, amet conse amet consectetur adipisicing elit. Velalias autem blanditiis non? Eligendi",
    text2:
      "Lorem amet consectetur adipisicing elit. Velalias autem blanditiis non? Eligendi",
  },
  {
    name: "Zed",
    text1:
      "Lorem ipsumipsum dolor sit, , amet consectetur adipisicing elit. Velalias autem blanditiis non? Eligendi",
    text2:
      "Lorem ipsum dolor sit,ipsum dolor sit,  amet consectetur adipisicing elit. Velalias autem blanditiis non? Eligendi",
  },
  {
    name: "Jesscica",
    text1:
      "Lorem ipsum doipsum dolor sit, t, amet consectetur adipisicing elit. Velalias autem blanditiis non? Eligendi",
    text2:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velalias autem blanditiis non? Eligendi",
  },
  {
    name: "Alex",
    text1:
      "Lorem ipsuipsum dolor sit,  sit, amet consectetur adipisicing elit. Velalias autem blanditiis non? Eligendi",
    text2:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velalias autem blanditiis non? Eligendi",
  },
  {
    name: "Jayce",
    text1:
      "Lorem ipsum dolipsum dolor sit,  amet consectetur adipisicing elit. Velalias autem blanditiis non? Eligendi",
    text2:
      "Lorem ipsum ctetur adipisicing elit. Velalias autem blanditiis non? Eligendi",
  },
];

//counter and calculate width of image
const size = 400;
let count = 1;

slideShow.style.transform = "translateX(" + -size * count + "px)";

//get prev and next btn
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

//Circle Bubble of Slide
//get all circle element
const circles = document.querySelectorAll(".circle");
circles[0].classList.add("active-circle");

//add event

function activeNextCircle() {
  if (count != 1) {
    circles[count - 2].classList.remove("active-circle");
    if (count == slideImages.length - 1) {
      circles[0].classList.add("active-circle");
    } else {
      circles[count - 1].classList.add("active-circle");
    }
  }
}
function activePrveCircle() {
  circles[count - 1 + 1].classList.remove("active-circle");
  if (count == 0) {
    circles[5].classList.add("active-circle");
  } else {
    circles[count - 1].classList.add("active-circle");
  }
}

function prevSlide() {
  if (count <= 0) return;

  slideShow.style.transition = "all 0.4s ease-in-out";

  count--;
  if(count>0)renderData(count-1);
  slideShow.style.transform = "translateX(" + -size * count + "px)";

  //use count variable to identify what circle to add active-circle class
  activePrveCircle();

  slideShow.addEventListener("transitionend", function () {
    if (slideImages[count].id == "lastClone") {
      count = slideImages.length - 2;
      if(count>0)renderData(count-1);
      slideShow.style.transition = "none";
      slideShow.style.transform = "translateX(" + -size * count + "px)";
    }
  });

  console.log(count);
}
function renderData(index){
  infoDetail.innerHTML = `
  <h3 class="name">${dataMember[index].name} is...</h3>
  <p class="text">
  ${dataMember[index].text1}
  </p>
  <p class="text">
  ${dataMember[index].text2}
  </p>
  <h6 class="read-more">Read more</h6>
  `
}
function nextSlide() {
  if (count >= slideImages.length - 1) return;

  slideShow.style.transition = "all 0.4s ease-in-out";

  count++;
  if(count<7)
  renderData(count-1);
  slideShow.style.transform = "translateX(" + -size * count + "px)";

  //use count variable to identify what circle to add active-circle class
  activeNextCircle();

  slideShow.addEventListener("transitionend", function () {
    if (slideImages[count].id == "firstClone") {
      slideShow.style.transition = "none";
      count = slideImages.length - count;
      if(count<7)renderData(count-1);
      slideShow.style.transform = "translateX(" + -size * count + "px)";
    }
  });
  console.log(count);
}

prevBtn.addEventListener("click", prevSlide);

nextBtn.addEventListener("click", nextSlide);

//auto next slide

let time = 4000;
setInterval(nextSlide, time);

//use count variable to identify what circle to add active-circle class

circles.forEach((element) => {
  element.addEventListener("click", function () {
    let dataCount = parseInt(element.dataset.count);
    slideShow.style.transition = "all 0.6s ease-in-out";
    slideShow.style.transform = "translateX(" + -size * dataCount + "px)";
    console.log(count);
    circles[count - 1].classList.remove("active-circle");

    count = dataCount;
    circles[dataCount - 1].classList.add("active-circle");
  });
});

const position = document.querySelectorAll('.show-position a');
// const block = document.querySelector('.block');
// const height = block.clientHeight;
// function addAndRemoveClassActive(index){
//   for(let i = 0;i<position.length;i++){
//     if(i = index){
//       position[i].classList.add('active');
//     }
//     else{
//       position[i].classList.remove('active');
//     }
//   }
// }
// window.addEventListener('scroll',function(){
//   if(window.pageYOffset == 1000){
//     addAndRemoveClassActive(5);
//   }
// })
function addAndRemoveClassActive(index){
  for(let i= 0;i<position.length;i++){
    if(i== index){
      position[i].classList.add('active');
    }
    else{
      position[i].classList.remove('active');
    }
  }
}
let block = document.querySelectorAll('.block');
let height = block[0].clientHeight;
function scrollEffect(){
  if(window.scrollY == 0){
    addAndRemoveClassActive(0);
  }
  if(window.scrollY >= height/3){
    block[1].classList.add('active');
    addAndRemoveClassActive(1);
  }
  else{
    block[1].classList.remove('active');
  }
  if(window.scrollY >=  height + height/3){
    block[2].classList.add('active');
    addAndRemoveClassActive(2);
  }
  else{
    block[2].classList.remove('active');
  }
  if(window.scrollY >=  2*height + height/3){
    block[3].classList.add('active');
    addAndRemoveClassActive(3);
  }
  else{
    block[3].classList.remove('active');
  }
  if(window.scrollY >=  3*height + height/3){
    block[4].classList.add('active');
    addAndRemoveClassActive(4);
  }
  else{
    block[4].classList.remove('active');
  }
  if(window.scrollY >=  4*height + height/3){
    block[5].classList.add('active');
    addAndRemoveClassActive(5);
  }
  else{
    block[5].classList.remove('active');
  }
}
window.addEventListener('scroll', scrollEffect);


let buttonActive = document.querySelector('.button-active');
let iActive = document.querySelector('.button-active i');
let navActive = document.querySelector('.nav-active');
let aNav = document.querySelectorAll('.nav-active a');
buttonActive.addEventListener('click',function(){
  navActive.classList.toggle('active');
  // if(navActive.classList.)
  iActive.classList.toggle('fa-times');
  iActive.classList.toggle('fa-bars');
})
aNav.forEach(e=>{
  e.addEventListener('click',function(){
    navActive.classList.remove('active');
    
    iActive.classList.toggle('fa-times');
    iActive.classList.toggle('fa-bars');
  })
})
