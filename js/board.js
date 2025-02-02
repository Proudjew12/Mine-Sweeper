'use strict'

var FLOOR = '🔲'


function buildBoard() {
    const size = gLevel.SIZE
    const board = []

    for (let i = 0; i < size; i++) {
        board.push([])
        for (let j = 0; j < size; j++) {
            board[i][j] = FLOOR
        }
    }
    board[1][1] = BOMB
    board[1][2] = BOMB


    // for (let i = 0; i < gLevel.MINES; i++) {

    //     var randI = getRandomInt(0, size)
    //     var randJ = getRandomInt(0, size)
    //     board[randI][randJ] = BOMB

    // }

    return board
}

function renderBoard(board) {

    var strHTML = '<table><tbody>'

    for (let i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (let j = 0; j < board[0].length; j++) {

            const className = getClassName({ i, j })



            strHTML += `<td 
            class="${className}" 
            onclick="onCellClicked(this, ${i}, ${j})"
            oncontextmenu="onCellMarked(this, ${i}, ${j}); return false;"
            >${FLOOR}</td>`

        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    var elBoard = document.querySelector('.board-container')
    elBoard.innerHTML = strHTML
}