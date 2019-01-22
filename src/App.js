import React, {Component} from 'react';
import './App.css';

import BoxList from './components/BoxList';
import {populateBoxes} from './helper';

class App extends Component {
  constructor (props) {
    super (props);

    this.state = {
      boxes: populateBoxes (),
      clickedBox: null,
      pause: false,
      youWon: 'hidden',
    };

    this.onBoxClick = this.onBoxClick.bind (this);
    this.setColor = this.setColor.bind (this);
    this.setColorLater = this.setColorLater.bind (this);
    this.setGuessed = this.setGuessed.bind (this);
    this.setBoxAwaiting = this.setBoxAwaiting.bind (this);
    this.handleOnNewGame = this.handleOnNewGame.bind (this);
  }

  onBoxClick (index) {
    if (!this.state.pause) {
      // Start code
      const box = this.state.boxes[index];
      if (!box.isAwaiting) {
        if (!box.guessed) {
          if (!this.state.clickedBox) {
            this.setState ({
              clickedBox: {
                index,
                box,
              },
            });
            this.setBoxAwaiting ([index], true);
            this.setColor (index, true);
          } else {
            if (this.state.clickedBox.box.color === box.color) {
              this.setColor (index, true);
              this.setGuessed ([index, this.state.clickedBox.index], true);
              this.setState ({clickedBox: null});
            } else {
              this.setColor (index, true);
              this.setBoxAwaiting ([index, this.state.clickedBox.index], false);
              // later...
              this.setState ({pause: true});
              this.setColorLater (index, false) ();
              this.setColorLater (this.state.clickedBox.index, false) ();
              this.setState ({clickedBox: null});
            }
          }
        }

        const guessed = this.state.boxes.filter (b => b.guessed);
        if (guessed.length === this.state.boxes.length) {
          console.log ('you WON!!');
          this.setState ({pause: true});
          this.setState({youWon: 'you-won'})
          setTimeout (() => {
              this.setState({youWon: 'hidden'});
          }, 3000);
        }
      } // if not awaiting
    } // if pause
  }

  setColor (index, val) {
    const boxes = [...this.state.boxes];
    let color = val ? boxes[index].color : '#999';
    boxes[index].displayColor = color;
    this.setState ({boxes});
  }

  setColorLater (i, val) {
    const index = i;
    const value = val;
    return () => {
      setTimeout (() => {
        this.setColor (index, value);
        this.setState ({pause: false});
      }, 300);
    };
  }

  setGuessed (arrayOfIndexes, val) {
    const boxes = [...this.state.boxes];
    arrayOfIndexes.forEach (index => (boxes[index].guessed = val));
    this.setState ({boxes});
  }

  setBoxAwaiting (arrayOfIndexes, val) {
    const boxes = [...this.state.boxes];
    arrayOfIndexes.forEach (index => (boxes[index].isAwaiting = val));
    this.setState ({boxes});
  }

  handleOnNewGame () {
    const boxes = [...this.state.boxes].map (box => {
      box.displayColor = '#999';
      box.guessed = false;
      box.isAwaiting = false;
      return box;
    });
    this.setState ({
      boxes,
      clickedBox: null,
      pause: false,
    });
  }

  render () {
    return (
      <div className="App">
        <h1>Memory Game</h1>
        <button onClick={this.handleOnNewGame}>
          <i className="fas fa-gamepad" /> New Game
        </button>
        <div className="container">
          <BoxList onBoxClick={this.onBoxClick} boxes={this.state.boxes} />
        </div>
        <span className={this.state.youWon}>
          You Won!!<span className="emojies">😃👏🎉🎊</span>
        </span>
      </div>
    );
  }
}

export default App;
