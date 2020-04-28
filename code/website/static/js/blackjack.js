const gameData = {}
gameData["colors"] = ["C", "D", "H","S"]
gameData["values"] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
gameData["playerList"] = ["player_1", "bank"]
gameData["playerdata"] = {}
for(let player of gameData["playerList"]) {
    gameData["playerdata"][player] = {"cards":[]}
}

function newGame() {
    let players=gameData["playerList"]
    for(let player of players) {
        let reveal_cards = true
        if(player == "bank") {
            reveal_cards = false
        }
        gameData["playerdata"][player]["cards"] = drawCards(player, reveal_cards)
    }
}


function drawCards(person, reveal_cards=true) {
    let image_elements = document.getElementById("cards_" + person).getElementsByTagName('img')
    let colors = gameData["colors"]
    let values = gameData["values"]
    let cards = []
    for(let image of image_elements) {
        let color = colors[Math.floor(Math.random() * colors.length)];
        let value = values[Math.floor(Math.random() * values.length)];
        let card = value + color
        cards.push(card)
        if(reveal_cards) {
            let image_name = card + ".png"
            image.src = "./images/cards/" + image_name
        }
    }
    return cards
}

function drawCard(person, reveal_card=true) {
    let new_image_element = document.createElement("img");
    let colors = gameData["colors"]
    let values = gameData["values"]
    let color = colors[Math.floor(Math.random() * colors.length)];
    let value = values[Math.floor(Math.random() * values.length)];
    let card = value + color

    if(reveal_card) {
        let image_name = card + ".png"
        new_image_element.src = "./images/cards/" + image_name
        new_image_element.className = "card_image"
        let persons_card_node = document.getElementById("cards_" + person)
        persons_card_node.appendChild(new_image_element)
        console.log(persons_card_node)
    }

    return card
}

function noMoreCards(player) {
    document.getElementById(player + "_controls").style.display="none"
}