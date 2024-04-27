const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
document.getElementById("trs").style.height = document.getElementById("homepage").offsetHeight;

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

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

// function: showSlides: to show ie move images slides on button clicks.
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

// Code to show or hide my photo on mouse over
// also to maintain the image always stays near pointer.
const photo = document.getElementById("photo");
photo.onmouseover = (event) => {
  const photo_img = document.getElementById("photo__img");
  photo_img.animate({
    opacity: 1,
  }, { duration: 500, fill: 'forwards'})
  photo_img.style.left = (clientX - 50) + "px";
  photo_img.style.top = (document.documentElement.scrollTop + clientY - 50) + "px";
}

photo.onmousemove = (event) => {
  const photo_img = document.getElementById("photo__img");
  photo_img.animate({
    left: (clientX - 50) + "px",
    top: (document.documentElement.scrollTop + clientY - 50) + "px",
  }, { duration: 500, fill: 'forwards'})
}

photo.onmouseout = (event) => {
  const photo_img = document.getElementById("photo__img");
  photo_img.animate({
    opacity: 0,
  }, { duration: 500, fill: 'forwards'})
}

// Code to show or hide certificates on mouse over
// also to maintain the image always stays near pointer.
const imageSources = ["./src/rwd.png", "./src/beta.png", "./src/fdl.png", "./src/jsads.png"];
const imgCert = document.querySelectorAll(".cert_img__a");
imgCert.forEach((item, index) => {
  item.addEventListener("mouseover", e => {
    const certImg = document.getElementById("certImg");
    certImg.style.left = clientX + "px";
    certImg.style.top = document.documentElement.scrollTop + clientY + "px";
    certImg.setAttribute("src", imageSources[index]);
    certImg.animate({
      opacity: 1,
    }, {duration: 500, fill: "forwards"})
  })

  item.addEventListener("mousemove", e => {
    const certImg = document.getElementById("certImg");
    certImg.setAttribute("src", imageSources[index]);
    certImg.animate({
      left: (clientX) + "px",
      top: (document.documentElement.scrollTop + clientY) + "px",
    }, {duration: 500, fill: "forwards"})
  })

  item.addEventListener("mouseout", e => {
    const certImg = document.getElementById("certImg");
    certImg.animate({
      opacity: 0,
    }, {duration: 500, fill: "forwards"})
  })
})

// Function to show error if form is invalid.
function showError(id){
  document.getElementById(id).animate({
    opacity: 1,
  }, {duration: 250, fill: "forwards"})
}

// Function to hide errors shown on form invalid.
function hideError(id){
  document.getElementById(id).animate({
    opacity: 0,
  }, {duration: 150, fill: "forwards"})
}

// Function to send mail using the custom server api.
function sendMail(){
  const name = document.getElementById('senderName').value;
  const email = document.getElementById('senderEmail').value;
  const message = document.getElementById('sendingMsg').value;

  async function sendEmail() {

    // If name is invalid show error.
    if (!name) {
      showError("err__name");
    }

    // If email is invalid show error.
    if (!email || !emailRegex.test(email)) {
      showError("err__email");
    }

    // If message is invalid show error.
    if (!message) {
      showError("err__msg");
    }

    // return and reset form to stop further execution and avoid server errors.
    if (!name || !email || !emailRegex.test(email) || !message){
      document.getElementById("contact__form").reset();
      return;
    }
    try {
      document.getElementById("submitButton").value = "Sending...";
      const response = await fetch('https://mailserver-k0i2.onrender.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      });

      const data = await response.json();

      if (data.message === 'Email sent successfully!') {
        alert("Message Sent Succesfully!");
        console.log('Email sent!');
        document.getElementById("submitButton").disabled = true;
        document.getElementById("submitButton").value = "Sent";
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      alert("Error: Try again or use email provided.");
      console.error('Error sending email:', error);
    } finally{
      document.getElementById("contact__form").reset()
      hideError("err__name");
      hideError("err__email");
      hideError("err__msg");
    }
  }

  // Send data to server to send mail.
  sendEmail();
}
