import React, { Component } from 'react';

const Story = require('./story.json').story;

class Game extends Component {
  render() {
    console.log(this.props)
    const { next, text } = Story[this.props.position];

    return (
      <div>
        <p>Nom : {this.props.name}</p>
        <p>Force : {this.props.strenght}</p>
        <p>Santé : {this.props.health}</p>

        {text}
        <div className="btn-group">
          {next.map((step, i) => {
            return (

                <button className="btn btn-primary" key={i} onClick={() => this.props.changePosition(step.id)}>{step.text}</button>
            )
          })}
        </div>

      </div>
    );
  }
}

export default Game;
