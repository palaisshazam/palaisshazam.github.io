const body = document.querySelector('body');
const switchBtn = document.querySelector('.switch');
const icon = document.querySelector('.icon img');
const header = document.querySelector('header');
const logo = document.querySelector('.logo img');
const scrollGif1 = document.querySelector('#sd1');
const scrollGif2 = document.querySelector('#sd2');
const footerPics = ['.fb-icon', '.ig-icon', '.wts-icon', '.email-icon'];
const all = document.querySelector('*');
window.onscroll = function() {scrollFunction()};

const neededTransitions = (time) => {
    body.style.setProperty('transition', `background-color ${time}ms ease-in-out`);
    header.style.setProperty('transition', `background-color ${time}ms ease-in-out`);}
const removeTransitions = () => {
    body.style.setProperty('transition', 'none');
    header.style.setProperty('transition', 'none');
}


function switchMode() {
    neededTransitions(500);

    if (body.classList.contains('dark')) {
            switchBtn.src = 'images/moon.png';
            icon.src = 'images/icon_gold.png';
            logo.src = 'images/logo_black.png';
            scrollGif1.style.filter = "invert(0%)";
            scrollGif2.style.filter = "invert(0%)";
            footerPics.forEach(pic => {
              document.querySelector(pic).style.filter = "invert(100%)";
            })
            body.classList.remove('dark');
            body.classList.add('light');
    } else {
            switchBtn.src = 'images/sun.png';
            icon.src = 'images/icon_white.png';
            logo.src = 'images/logo_white.png'
            scrollGif1.style.filter = "invert(100%)";
            scrollGif2.style.filter = "invert(100%)";
            footerPics.forEach(pic => {
              document.querySelector(pic).style.filter = "invert(0%)";
            })
            body.classList.remove('light');
            body.classList.add('dark');
    }

    setTimeout(removeTransitions, 1000)
    
}

switchBtn.addEventListener('click', () => {
    switchMode();
});

function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
      // show header
      header.classList.add('visible');
      header.classList.contains('smoothHide')  ? header.classList.remove('smoothHide') : console.log();
      header.classList.add('smoothShow');
    } else {
      //hide header
      header.classList.remove('visible');
      header.classList.contains('smoothShow')  ? header.classList.remove('smoothShow') : console.log();
      header.classList.add('smoothHide');
    }
  }


window.addEventListener('DOMContentLoaded', () => {
    const normalMenu = document.querySelector('.normal-menu');
    const specialMenu = document.querySelector('.special-menu');
      let displayMenu = menu.filter(item => {return (!item.isSpecial);}).map(item => {
        return `<div class="section ${item.id % 2 == 0 ? "two" : "one"}">

          <div class="section__image" data-aos="${item.id % 2 == 0 ? "fade-right" : "fade-left"}">
            <img src="${item.image}" alt="${item.title}" />
          </div>
          <div class="section__text" data-aos="${item.id % 2 == 0 ? "fade-left" : "fade-right"}">
            <div class="title">
              <h3>${item.title}</h3>
            </div>
            <div class="description">
              <p>${item.description}</p>	
            </div>
            <div class="price">
              <h4>${item.price}DH</h4>
            </div>	
          </div>

        </div>`;
      });
      let displaySpecial = menu.filter(item => {return (item.isSpecial);}).map(item => {
        return `<div class="section ${item.id % 2 == 0 ? "two" : "one"}">

        <div class="section__image" data-aos="${item.id % 2 == 0 ? "fade-right" : "fade-left"}">
          <img src="${item.image}" alt="${item.title}" />
        </div>
        <div class="section__text" data-aos="${item.id % 2 == 0 ? "fade-left" : "fade-right"}">
          <div class="title">
            <h3>${item.title}</h3>
          </div>
          <div class="description">
            <p>${item.description}</p>	
          </div>
          <div class="price">
            <h4><strike>${item.price}DH</strike> ${item.specialPrice}DH</h4>
            <h4>${item.specialComment}</h4>
          </div>	
        </div>

      </div>`;
      });

      displayMenu = displayMenu.join('\r\n');
      displaySpecial = displaySpecial.join('\r\n');

      normalMenu.innerHTML = displayMenu;
      specialMenu.innerHTML = displaySpecial;

});
