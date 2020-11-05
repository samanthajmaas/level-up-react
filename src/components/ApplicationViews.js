import React from "react"
import { Route } from "react-router-dom"
import { EventForm } from "./event/EventForm"
import { EventList } from "./event/EventList"
import { EventProvider } from "./event/EventProvider"
import { GameForm } from "./game/GameForm"
import { GameList } from "./game/GameList"
import { GameProvider } from "./game/GameProvider"
import { Profile } from "./profile/Profile"
import { ProfileProvider } from "./profile/ProfileProvider"

export const ApplicationViews = (props) => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <GameProvider>
                <Route exact path="/games">
                    <GameList {...props} />
                </Route>

                <Route exact path="/games/new" render={props => <GameForm {...props} />} />
            </GameProvider>

            <EventProvider>
                <GameProvider>
                    <Route exact path="/events">
                        <EventList {...props} />
                    </Route>

                    <Route exact path="/events/new" render={props => <EventForm {...props} />} />
                </GameProvider>
            </EventProvider>

            <ProfileProvider>
                <Route exact path="/profile">
                    <Profile />
                </Route>
            </ProfileProvider>


        </main>
    </>
}
