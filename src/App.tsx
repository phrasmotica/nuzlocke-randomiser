import { useState } from "react"

import { Generator } from "./Generator"
import { Nuzlocke } from "./Nuzlocke"
import { NuzlockeDisplay } from "./NuzlockeDisplay"
import { Rule } from "./Rule"

import 'semantic-ui-css/semantic.min.css'
import "./App.css"

import rawData from "./data.json"

const rules = rawData.rules as Rule[]

const App = () => {
    const [generatedGame, setGeneratedGame] = useState<Nuzlocke>()

    return (
        <div className="App">
            <header className="App-header">
                <div className="margin-bottom">
                    <Generator
                        rules={rules}
                        setGeneratedGame={setGeneratedGame} />
                </div>

                <div>
                    <NuzlockeDisplay
                        game={generatedGame} />
                </div>
            </header>
        </div>
    )
}

export default App
