let container = document.getElementById('container');
let left = document.getElementById('left');
let right = document.getElementById('right');

let img = document.createElement('img');
let ol = document.createElement('ol');


let cats = [
    {
        name: 'Savannah',
        src: `https://s.yimg.com/ny/api/res/1.2/x3esmIYgZrCos7.vCc.47g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTcyMDtjZj13ZWJw/https://s.yimg.com/os/creatr-uploaded-images/2020-11/3ee1f200-334f-11eb-97d5-434ae8b09f34`
    },
    {
        name: 'Siamese',
        src: `https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/12/racas-de-gato-conheca-as-mais-populares-do-brasil-e-no-restante-do-mundo-2-960x640.jpg.webp`
    },
    {
        name: 'Persian',
        src: `https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/12/racas-de-gato-conheca-as-mais-populares-do-brasil-e-no-restante-do-mundo-1-960x960.jpg.webp`
    },
    {
        name: 'Siberian',
        src: 'https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/12/racas-de-gato-conheca-as-mais-populares-do-brasil-e-no-restante-do-mundo-6-960x540.jpg.webp'
    },
    {
        name: 'Sphynx',
        src: 'https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/12/racas-de-gato-conheca-as-mais-populares-do-brasil-e-no-restante-do-mundo-8-960x540.jpg.webp'
    },
    {
        name: 'Burmese',
        src: 'https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/12/racas-de-gato-conheca-as-mais-populares-do-brasil-e-no-restante-do-mundo-9-960x686.jpg.webp'
    },
    {
        name: 'British Shorthair',
        src: 'https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/12/racas-de-gato-conheca-as-mais-populares-do-brasil-e-no-restante-do-mundo-11-960x536.jpg.webp'
    },
    {
        name: 'Turkish Van',
        src: 'https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/12/racas-de-gato-conheca-as-mais-populares-do-brasil-e-no-restante-do-mundo-28-720x960.jpg.webp'
    },
    {
        name: 'Selkirk Rex',
        src: 'https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/12/racas-de-gato-conheca-as-mais-populares-do-brasil-e-no-restante-do-mundo-33-960x540.jpg.webp'
    },
    {
        name: 'Blue Russian',
        src: 'https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/12/racas-de-gato-conheca-as-mais-populares-do-brasil-e-no-restante-do-mundo-42-960x540.jpg.webp'
    },
    {
        name: 'Manx',
        src: 'https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/12/racas-de-gato-conheca-as-mais-populares-do-brasil-e-no-restante-do-mundo-45-960x584.jpg.webp'
    }
    
]


left.appendChild(ol);
right.appendChild(img);



cats.forEach(cat => {
    let li = document.createElement('li');
    li.setAttribute('src', cat.src);
    li.setAttribute('name', cat.name);
    li.textContent = cat.name;
    li.addEventListener('click', () => {
        show(li);
    });

    ol.appendChild(li);
})


function show(li) {
    console.log('Ola')
    img.src = li.getAttribute('src');
    img.setAttribute('name', li.getAttribute('name'))
    img.alt = li.getAttribute('name');
}