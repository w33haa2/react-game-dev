import React from 'react'
class Game extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="card vertical-center">
                <div className="card-body">
                    <span    className="btn title-font btn-lg btn-warning p-1">05.000</span>
                    <table style={{height:"600px",width:"600px", textAlign:"center"}} className=" table-bordered">
                        <thead>
                        <tr style={{height:"100px", textAlign:"center"}}>
                            <th className="text-center game-title"><h1>0</h1></th>
                            <th className="text-center game-title"><h1>0</h1></th>
                        </tr>
                        <tr>
                            <th className="text-center game-title">WIN</th>
                            <th className="text-center game-title">LOST</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr style={{height:"70%", textAlign:"center"}}>
                            <td className="text-center game-title" >ROCK</td>
                            <td className="text-center game-title" >PAPER</td>
                        </tr>
                        <tr>
                            <td className="text-center game-title">ROCK</td>
                            <td className="text-center game-title">PAPER</td>

                        </tr>
                        <tr>
                            <td className="text-center game-title">SCISSOR</td>
                            <td className="text-center game-title">SCISSOR</td>
                        </tr>
                        </tbody>
                    </table>
                    <br/>
                    <div className="row " >
                        <div class="col-md-6">
                        <button onClick={this.props.toggle}  className="btn title-font btn-lg btn-warning">Start</button>
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