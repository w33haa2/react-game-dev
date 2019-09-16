import React from 'react'
import Instructions from '../Instructions'
import Game from '../Game'
import logo from '../../images/gametitle.png'

class GameMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instructionState: false,
            gameState: false,
            menuState: true,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleStartGame = this.handleStartGame.bind(this)
    }
    handleChange(event) {
        this.setState({
            instructionState: !this.state.instructionState,
            menuState: !this.state.menuState,
        })
    }
    handleStartGame(event) {
        this.setState({
            gameState: !this.state.gameState,
            menuState: !this.state.menuState,
        })
    }
    render() {
        let instructionButton;
        if (this.state.menuState) {
            instructionButton =
            <div className="">
                <div className="col-md-12 mh-100" >
                <img className="img-fluid" src={logo} style={{height:"100%"}}   alt="t e c h i e s g a m e t i t l e"/>
                </div>
                <div className="row">
                <div className="col-md-4" >
                    <button onClick={this.handleChange}  className="btn title-font btn-lg btn-warning">Instructions</button>
                </div>
                <div className="col-md-4" >
                    <button onClick={this.handleStartGame}  className="btn title-font btn-lg btn-warning">Start Game</button>
                </div>
                <div className="col-md-4" >
                    <button onClick={this.handleChange}  className="btn title-font btn-lg btn-warning">Exit</button>
                </div>
                </div>
            </div>
        }
        else if(this.state.gameState && !this.state.menuState) {
            instructionButton =
                <div >
                    <Game toggle={this.handleChange} />
                </div>
        }
        else if(this.state.instructionState && !this.state.menuState) {
            instructionButton =
            <div >
                <Instructions toggle={this.handleChange} />
            </div>
        }
        return (
            <div className="container">
                {instructionButton}
            </div>
        )
    }
}
export default GameMenu