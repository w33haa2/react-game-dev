import React from 'react'
import ms from 'pretty-ms'
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: {},
            p1: 0,
            p2: 0,
            p1Select: "",
            p2Select: "",
            gameStatus: {
                p1: false,
                p2: false,
            },
            isIdle: true,
            cardSets: ['ROCK','PAPER','SCISSOR','MINES'],
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
        if (this.state.time.s  > 0 && this.state.isIdle === false) {
            this.setState({p1Select: e.currentTarget.textContent})
        }
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
        })
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
            let rand1 = this.state.cardSets[Math.floor(Math.random() * this.state.cardSets.length)]
            let rand2 = this.state.cardSets[Math.floor(Math.random() * this.state.cardSets.length)]
            let blessedRNG1 = Math.random() * 100
            let blessedRNG2 = Math.random() * 100
            if(this.state.p1Select === "") {
                this.setState({p1Select: rand1})
            }
            if(blessedRNG1 <= 30) {
                this.setState({p1Select: "MINES"})
            }
            if (blessedRNG2  <= 30) {
                this.setState({p2Select: "MINES"})
            }
            this.setState({p2Select: rand2})
            clearInterval(this.timer)
            this.evaluateScore(this.compare(this.state.p1Select,this.state.p2Select))
        }
    }

    evaluateScore({p1, p2}) {
        let score1 = this.state.p1
        let score2 = this.state.p2
        if(p1 && !p2) {
            if(this.state.p2Select === 'MINES') {
                this.setState({
                    p1: score1 + 1,
                    p2: score2 - 1
                })
            }
            else {
                this.setState({
                    p1: score1 + 1,
                })
            }
        }
        else if (p2 && !p1) {
            if(this.state.p1Select === 'MINES') {
                this.setState({
                    p2: score2 + 1,
                    p1: score1 - 1
                })
            }
            else {
                this.setState({
                    p2: score2 + 1,
                })
            }
        }
        else if (!p1 && !p2) {
            if(this.state.p1Select === 'MINES' && this.state.p2Select === 'MINES') {
                this.setState({
                    p2: score2 - 1,
                    p1: score1 - 1
                })
            }
        }
        this.setState({
            gameStatus: {
                p1: p1,
                p2: p2,
            },
            seconds: 5,
            isIdle: true,
        })
        setTimeout(() => {
            this.setState({
                p1Select: "",
                p2Select: "",
            })
            this.timer = 0
            this.startTimer()
        }, 4000);
    }

    compare (p1,p2) {

        if(p1 === p2) {
            return {
                p1: false,
                p2: false
            }
        }
        if (p1 === 'ROCK') {
            if (p2 === 'SCISSOR') {
                return {
                    p1: true,
                    p2: false
                }
            }
            else if (p2 === 'PAPER') {
                return {
                    p1: false,
                    p2: true
                }
            }
            else {
                return {
                    p1: true,
                    p2: false
                }
            }
        }

        if(p1 === 'PAPER') {
            if(p2 === 'ROCK') {
                return {
                    p1: true,
                    p2: false
                }
            }
            else if (p2 === 'SCISSOR') {
                return {
                    p1: false,
                    p2: true
                }
            }
            else {
                return {
                    p1: true,
                    p2: false
                }
            }
        }

        if (p1 === 'SCISSOR') {
            if (p2 === 'PAPER') {
                return {
                    p1: true,
                    p2: false
                }
            }
            else if (p2 === 'ROCK') {
                return {
                    p1: false,
                    p2: true
                }
            }
            else {
                return {
                    p1: true,
                    p2: false
                }
            }
        }

        if (p1 === 'MINES') {
            if(p2 === 'MINES') {
                return {
                    p1: false,
                    p2: false
                }
            }
            else {
                return {
                    p1: false,
                    p2: true
                }
            }
        }

    }

    render() {
        let gameState;
        if (this.state.isIdle) {
            gameState =
            <tr>
                <th className="text-center game-title">{ this.state.gameStatus.p1 ? 'WIN' : 'LOSE' }</th>
                <th className="text-center game-title">{ this.state.gameStatus.p2 ? 'WIN' : 'LOSE' }</th>
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
                            <td className="text-center bdr game-title" >{ this.state.p1Select ? this.state.p1Select :
                            '- -'}</td>
                            <td className="text-center bdr game-title" >{ this.state.p2Select ? this.state.p2Select :
                                '- -'}</td>
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