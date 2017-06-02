import React, { Component } from 'react'
import classNames from 'classnames'

class Button extends Component {

  render () {
    var btnClass = classNames({
      'btn': true,
      'btn-primary': !this.props.isDisabled,
      'btn-disabled': this.props.isDisabled
    });
    return <button className={btnClass} disabled={this.props.isDisabled}>{this.props.label}</button>;
  }
}

export default Button;
