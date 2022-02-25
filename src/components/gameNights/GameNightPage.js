import React from "react"
import { connect } from 'react-redux'
import * as gameNightActions from "../../redux/actions/gameNightActions"
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import GameNightPieChart from "./GameNightPieChart"


class GameNightPage extends React.Component {
    componentDidMount() {
        const { gameNight, session, actions } = this.props
        const isAdmin = session.roles.isStaff || session.roles.isDirector
        if (gameNight.dates.length === 0 && session.sessionToken) {
            actions.gameNight.loadAllNights().catch(error => {
                alert("Loading game night dates failed " + error)
            })
        }
        if (gameNight.votes.length === 0 && session.sessionToken && session.roles.isBanker) {
            actions.gameNight.loadAllVotes().catch(error => {
                alert("Loading game night votes failed " + error)
            })
        }
    }

    render() {
        console.log(this.props)
        return (
            <>
                {!this.props.session.sessionToken && <Redirect to="/unauthorized" />}
                {/* TODO: Conditionally render Members instead of accounts, if the current user is a Member */}
                <h2>Game Nights</h2>
                {this.props.gameNight.dates.map(gameNight => {
                    const date = gameNight.get("date")
                    const votes = this.props.gameNight.votes.filter(
                        vote => isSameGameNightDate(date, new Date(vote.get("gameNightDate")))
                    )
                    return <GameNightPieChart key={gameNight.id} title={date} votes={votes}></GameNightPieChart>
                })}
            </>
        )
    }

}

function isSameGameNightDate(gameNightDate, gameNightVoteDate) {
    console.log({gameNightDate, gameNightVoteDate})
    return gameNightDate.getMonth() === gameNightVoteDate.getMonth() && gameNightDate.getDate() === gameNightVoteDate.getDate() && gameNightDate.getYear() === gameNightVoteDate.getYear()
}

//ownProps not need, so it is removed
function mapStateToProps(state) {
    return {
        gameNight: state.gameNight,
        session: state.session,
        loading: state.apiCallsInProgress > 0
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            gameNight: bindActionCreators(gameNightActions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameNightPage);