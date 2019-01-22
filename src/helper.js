export const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'lightblue',
  'darkblue',
  'purple',
  'pink'
];

 export const populateBoxes = () => {
      const boxesArray = [];
      const shuffledArray = shuffle([...colors, ...colors]);
      shuffledArray.forEach((color, i) => {
          boxesArray.push ({
              color,
              displayColor: '#999',
              guessed: false,
              isAwaiting: false
          });
      });
    return boxesArray;
  };
  
 export const shuffle = (array) => {
    let currentIndex = array.length;
      let temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };