import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Box from './Box';

export class BoxList extends Component {
  static propTypes = {
    boxes: PropTypes.arrayOf (
      PropTypes.shape ({
        color: PropTypes.string.isRequired,
        displayColor: PropTypes.string.isRequired,
        guessed: PropTypes.bool.isRequired,
        isAwaiting: PropTypes.bool.isRequired
      })
    ).isRequired,
    onBoxClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    boxes: [{id: 1, color: 'red'}],
  };

  render () {
    const {boxes} = this.props;
    return boxes.map ((box, i) => (
      <Box
        onBoxClick={this.props.onBoxClick}
        key={i}
        boxColor={box.displayColor}
        index={i}
        testColor={box.color}
      />
    ));
  }
}

export default BoxList;
