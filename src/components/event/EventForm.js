import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "../game/GameProvider"
import { EventContext } from "./EventProvider"


export const EventForm = props => {
    const [currentEvent, setEvent] = useState({
        organizer: 0,
        description: "",
        date: "",
        time: "",
        gameId: 0
    })
    const { createEvent } = useContext(EventContext)
    const {getGames, games} = useContext(GameContext)

    useEffect(() => {
        getGames()
    }, [])

    const handleControlledInputChange = (event) => {
        const newEventState = Object.assign({}, currentEvent)
        newEventState[event.target.name] = event.target.value
        setEvent(newEventState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={currentEvent.gameId}
                        onChange={handleControlledInputChange}>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>
                                {game.title}
                            </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    const event = {
                        organizer: parseInt(localStorage.getItem("lu_token")),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        gameId: parseInt(currentEvent.gameId)
                    }

                    createEvent(event)
                    .then(props.history.push("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}