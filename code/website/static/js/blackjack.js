function draw_cards() {
    let image_elements = document.getElementById("cards_player_1").childNodes
    let colors = ["C", "D", "H","S"]
    let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]

    for(image of image_elements) {
        let color = colors[Math.floor(Math.random() * colors.length)];
        let value = values[Math.floor(Math.random() * values.length)];
        let card = value + color
        let image_name = card + ".png"
        image.src="./images/cards/" + image_name
    }
}