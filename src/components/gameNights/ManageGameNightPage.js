import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import * as gameNightActions from "../../redux/actions/gameNightActions"
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import GameNightForm from "./GameNightForm";
import { newGameNight } from '../../../tools/mockData'
import Spinner from "../common/Spinner";
import { toast } from "react-toastify"

const ManageGameNightPage = ({ gameNights, actions, history, ...props }) => {
    //This is how React Hooks add state to function components
    const [gameNight, setGameNight] = useState({ ...props.gameNight })
    const [errors, setErrors] = useState({ ...props.errors })
    const [saving, setSaving] = useState(false)
    useEffect(() => {
        if (gameNights.length === 0) {
            actions.gameNight.loadAllNights().catch(error => {
                alert("Loading game nights failed " + error)
            })
        } else {
            setGameNight({ ...props.gameNight })
        }
        //useEffect with an empty array is equivalent to componentDidMount
        //Otherwise, would run everytime it renders
    }, [props.gameNight])


    //name identifies the field that's changed
    function handleChange(event) {
        const { name, value } = event.target
        setGameNight(prevGameNight => ({
            ...prevGameNight,
            [name]: value
        }))
    }

    function formIsValid() {
        const { date, options } = gameNight
        const errors = {}

        if (!date) errors.date = "Date is required"
        if (options.length === 0) errors.options = "Options are required"

        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    //One way to redirect, history comes from React Router
    function handleSave(event) {
        event.preventDefault()
        if (!formIsValid()) return
        setSaving(true)
        actions.gameNight.saveGameNight(gameNight).then(() => {
            toast.success("Game night saved.")
            history.push("/gamenights")
        }).catch(error => {
            setSaving(false)
            setErrors({ onSave: error.message })
        })
    }

    return gameNights.length === 0 ? (<Spinner />) : (<GameNightForm gameNight={gameNight} errors={errors} onChange={handleChange} onSave={handleSave} saving={saving}></GameNightForm>)

}

ManageGameNightPage
    .propTypes = {
    gameNight: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    gameNights: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

export function getGameNightById(gameNights, id) {
    return gameNights.find(gameNight => gameNight.id === id) || null
}

function mapStateToProps(state, ownProps) {
    // this is available bc /:slug in App.js
    const slug = ownProps.match.params.slug
    const gameNight = slug && state.gameNights.length > 0 ? getGameNightById(state.gameNights, slug) : newGameNight
    return {
        gameNights: state.gameNight.dates,
        gameNight,
        errors: []
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            gameNight: bindActionCreators(gameNightActions, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageGameNightPage);