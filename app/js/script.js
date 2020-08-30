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

const normalMenu = document.querySelector('.normal-menu');
const specialMenu = document.querySelector('.special-menu');
window.addEventListener('DOMContentLoaded', () => {
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


  const instagramRegExp = new RegExp(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/);
  const fetchInstagramPhotos = async (accountUrl) => {
    const response = await axios.get(accountUrl);
    const json = JSON.parse(response.data.match(instagramRegExp)[1]);
    const edges = json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(0, 8);
    const photos = edges.map(({ node }) => {
      return {
        url: `https://www.instagram.com/p/${node.shortcode}/`,
        thumbnailUrl: node.thumbnail_src,
        displayUrl: node.display_url,
        caption: node.edge_media_to_caption.edges[0].node.text
      }
    })
    return photos
  }
  (async () => {
    try {
        const photos = await fetchInstagramPhotos('https://www.instagram.com/palaisshazam/');
        const container = document.querySelector('.last-pictures');
        var i = 1;
        photos.forEach(el => {
        const div = document.createElement('div');
        const a = document.createElement('a');
        const img = document.createElement('img');

        a.setAttribute('href', el.url);
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
        div.classList.add('picture');
        if (i >= 3) {
            div.classList.add('hfts');
        }
        if (i==5) {
            div.classList.add('hide-for-mobile');
        }

        img.setAttribute('src', el.thumbnailUrl);
        img.setAttribute('alt', el.caption);
        
        a.appendChild(img);
        div.appendChild(a);
        if (i <=5 ){
            container.appendChild(div);
        }
        
        i++;
        })
    } catch (e) {
        console.error('Fetching Instagram photos failed', e);
    }
})()