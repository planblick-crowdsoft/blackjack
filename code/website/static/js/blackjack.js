const gameData = {}
gameData["startCardsAmount"] = 2
gameData["bankDrawThreshold"] = 6
gameData["colors"] = ["C", "D", "H","S"]
gameData["cardnames"] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
gameData["cardValueMapping"] = {"2": 2, "3":3, "4":4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
                                "10": 10, "J": 10, "Q": 10, "K": 10, "A": 11}
gameData["playerList"] = ["player_1", "bank"]
gameData["playerData"] = {}

function newGame() {
    for(let player of gameData["playerList"]) {
        gameData["playerData"][player] = {"cards":[]}
    }
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
    console.log("PLAYERDATA AFTER NEW GAME:", gameData["playerData"])
}

function drawCard(player, reveal_card=true, amount=1) {
    console.log("DRAWING ", amount, "CARDS FOR PLAYER ", player)
    let i=0
    while(i < amount) {
        i += 1
        let colors = gameData["colors"]
        let values = gameData["cardnames"]
        let color = colors[Math.floor(Math.random() * colors.length)];
        let value = values[Math.floor(Math.random() * values.length)];
        let card = value + color
        gameData["playerData"][player]["cards"].push(card)
        showCard(player, card, reveal_card)
    }

}

function showCard(player, card, reveal_card) {
    let new_image_element = document.createElement("img");
    let image_name = "gray_back.png"
    if (reveal_card) {
        image_name = card + ".png"
    }
    new_image_element.src = "./images/cards/" + image_name
    new_image_element.className = "card_image"
    let players_card_node = document.getElementById("cards_" + player)
    players_card_node.appendChild(new_image_element)

}

function noMoreCards(player) {
    document.getElementById(player + "_controls").style.display="none"
    bankTurn()
}

function revealCards(player) {
    document.getElementById("cards_" + player).innerHTML=""
    for(card of gameData["playerData"][player]["cards"]) {
        showCard(player, card, true)
    }
}

function bankTurn() {
    /* 1) Calculate points of all players including self */
    revealCards("bank")
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
    /* 2) Make decision whether to draw another card or finish game
    *     Compare own points to those of players and count all wins
    *     and loses. If bank would lose to many games AND diff until
    *     blow-up is greater than X -> 3.1 else 3.2*/
    let bankPoints = points["bank"]
    if(bankPoints > 21) {
        alert("Bank blew up with " + bankPoints + " points")
        return;
    }
    delete points["bank"]
    console.log(points)
    let wins = 0
    let loses = 0
    for(let player of gameData["playerList"]) {
        if(points[player]) {
            if(points[player] > bankPoints) {
                loses += 1
            } else {
                wins += 1
            }
        }
    }
    console.log("WINS/LOSES", wins, loses)
    if(wins <= loses) {
        /* 3.1) Draw card and start again at 1) */
        if(21 - bankPoints > gameData["bankDrawThreshold"]) {
            window.setTimeout(function(){
                drawCard("bank")
                bankTurn()
            },1000)

        } else {
            alert("You won! Bank had: " + bankPoints)
        }
    } else {
        /* 3.2) Call final function */
        alert("Bank won with " + bankPoints + "!")
    }


}