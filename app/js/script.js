/* CODE FOR BANNER CHANGGING PICS
var images = ["images/bg.png", "images/bg2.jpg", "images/bg3.jpg", "images/bg4.jpg"], x = 0;

function displayNextImage() {
    x = (x === images.length - 1) ? 0 : x + 1;
    document.getElementById('bannerPic').src = images[x];
}

function displayPreviousImage() {
    x = (x <= 0) ? images.length - 1 : x - 1;
    document.getElementById('bannerPic').src = images[x];
}

function startTimer() {
    setInterval(displayNextImage, 5000);
}
*/


// detect click on ham menu
const hamButton = document.querySelector('#ham-toggle-btn');
const hamBars = document.querySelector('.ham-toggle-btn');
hamButton.addEventListener('click', function() {
    hamBars.classList.contains('open') ? hamBars.classList.remove('open') : hamBars.classList.add('open');
})