document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');

    // Função para criar o tabuleiro
    function createBoard() {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = 'square ' + ((row + col) % 2 === 0 ? 'white' : 'black');
                board.appendChild(square);
                // Adiciona peças apenas nas linhas 0, 1, 2 para o jogador 1
                // e nas linhas 5, 6, 7 para o jogador 2
                if (row < 3 && (row + col) % 2 === 1) {
                    const piece = document.createElement('div');
                    piece.className = 'piece black-piece';
                    piece.draggable = true;
                    piece.addEventListener('dragstart', onDragStart);
                    square.appendChild(piece);
                } else if (row > 4 && (row + col) % 2 === 1) {
                    const piece = document.createElement('div');
                    piece.className = 'piece white-piece';
                    piece.draggable = true;
                    piece.addEventListener('dragstart', onDragStart);
                    square.appendChild(piece);
                }
            }
        }
    }

    function onDragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.parentElement.dataset.position);
        event.dataTransfer.setData('piece', event.target.className);
    }

    function onDragOver(event) {
        event.preventDefault();
    }

    function onDrop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const pieceClass = event.dataTransfer.getData('piece');
        const targetSquare = event.target;

        // Move a peça para o novo quadrado
        if (targetSquare.className.includes('square')) {
            const piece = document.createElement('div');
            piece.className = pieceClass;
            piece.draggable = true;
            piece.addEventListener('dragstart', onDragStart);
            targetSquare.appendChild(piece);

            // Remove a peça do quadrado original
            const originalSquare = document.querySelector(`.square[data-position="${data}"]`);
            if (originalSquare) {
                originalSquare.innerHTML = '';
            }
        }
    }

    createBoard();
    board.addEventListener('dragover', onDragOver);
    board.addEventListener('drop', onDrop);
});


