import React from 'react'
import Instructions from '../Instructions'
import logo from '../../images/gametitle.png'

class GameMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instructionState: false,
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState({instructionState: true})
    }
    render() {
        let instructionButton;
        if (!this.state.instructionState) {
            instructionButton =
            <div className="row">
                <div className="col-md-12" style={{marginBottom: "-31px"}}>
                <img src={logo} style={{height:"91%"}}   alt="t e c h i e s g a m e t i t l e"/>
                </div>
                <div className="col-md-4" style={{position: "relative", bottom:"40px"}}>
                    <button onClick={this.handleChange}  className="btn title-font btn-lg btn-warning">Instructions</button>
                </div>
                <div className="col-md-4" style={{position: "relative", bottom:"40px"}}>
                    <button onClick={this.handleChange}  className="btn title-font btn-lg btn-warning">Start Game</button>
                </div>
                <div className="col-md-4" style={{position: "relative", bottom:"40px"}}>
                    <button onClick={this.handleChange}  className="btn title-font btn-lg btn-warning">Exit</button>
                </div>

            </div>
        }
        else {
            instructionButton =
            <div >
                <Instructions/>
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