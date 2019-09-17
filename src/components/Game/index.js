import React from 'react'
import ms from 'pretty-ms'
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: {},
            p1: 0,
            p2: 0,
            gameStatus: false,
            isIdle: true,
            cardSets: ['rock','paper','scissor','mines'],
            cardSelectionForRound: ['rock', 'paper', 'scissor'],
            tempCard: '',
            seconds: 5
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.selectCard = this.selectCard.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    selectCard(e) {
        console.log(e.currentTarget.textContent)
        alert(this.state.cardSelectionForRound.filter((data) => data == e.currentTarget.textContent.toLowerCase() ))
    }
    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }

    startTimer() {
        this.setState({
            isIdle: false,
        });
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds == 0) {
            clearInterval(this.timer);
        }
    }

    render() {
        let gameState;
        if (this.state.isIdle) {
            gameState =
            <tr>
                <th className="text-center game-title">{ !this.state.gameStatus ? 'WIN' : 'LOSE' }</th>
                <th className="text-center game-title">{ this.state.gameStatus ? 'WIN' : 'LOSE' }</th>
            </tr>
        }
        else {
            gameState =
                <tr>
                    <th className="text-center game-title">-</th>
                    <th className="text-center game-title">-</th>
                </tr>
        }

        return (
            <div className="card vertical-center">
                <div className="card-body">
                    <span    className="btn title-font btn-lg btn-warning p-1"> {this.state.time.s != 0 ? this.state.time.s : 'STOP!'}</span>
                    <table style={{height:"600px",width:"600px", textAlign:"center"}} className=" table-bordered">
                        <thead>
                        <tr style={{height:"100px", textAlign:"center"}}>
                            <th className="text-center bdr game-title"><h1>{ this.state.p1 }</h1></th>
                            <th className="text-center bdr game-title"><h1>{ this.state.p2 }</h1></th>
                        </tr>
                       { gameState }
                        </thead>
                        <tbody>
                        <tr style={{height:"70%", textAlign:"center"}}>
                            <td className="text-center bdr game-title" >ROCK</td>
                            <td className="text-center bdr game-title" >PAPER</td>
                        </tr>
                        <tr >
                            <td onClick={this.selectCard} className=" btn-primary   bdr text-center game-title">ROCK</td>
                            <td onClick={this.selectCard} className="btn-warning bdr text-center game-title">PAPER</td>
                        </tr>
                        <tr>
                            <td onClick={this.selectCard} className="text-center bdr btn-success game-title">SCISSOR</td>
                            <td onClick={this.selectCard} className="text-center bdr btn-danger game-title">SCISSOR</td>
                        </tr>
                        </tbody>
                    </table>
                    <br/>
                    <div className="row " >
                        <div class="col-md-6">
                        <button  onClick={this.startTimer} className="btn title-font btn-lg btn-warning">Start</button>
                        </div>
                        <div class="col-md-6">
                        <button onClick={this.props.toggle}  className="btn title-font btn-lg btn-warning">Go Back</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Game