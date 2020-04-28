function draw_cards() {
    let image_elements = document.getElementById("cards_player_1").childNodes

    for(image of image_elements) {
        image.src="./images/cards/2C.png"
    }
}