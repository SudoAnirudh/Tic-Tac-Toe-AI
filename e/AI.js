import State from './State'
import Game from './Game'


class AIAction {
  constructor(pos) {
    this.movePosition = pos;
    this.score = 0;
  }

  applyTo(state) {
            var next = new State(state);
    
        next.board[this.movePosition] = state.turn;
            next.moves++;

        next.advanceTurn();

        return next;
  }
}

function asc(fa, sa) {
    if(fa.score < sa.score)
        return -1;
    else if(fa.score > sa.score)
        return 1;
    else
        return 0; 
}

function desc(fa, sa) {
    if(fa.score > sa.score)
        return -1; 
    else if(fa.score < sa.score)
        return 1;
    else
        return 0;
}
  function score(_state) {
    if(_state.result === "X-won"){
        
        return 10 - _state.moves;
    }
    else if(_state.result === "O-won") {
     
        return - 10 + _state.moves;
    }
    else {
        return 0;
    }
}
    function minimaxValue(state) {
        if(state.ended()) return score(state);
        else {
            var stateScore;

            if(state.turn === "X")
            // maximise
                stateScore = -1000;
            else
            // minimise
                stateScore = 1000;

            var availablePositions = state.emptyCells();

            var availableNextStates = availablePositions.map(function(pos) {
                var action = new AIAction(pos);
                var nextState = action.applyTo(state);
                return nextState;
            });
            availableNextStates.forEach(function(nextState) {
                var nextScore = minimaxValue(nextState);
                if(state.turn === "X") stateScore = Math.max(stateScore, nextScore)
                else stateScore = Math.min(stateScore, nextScore)
            });

            return stateScore;
        }
    }

export default class AI {
  constructor(game) {
    this.game = game
  }
  play(turn=this.game.currentState.turn) {
            var available = this.game.currentState.emptyCells();

        var availableActions = available.map((pos) => {
            var action =  new AIAction(pos); 
            var next = action.applyTo(this.game.currentState); 

            action.score = minimaxValue(next);

            return action;
        });

        if(turn === "X")
            availableActions.sort(desc);
        else
            availableActions.sort(asc);


        var chosenAction = availableActions[0];
        var next = chosenAction.applyTo(this.game.currentState);
        this.game.currentState = (next);
  }
}