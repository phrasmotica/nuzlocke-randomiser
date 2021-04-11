import { useState } from "react"
import { Button, Header, Input } from "semantic-ui-react"

import { randomInt } from "./Helpers"
import { Nuzlocke } from "./Nuzlocke"
import { Rule } from "./Rule"

type GeneratorProps = {
    rules: Rule[]
    setGeneratedGame: (game: Nuzlocke | undefined) => void
}

export const Generator = (props: GeneratorProps) => {
    const [numberOfEasyRules, setNumberOfEasyRules] = useState(0)
    const [numberOfHardRules, setNumberOfHardRules] = useState(0)

    const getHardRules = () => props.rules.filter(r => r.difficulty === "hard")
    const getEasyRules = () => props.rules.filter(r => r.difficulty === "easy")

    const generate = () => {
        let rules = [...props.rules.filter(r => r.difficulty === "core")]

        if (numberOfHardRules > 0) {
            let hardRules = getHardRules()

            for (let i = 0; i < numberOfHardRules; i++) {
                let index = randomInt(0, hardRules.length)
                rules.push(hardRules[index])
                hardRules.splice(index, 1)
            }
        }

        if (numberOfEasyRules > 0) {
            let easyRules = getEasyRules()
            for (let i = 0; i < numberOfEasyRules; i++) {
                let index = randomInt(0, easyRules.length)
                rules.push(easyRules[index])
                easyRules.splice(index, 1)
            }
        }

        // TODO: resolve overriding/conflicting rules

        let generatedGame = {
            rules: rules
        } as Nuzlocke

        props.setGeneratedGame(generatedGame)
    }

    const clear = () => props.setGeneratedGame(undefined)

    return (
        <div>
            <div className="generator-header">
                <Header size="large">
                    Nuzlocke Challenge Randomiser
                </Header>
            </div>

            <div className="generator-inputs">
                <div className="margin-right">
                    <Input
                        type="number"
                        className="generator-input"
                        label="# of easy rules"
                        value={numberOfEasyRules}
                        min={0}
                        max={getEasyRules().length}
                        onChange={e => setNumberOfEasyRules(Number(e.target.value))} />
                </div>

                <div>
                    <Input
                        type="number"
                        className="generator-input"
                        label="# of hard rules"
                        value={numberOfHardRules}
                        min={0}
                        max={getHardRules().length}
                        onChange={e => setNumberOfHardRules(Number(e.target.value))} />
                </div>
            </div>

            <div className="generator-buttons">
                <div className="margin-right">
                    <Button onClick={generate}>
                        Generate!
                    </Button>
                </div>

                <div>
                    <Button onClick={clear}>
                        Clear
                    </Button>
                </div>
            </div>
        </div>
    )
}
