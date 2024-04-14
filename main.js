const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");
let y = coords.y;
let oldX, diffX = 0;
let oldY, diffY = 0;

const colors = [
  "#ffb56b",
  "#fdaf69",
  "#f89d63",
  "#f59761",
  "#ef865e",
  "#ec805d",
  "#e36e5c",
  "#df685c",
  "#d5585c",
  "#d1525c",
  "#c5415d",
  "#c03b5d",
  "#b22c5e",
  "#ac265e",
  "#9c155f",
  "#950f5f",
  "#830060",
  "#7c0060",
  "#680060",
  "#60005f",
  "#48005f",
  "#3d005e"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = document.documentElement.scrollTop + e.clientY;

  y = e.clientY;

  diffX = Math.abs(oldX - e.clientX);
  diffY = Math.abs(oldY - coords.y);

  oldX = e.clientX;
  oldY = coords.y;
});

window.addEventListener("scroll", function(e){
  coords.y = document.documentElement.scrollTop + y;

  diffY = Math.abs(oldY - coords.y);
  oldY = coords.y;
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 8 + "px";
    circle.style.top = y - 8 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    if (diffX < 40 && diffY < 40){
      x += (nextCircle.x - x) * 0.25;
      y += (nextCircle.y - y) * 0.25;
    }
    else{
      x += (nextCircle.x - x) * 0.05;
      y += (nextCircle.y - y) * 0.05;
    }
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();