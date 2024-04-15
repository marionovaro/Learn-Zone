class Game {
  constructor(height = 6, width = 7, board = [], currentPlayer = 1) {
    this.height = height;
    this.width = width;
    this.board = board;
    this.currentPlayer = currentPlayer;
  }

  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      const emptyRow = Array.from({length: this.width}).fill(null); //? estamos repitiendo esto (creación de una fila) 5 veces, es decir, creando un tablero 5x6
      this.board.push(emptyRow)
    }
  }

  makeHtmlBoard() {
    const htmlBoard = document.getElementById("board");

    const top = document.createElement("tr"); //? creando un tag HTML ("tr" es una row of cells) (fila superior donde estaran los botones para que caigan las fichas)
    top.setAttribute("id", "column-top"); //? le estamos dando un id al tag HTML

    for (let x = 0; x < this.width; x++) { //? vamos a crear tantos botones como celdas hayan de anchura obviamente
      const headCell = document.createElement("td"); //? creando un tag HTML ("td" es una cell of data) (vienen a ser los botones donde pulsaremos)
      headCell.setAttribute("id", `top-${x}`);
      headCell.addEventListener("click", handleClick); //? evento de click (caerá la ficha)
      top.append(headCell) //? metemos estos botones creados dentro de la fila superior
    }
    htmlBoard.append(top);

    for (let y = 0; y > this.height; y++) { //? aqui vamos a crear la tabla como tal
      const row = document.createElement("tr"); //? creación de cada row

      for (let x = 0; x < this.width; x++) { //? un 2o loop para crear las celdas dentro de cada fila creada
        const cell = document.createElement("td");
        cell.setAttribute("id", `c-${y}-${x}`); //? en el id ponemos la columna (y) como la fila (x)
        row.append(cell); //? metemos una por una las 6 celdas que hay por columna (como es append, la mete al final por lo que empezamos por x=0, x=1, x=2... y las va anadiendo al final como hace el push con los arrays)
      }
      htmlBoard.append(row) //? el append igual que la linea anterior, va añadiendo las columnas con sus celdas ya metidas (va de 0 a 5 de arriba para abajo, el 0 está arriba)
    }
  }

  findSpotForCol(x) { //! FIND THE LOWEST EMPTY CELL IN COLUMN CLICKED
    for (let y = this.height - 1; y >= 0; y -1) { //? tenemos que repasar todas las celdas de la columna que clickemos, empezando por abajo (height: 5) y ver cual es la primera vacía
      if (board[y][x] === null) {
        return y //? esta y es la 1a posición en la columna x (la que hemos clickado) vacía que hemos encontrado
      }
    }
    return null; //? si habiendo repasado todo, ninguna esta vacía devolvemos null
  }

  placeInTable(y, x) { //! UPDATE DOM TO PLACE PIECE IN TABLE
    const piece = document.createElement("div"); //? creamos un div que va a hacer de pieza
    piece.classList.add("piece"); //? le añadimos la clase "piece"
    piece.classList.add(`p${this.currentPlayer}`); //? otra clase diciendo qué jugador la ha puesto

    const spot = document.getElementById(`c-${y}-${x}`) //? usando el id que antes hemos dado a todas las celdas situamos la celda que hemos encontrado con findSpotForCol()
    spot.append(piece)
  }

  endGame(msg) { //! ANNOUNCE GAME END
    alert(msg);
  }

  checkForWin() {
    function _win(cells) {
      return cells.every(
        ([y, x]) => 
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          board[y][x] === this.currentPlayer
        );
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) { //? hacindo el doble loop estamos repasando toda la tabla (cada fila y cada casilla de cada fila)
        const horizontal = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //? para cada celda se revisan todas estas formas de ganar
        const vertical = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y - 1, x - 1], [y - 2, x - 2], [y - 3, x - 3]];

        if (_win(horizontal) || _win(vertical) || _win(diagDR) || _win(diagDL)) { //? si encontramos alguna posibilidad de victoria que se da mandamos un true, es decir, sí que hay un ganador
          return true;
        }
      }
    }
    return false; //? si no ha devuelto nada es que no ha encontrado ganador por lo tanto false
  }

  handleClick() {
    const x = Number(evt.target.id.slice("top-".length)) //? sacamos la posición x de la celda a través del ID que le hemos dado a las celdas superiores
    const y = this.findSpotForCol(x) //? aquí la propia función que hemos creado nos da la y mas baja para poner la ficha de la columan que hemos clickado (const x)
    if (y === null) { //? si no hay spot, se ignora el click
      return;
    }

    this.board[y][x] = this.currentPlayer;
    this.placeInTable(y, x); //? ahora que ya sabemos cual es la posición a poner la ficha, la ponermos con la funcion que creamos antes

    if (this.checkForWin()) { //? checkeamos si alguien ha ganado en cada click y si es así mandamos mensaje
      return this.endGame(`Player ${this.currentPlayer} won!`)
    }

    if (board[0].every(cell => cell != null)) { //? hacemos un every en el array de board y si vemos que ninguna celda está vacía es que hay un empate
      return this.endGame("Tie!")
    }

    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }

  start() {
    this.makeBoard()
    this.makeHtmlBoard()
  }
}

new Game()