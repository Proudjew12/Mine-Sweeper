'use strict'

const BOMB = '💣'

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



    const cell = gBoard[i][j]

    if (elCell.innerHTML !== FLOOR) return

    if (cell === BOMB) {
        elCell.innerHTML = BOMB
        setTimeout(() => checkGameOver(i, j), 100)
    } else {
        const minesAround = minesAroundCount(gBoard, i, j)
        gBoard[i][j] = minesAround
        elCell.innerHTML = minesAround === 0 ? '🌫️' : minesAround

        if (minesAround === 0) {
            expandUncover(gBoard, elCell, i, j)
        }
    }
    elCell.onclick = null
}

function onCellMarked(elCell, i, j) {

    console.log(`Right-click triggered on cell ${i} ${j}`);


    if (gBoard[i][j] !== FLOOR) return

    if (elCell.innerHTML === FLOOR) {
        elCell.innerHTML = '🚩'
        gBoard[i][j] = '🚩'
        gGame.markedCount++
    }
    else if (elCell.innerHTML === '🚩') {
        elCell.innerHTML = FLOOR
        gBoard[i][j] = FLOOR
        gGame.markedCount--
    }
}

function checkGameOver(i, j) {

    if (gBoard[i][j] === BOMB) {

        alert('Game Over')
        onInit()
    }
}

function expandUncover(board, elCell, i, j) {

    if (i < 0 || i >= board.length ||
        j < 0 || j >= board[0].length ||
        elCell.innerHTML !== '🔲'
    ) return

    const minesAround = minesAroundCount(board, i, j)

    elCell.innerHTML = minesAround === 0 ? '🌫️' : minesAround

    if (minesAround === 0) {
        for (let row = -1; row <= 1; row++) {
            for (let col = -1; col <= 1; col++) {
                if (row === 0 && col === 0) continue

                const closeRow = i + row
                const closeCol = j + col

                if (closeRow < 0 || closeRow >= board.length ||
                    closeCol < 0 || closeCol >= board[0].length)
                    continue

                const closeCell = document.querySelector(`.cell-${closeRow}-${closeCol}`)
                expandUncover(board, closeCell, closeRow, closeCol)
            }
        }
    }
}