import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Box.css';

export class Box extends Component {
  static propTypes = {
    onBoxClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    boxColor: PropTypes.string.isRequired
  };
  static defaultProps = {
    onBoxClick () {},
  };

  render () {
    const {boxColor, index, onBoxClick} = this.props;
    return (
      <div
        onClick={() => onBoxClick(index)}
        className="box"
        style={{background: boxColor}}
      >
      {this.props.testColor}
      </div>
    );
  }
}

export default Box;
