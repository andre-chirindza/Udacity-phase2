const images = [];

function randomizeImages(images) {
    let rands = [];
    let randomizedImages = [];
    for (let i = 0; i < images.lenght; i++) {
        let rand = Math.random(images.lenght - 1);
        if (!rands.includes(rand)) {
            randomizedImages.push(images[rand])
        }
    }
    return randomizedImages;
}

function main() {
    
    const container = document.getElementsByClassName("container");
    for (let index = 1; index <= 16; index++){
        const div = document.createElement('div');
        div.setAttribute("class", "card");

        container[0].appendChild(div);
    }
}

main();