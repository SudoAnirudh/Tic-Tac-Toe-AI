import State from './State'

export default class Game {

  constructor(start="X") {
    this.currentState = new State();

    this.currentState.board = ["E", "E", "E",
                               "E", "E", "E",
                               "E", "E", "E"];

    this.currentState.turn = start;
  }
  placeNext(pos) {
    this.currentState.board[pos] = this.currentState.turn
    this.currentState.moves++
this.currentState.advanceTurn()
    this.currentState.ended()
  }
};