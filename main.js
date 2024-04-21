// CODE FOR HANDLING MAIN CURSON GRADIENT MOVE.
const body = document.body;
const blob = document.getElementById('blob');
let {clientX, clientY} = 0;

// animateBlob(clientX, clientY) => Function to call on 'onpointermove'
// or 'onscroll' event to handle gradient motion animation.
let animateBlob = (clientX, clientY) => {
  clientY = document.documentElement.scrollTop + clientY;

  // Code to stop blob going beyond body height.
  clientY = Math.min(clientY, body.clientHeight - blob.offsetHeight / 1.4)
  blob.animate(
    {
      left: `${clientX - 175}px`,
      top: `${clientY - 175}px`
    }, { duration: 1000, fill: 'forwards'}
  )
}


// On pointer moved get pointer position and animate gradient.
document.body.onpointermove = event => {
  clientX = event.clientX;
  clientY = event.clientY;

  if (navigator.maxTouchPoints <= 0 && clientX != NaN && clientY != NaN){
    animateBlob(clientX, clientY)
  }
}


// On scroll hanle all animation on scroll.
window.addEventListener("scroll", function(e){

  // If scrolling down 100px then move main hero section background position.
  if (document.documentElement.scrollTop > 100){
    document.getElementById('homepage').animate(
      {backgroundPosition: `10% 10%`}, { duration: 2500, fill: 'forwards'}
    )
  }

  // If scrolling up 100px then move main hero section background position.
  if (document.documentElement.scrollTop < 100){
    document.getElementById('homepage').animate(
      {backgroundPosition: `0% 0%`}, { duration: 2500, fill: 'forwards'}
    )
  }

  // If scrolling down 200px then hide navigation items and make name logo short.
  if (document.documentElement.scrollTop > 200){
    document.getElementById('navitm').style.pointerEvents = 'none';
    document.getElementById('navi').style.pointerEvents = 'none';
    document.getElementById('home_a').style.pointerEvents = 'visible';
    document.getElementById('home').animate(
      {width: `12px`}, { duration: 2000, fill: 'forwards'}
    )
    document.getElementById('navitm').animate(
      {opacity: 0}, { duration: 2000, fill: 'forwards'}
    )
  }

  // If scrolling up 200px then show navigation items and make name logo long as original.
  if (document.documentElement.scrollTop < 200){
    document.getElementById('navitm').style.pointerEvents = 'visible';
    document.getElementById('navi').style.pointerEvents = 'visible';
    document.getElementById('home_a').style.pointerEvents = 'visible';
    document.getElementById('home').animate(
      {width: `95.15px`}, { duration: 2000, fill: 'forwards'}
    )
    document.getElementById('navitm').animate(
      {opacity: 1}, { duration: 2000, fill: 'forwards'}
    )
  }

  // If pointer is present and cursor events are valid then animate gradient.
  if (navigator.maxTouchPoints <= 0 && clientX != NaN && clientY != NaN){
    animateBlob(clientX, clientY)
  }
})


// CODE FOR HANDLING MAIN SKILLS SECTION AUTO SCROLL.
const scrollers = document.querySelectorAll(".scroller");

// If user is comfortable with auto motion only then show scroll animation.
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
  addAnimation();
}

// addAnimation => Function to handle auto scroll on skills section.
function addAnimation(){

  // For each element in scroller if data-animated is true, then
  // duplicate the children inside scroller_inner section to 
  // maintain continuous scroll.
  scrollers.forEach(scroller => {
    scroller.setAttribute("data-animated", true)

    const scrollerInner = scroller.querySelector('.scroller_inner')
    const scrollerContent = Array.from(scrollerInner.children)

    scrollerContent.forEach(item => {
      const duplicatedItem = item.cloneNode(true);

      duplicatedItem.setAttribute('aria-hidden', true)
      scrollerInner.appendChild(duplicatedItem)
    })
  })
}


// Function to call in HTML file after resume button click
// for downloading resume pdf file.
function downloadPdf(){
  document.getElementById("pdf_file").click();
}


// CODE FOR HANDLING HACKER TEXT ANIMATION.
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;
const objToHover = document.getElementById("home")
  
// On mouse over on home name logo, animate hacker text.
objToHover.onmouseover = event => {  
  let iteration = 0;
  
  // Clear interval before animation.
  clearInterval(interval);
  
  // Create interval.
  interval = setInterval(() => {

    // Split the existing inner text, map over eaxh letter,
    // take random letter, put that random letter in mapped letter,
    // put the original letter of the same index.
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return event.target.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    // If iterated to the length of original text then,
    // stop interval execution.
    if(iteration >= event.target.dataset.value.length){ 
      clearInterval(interval);
    }
    
    // Iterate 3 times for each letter.
    iteration += 1 / 3;
  }, 30);
}


// animateText(i) => Takes index of the nav items to 
// animate hacker text of nav link item.
function animateText(i){

  // Get the all objects eligible for animation.
  const hoverObj = document.querySelectorAll(".greatText");
  let iteration = 0;
  
  // Clear interval before animation.
  clearInterval(interval);
  
  // Split the existing inner text, map over eaxh letter,
  // take random letter, put that random letter in mapped letter,
  // put the original letter of the same index.
  interval = setInterval(() => {
    hoverObj[i].innerText = hoverObj[i].innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return hoverObj[i].dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    // If iterated to the length of original text then,
    // stop interval execution.
    if(iteration >= hoverObj[i].dataset.value.length){ 
      clearInterval(interval);
    }
    
    // Iterate 3 times for each letter.
    iteration += 1 / 3;
  }, 30);
}


function sendMessage(){
  alert("Message received!");
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "flex";  
  dots[slideIndex-1].className += " active";
}
