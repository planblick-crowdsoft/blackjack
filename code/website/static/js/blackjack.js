const gameData = {}
gameData["startCardsAmount"] = 2
gameData["colors"] = ["C", "D", "H","S"]
gameData["cardnames"] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
gameData["cardValueMapping"] = {"2": 2, "3":3, "4":4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
                                "10": 10, "J": 10, "Q": 10, "K": 10, "A": 11}
gameData["playerList"] = ["player_1", "bank"]
gameData["playerData"] = {}
for(let player of gameData["playerList"]) {
    gameData["playerData"][player] = {"cards":[]}
}

function newGame() {
    let players=gameData["playerList"]
    for(let player of players) {
        document.getElementById("cards_" + player).innerHTML=""
        if(player == "bank") {
            drawCard(player, false, gameData["startCardsAmount"])
        } else {
            document.getElementById(player + "_controls").style.display="block"
            drawCard(player, true, gameData["startCardsAmount"])
        }

    }
}

function drawCard(player, reveal_card=true, amount=1) {
    let i=0
    while(i < amount) {
        i += 1
        let new_image_element = document.createElement("img");
        let colors = gameData["colors"]
        let values = gameData["cardnames"]
        let color = colors[Math.floor(Math.random() * colors.length)];
        let value = values[Math.floor(Math.random() * values.length)];
        let card = value + color
        let image_name = "gray_back.png"
        if (reveal_card) {
            image_name = card + ".png"
        }

        new_image_element.src = "./images/cards/" + image_name
        new_image_element.className = "card_image"
        let players_card_node = document.getElementById("cards_" + player)
        players_card_node.appendChild(new_image_element)
        console.log(players_card_node)

        gameData["playerData"][player]["cards"].push(card)
    }

}

function noMoreCards(player) {
    document.getElementById(player + "_controls").style.display="none"
    bankTurn()
}

function bankTurn() {
    /* 1) Calculate points of all players including self */
    let points = {}
    for(let player of gameData["playerList"]) {
        console.log("Player:", player, "Cards:", gameData["playerData"][player]["cards"])
        points[player] = 0
        for(let card of gameData["playerData"][player]["cards"]) {
            let valuePart = card.slice(0, -1);
            let value = gameData["cardValueMapping"][valuePart]
            points[player] += value
        }
    }
    /* 2) Make decision whether to draw another cards or finish game */
    /* 3.1) Draw card and start again at 1) */
    /* 3.2) Call final function */
}