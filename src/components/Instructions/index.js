import React from 'react'
class Instructions extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="card vertical-center">
                <div className="card-body">
                    <h1 className="card-title game-title">Instructions</h1>
                    <div className="col-md-12">
                    <ul className="rules" style={{listStyleType: "disc", textAlign: "left"}}>
                        <li><h3 className="game-title">All cards have a 10% chance in turning into an explosive mine</h3></li>
                        <li><h3 className="game-title">When the card turns into a mine, you lose the round</h3></li>
                        <li><h3 className="game-title">The 4th card is the card of the round in which it doubles the points you gain or lose for the round.</h3></li>
                        <li><h3 className="game-title">The card of the round picks a random card (rock,paper,scissor) as its card of the round.</h3></li>
                        <li><h3 className="game-title">The 4th card has a higher chance of turning into an explosive mine XD.</h3></li>
                        <li><h3 className="game-title">Player who gets to 10 first will win the game.</h3></li>
                    </ul>
                    </div>
                    <div className="bottomdiv " >
                        <button onClick={this.props.toggle}  className="btn title-font btn-lg btn-warning">Go Back</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Instructions