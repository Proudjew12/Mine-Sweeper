'use strict'


var gBoard = {

    minesAroundCount: 4,
    isCovered: true,
    isMine: false,
    isMarked: false

}

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    coveredCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function onInit() {
    gBoard = buildBoard()
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)

    console.table(gBoard)

}



function setMinesNegsCount(board) {

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === BOMB) continue

            board[i][j] = minesAroundCount(board, i, j)
        }
    }

}

function minesAroundCount(board, rowIdx, colIdx) {

    let mineCount = 0

    for (let i = rowIdx - 1; i <= rowIdx + 1; i++) {
        for (let j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i < 0 || i >= board.length || j < 0 || j >= board[0].length ||
                i === rowIdx && j === colIdx) {
                continue
            }

            if (board[i][j] === BOMB) mineCount++
        }
    }
    return mineCount
}







function onCellClicked(elCell, i, j) {

    if (!gGame.isOn) return

    const cell = gBoard[i][j]

    if (!cell.isCovered || cell.isMarked) return

    cell.isCovered = false

    elCell.innerHTML = cell.isMIne ? BOMB : cell.minesAroundCount || FLOOR



}

function onCellMarked(elCell) {


}

function checkGameOver() {


}

function expandUncover(board, elCell, i, j) {


}