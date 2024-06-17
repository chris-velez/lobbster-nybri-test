//START script for the module startpage drop down============================//
function moduleStart() {
  var x = document.getElementById("moduleStart");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
//END script for the module startpage drop down============================//
//START script for the module hamburger============================//
function openNav() {
  document.getElementById("sideNavMobile").style.width = "250px";
  document.getElementById("sideNavMobile").style.display = "block";
  document.getElementById("hamburger").style.marginLeft = "250px";
  document.getElementById("hamburger").style.display = "none";
}

function closeNav() {
  document.getElementById("sideNavMobile").style.width = "0";
  document.getElementById("hamburger").style.marginLeft = "0";
  document.getElementById("hamburger").style.display = "block";
}

function nav_burger() {
  var x = document.getElementById("nav_burger_hide");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
//END script for the module hamburger============================//
//START script for the module transcript============================//
function showTranscripts(n) {
  var transcripts = document.getElementsByClassName("transcripts");
  if (
    transcripts[n].style.display == "block" ||
    transcripts[n].style.display == ""
  ) {
    transcripts[n].style.display = "none";
  } else {
    transcripts[n].style.display = "block";
  }
}
//END script for the module transcripts============================//
//START script for the module slider============================//
var slideIndex = 1;

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("moduleSlide");
  var dots = document.getElementsByClassName("dot");
  var asideSquares = document.getElementsByClassName("asideActive");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" dotActive", "");
  }
  for (i = 0; i < asideSquares.length; i++) {
    asideSquares[i].className = asideSquares[i].className.replace(
      " asideActive2",
      ""
    );
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " dotActive";
  asideSquares[slideIndex - 1].className += " asideActive2";
}
//END script for the module slider============================//

//START script for accessibility===============================//
function click() {}

//END script for accessibility=================================//
