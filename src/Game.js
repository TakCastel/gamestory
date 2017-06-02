import React, { Component } from 'react'
import classNames from 'classnames'
import './Game.css'

const Story = require('./story.json').story;

class Game extends Component {

  isDisabled(step) {
    let isDisabled = false

    if (step.modifiers) {
      step.modifiers.map((modifier, i) => {
        if (this.props[modifier.type] + modifier.value < 0) {
          isDisabled = true
        }
        return isDisabled
      })
    }

    return isDisabled
  }

  nextStep(step) {
    var isDisabled = this.isDisabled(step)
    if (!isDisabled) {
      this.props.changePosition(step.id)
    }
  }

  render() {

    const { next, text } = Story[this.props.position];

    return (
      <div className="container">

        <div className="char-grid">
          <p className="char-element">Nom : {this.props.name}</p>
          <p className="char-element">Force : {this.props.strenght}</p>
          <p className="char-element">Santé : {this.props.health}</p>
          <p className="char-element">Pièces d'Or : {this.props.gold}</p>
        </div>

        <div className="text">{text}</div>

        <div className="btn-group">
          {next.map((step, i) => {
            var isDisabled = this.isDisabled(step)
            var btnClass = classNames({
              'btn': true,
              'btn-primary': !isDisabled,
              'btn-disabled': isDisabled
            });

            return (

              <button
                key={i}
                onClick={() => this.nextStep(step)}
                disabled={isDisabled}
                className={btnClass}
              >{step.text}</button>
            )
          })}
        </div>

      </div>
    );
  }
}

export default Game;
