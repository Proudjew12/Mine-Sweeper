'use strict'

var FLOOR = '🔲'

function buildBoard() {
    const size = 4
    const board = []

    for (let i = 0; i < size; i++) {
        board.push([])
        for (let j = 0; j < size; j++) {
            board[i][j] = FLOOR
        }
    }
    board[1][1] = BOMB
    board[1][2] = BOMB
    return board
}

function renderBoard(board) {

    var strHTML = '<table><tbody>'

    for (let i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (let j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = getClassName({ i, j })

            var cellContent = ''
            if (cell === BOMB) {
                cellContent = BOMB
            } else if (cell === FLOOR) {
                cellContent = FLOOR
            } else {
                cellContent = cell
            }

            strHTML += `<td class="${className}">${cellContent}</td>`

        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    var elBoard = document.querySelector('.board-container')
    elBoard.innerHTML = strHTML
}