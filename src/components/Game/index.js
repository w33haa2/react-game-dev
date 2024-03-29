import React from 'react'
import rock from '../../images/rock.png'
import paper from '../../images/paper.png'
import mines from '../../images/mines.png'
import scissors from '../../images/scissors.jpg'

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
            cardOfTheRound: '',
            prevCard: '',
            tempCard: '',
            seconds: 5
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.selectCard = this.selectCard.bind(this);
        this.selectCard2 = this.selectCard2.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    /**
     * Checks the state on which side wins
     * @returns {boolean}
     */
    checkWhoWins() {
        return this.state.p1 >= 5  || this.state.p2 >= 5
    }

    /**
     * Selects the card of the player 1
     * @param e
     */
    selectCard(e) {
        if (this.state.time.s  > 0 && this.state.isIdle === false) {
            this.setState({
                prevCard: '',
                p1Select: e})
        }
    }

    /**
     * Selects card of the round for player 1
     * @param e
     */
    selectCard2(e) {
        if (this.state.time.s  > 0 && this.state.isIdle === false) {
            this.setState({
                prevCard: e,
                p1Select: e})
        }
    }

    /**
     * Computes the remaining time in countdown
     * @param secs
     * @returns {{s: number, h: number, m: number}}
     */
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

    /**
     * Checks if component mounted
     */
    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }

    /**
     * Starts the timer
     */
    startTimer() {
        this.setState({
            isIdle: false,
        })
        if (this.timer == 0 && this.state.seconds > 0) {
            this.selectCardOfTheRound()
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    /**
     * Picks a random card (except for mines) as card of the round
     */
    selectCardOfTheRound() {
        let noMinesPls = this.state.cardSets.filter(x => x !== 'MINES')
       this.setState({
           cardOfTheRound: noMinesPls[Math.floor(Math.random() * 3)]
       })
    }

    /**
     * Renders countdown
     */
    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds == 0) {
            let rand2 = this.state.cardSets[Math.floor(Math.random() * this.state.cardSets.length)]
            let blessedRNG1 = Math.random() * 100
            let cardOfTheRoundRNG = Math.random() * 100
            let blessedRNG2 = Math.random() * 100
            let prev = this.state.p1Select
            if(this.state.p1Select !== "") {
                if (this.state.cardOfTheRound !== this.state.p1Select) {
                    if (blessedRNG1 <= 30) {
                        /**
                         * Psuedo Random Number Generator for Normal Cards P1
                         * 50% chance to execute
                         */
                        this.setState({
                            prevCard: prev,
                            p1Select: "MINES"
                        })

                    }
                } else {
                    /**
                     * Psuedo Random Number Generator for the Card of the Round
                     * 50% chance to execute
                     */
                    if (cardOfTheRoundRNG <= 50) {
                        this.setState({p1Select: "MINES"})
                    }
                }
                if (blessedRNG2 <= 30) {
                    /**
                     * Psuedo Random Number Generator for Normal Cards P2
                     * 50% chance to execute
                     */
                    this.setState({p2Select: "MINES"})
                }
                this.setState({p2Select: rand2})
            }
            clearInterval(this.timer)
            if(this.state.p1Select === "") {
                // this.setState({p1Select: rand1})
                this.evaluateScore({
                    p1: false,
                    p2: true
                })
            }
            if(this.state.p1Select !== "") {
                this.evaluateScore(this.compare(this.state.p1Select, this.state.p2Select))
            }
        }
    }

    /**
     * Evaluates the score of the players
     * @param p1
     * @param p2
     */
    evaluateScore({p1, p2}) {
        let score1 = this.state.p1
        let score2 = this.state.p2
        if(p1 && !p2) {
            if(this.state.p2Select === 'MINES') {
                this.setState({
                    p1: this.state.prevCard === this.state.cardOfTheRound ?
                         score1 + 2 : score1 + 1,
                    p2: score2 - 1
                })
            }
            else {
                this.setState({
                    p1: this.state.prevCard === this.state.cardOfTheRound ?
                        score1 + 2 : score1 + 1,
                })
            }
        }
         if (p2 && !p1) {
            if(this.state.p1Select === 'MINES') {
                this.setState({
                    p2: score2 + 1,
                    p1: this.state.prevCard === this.state.cardOfTheRound ?
                        score1 - 2 : score1 - 1
                })
            }
             if(this.state.prevCard === this.state.cardOfTheRound) {
                 this.setState({
                     p1: score1 - 2,
                 })
             }
            else {
                this.setState({
                    p2: score2 + 1,
                })
            }
        }
        if (!p1 && !p2) {
            if(this.state.prevCard === 'MINES' && this.state.p2Select === 'MINES') {
                this.setState({
                    p2: score2 - 1,
                    p1: this.state.prevCard === this.state.cardOfTheRound ?
                        score1 - 2 : score1 - 1
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
        if(!this.checkWhoWins()) {
            setTimeout(() => {
                this.setState({
                    p1Select: "",
                    p2Select: "",
                    prev: "",
                })
                this.timer = 0
                this.startTimer()
            }, 4000);
        }
    }
    /**
     *  Compare the selection of the players
     * @param p1
     * @param p2
     * @returns {{p1: boolean, p2: boolean}}
     */
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
        /**
         * Conditional render for  Player Status
         */
        let gameState;
        if (this.state.isIdle) {
            gameState =
            <tr>
                <th className="noselect text-center game-title">{ this.state.gameStatus.p1 ? 'WIN' : 'LOSE' }</th>
                <th className="noselect text-center game-title">{ this.state.gameStatus.p2 ? 'WIN' : 'LOSE' }</th>
            </tr>
        }
        else {
            gameState =
                <tr>
                    <th className="text-center game-title">-</th>
                    <th className="text-center game-title">-</th>
                </tr>
        }
        let timerPanel
        /**
         * Conditional Render for Timer and Winner's Panel
         */
        if(this.checkWhoWins()) {
            timerPanel =
                <span    className="btn title-font btn-lg btn-warning p-1"> {this.state.p1 >= 5
                    ? 'PLAYER 1 WINS' : 'THE AI WINS LMAO XD'}</span>
        }
        else {
            timerPanel = <span    className="btn title-font btn-lg btn-warning p-1"> {this.state.time.s != 0
                ? this.state.time.s : 'STOP!'}</span>

        }
        let cardOfTheRoundPic
        /**
         * Conditional Render for card of the round picture
         */
        if(this.state.cardOfTheRound === 'ROCK') {
            cardOfTheRoundPic =
                <td onClick={ () =>this.selectCard2(this.state.cardOfTheRound )} className="noselect text-center bdr btn-danger game-title">
                    <img width={140} src={rock}/>
                </td>
        }
        else if (this.state.cardOfTheRound === 'PAPER') {
            cardOfTheRoundPic =
                <td onClick={() => this.selectCard2(this.state.cardOfTheRound )} className="noselect text-center bdr btn-danger game-title">
                    <img width={105} src={paper}/>
                </td>
        }
        else if (this.state.cardOfTheRound === 'SCISSOR') {
            cardOfTheRoundPic =
                <td onClick={ () => this.selectCard2(this.state.cardOfTheRound )} className="noselect text-center bdr btn-danger game-title">
                    <img width={105} src={scissors}/>
                </td>
        }
        else {
            cardOfTheRoundPic =
            <td onClick={this.selectCard2} className="noselect text-center bdr btn-danger game-title">
                ???
            </td>
        }
        let playerSelect1
        /**
         * Conditional Render for card of the round picture p1 select
         */
        if(this.state.p1Select === 'ROCK') {
            playerSelect1 =
            <td className="noselect text-center bdr game-title" >
                    <img width={140} src={rock}/>
            </td>
        }
        else if (this.state.p1Select === 'PAPER') {
            playerSelect1 =
                <td className="noselect text-center bdr game-title" >
                    <img width={105} src={paper}/>
                </td>
        }
        else if (this.state.p1Select === 'SCISSOR') {
            playerSelect1 =
                <td className="noselect text-center bdr game-title" >
                    <img width={105} src={scissors}/>
                </td>
        }
        else if (this.state.p1Select === 'MINES') {
            playerSelect1 =
                <td className="noselect text-center bdr game-title" >
                    <img width={105} src={mines}/>
                </td>
        }
        else {
            playerSelect1 =
                <td className="noselect text-center bdr game-title" >
                    - -
                </td>
        }
        let playerSelect2
        /**
         * Conditional Render for card of the round picture p1 select
         */
        if(this.state.p2Select === 'ROCK') {
            playerSelect2 =
                <td className="noselect text-center bdr game-title" >
                    <img width={140} src={rock}/>
                </td>
        }
        else if (this.state.p2Select === 'PAPER') {
            playerSelect2 =
                <td className="noselect text-center bdr game-title" >
                    <img width={105} src={paper}/>
                </td>
        }
        else if (this.state.p2Select === 'SCISSOR') {
            playerSelect2 =
                <td className="noselect text-center bdr game-title" >
                    <img width={105} src={scissors}/>
                </td>
        }
        else if (this.state.p2Select === 'MINES') {
            playerSelect2 =
                <td className="noselect text-center bdr game-title" >
                    <img width={105} src={mines}/>
                </td>
        }
        else {
            playerSelect2 =
                <td className="noselect text-center bdr game-title" >
                    - -
                </td>
        }
        return (
            <div className="card vertical-center">
                <div className="card-body">
                    {timerPanel}
                    <table style={{height:"600px",width:"600px", textAlign:"center"}} className=" table-bordered">
                        <thead>
                        <tr style={{height:"100px", textAlign:"center"}}>
                            <th className="noselect text-center bdr game-title"><h1>{ this.state.p1 }</h1></th>
                            <th className="noselect text-center bdr game-title"><h1>{ this.state.p2 }</h1></th>
                        </tr>
                       { gameState }
                        </thead>
                        <tbody>
                        <tr style={{height:"70%", textAlign:"center"}}>
                            {playerSelect1}
                            {playerSelect2}
                        </tr>
                        <tr >
                            <td onClick={() => this.selectCard('ROCK')}  className="noselect btn-primary   bdr text-center game-title">
                                <img width={140} src={rock}/>
                            </td>
                            <td onClick={() => this.selectCard('PAPER')} className="noselect btn-warning bdr text-center game-title">
                                <img width={105} src={paper}/>
                            </td>
                        </tr>
                        <tr>
                            <td onClick={() => this.selectCard('SCISSOR')} className="noselect text-center bdr btn-success game-title">
                                <img width={105} src={scissors}/>
                            </td>
                            {cardOfTheRoundPic}
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