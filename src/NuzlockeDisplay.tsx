import { useEffect, useState } from "react"
import { Accordion, Header, Input, Label, SemanticCOLORS } from "semantic-ui-react"

import { Nuzlocke } from "./Nuzlocke"
import { Rule } from "./Rule"

type NuzlockeDisplayProps = {
    game: Nuzlocke | undefined
}

export const NuzlockeDisplay = (props: NuzlockeDisplayProps) => {
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        setSearchTerm("")
    }, [props.game])

    const matchesSearch = (r: Rule) => {
        if (searchTerm.length <= 0) {
            return true
        }

        let lowerCaseSearchTerm = searchTerm.toLowerCase()
        let lowerCaseName = r.name.toLowerCase()
        let lowerCaseDescription = r.description.toLowerCase()

        return lowerCaseName.includes(lowerCaseSearchTerm)
            || lowerCaseDescription.includes(lowerCaseSearchTerm)
            || r.difficulty.includes(lowerCaseSearchTerm)
    }

    const createRulePanel = (r: Rule) => {
        let labelColour: SemanticCOLORS = "blue"
        switch (r.difficulty) {
            case "easy":
                labelColour = "green"
                break

            case "hard":
                labelColour = "red"
                break
        }

        return (
            <div className="rule-name">
                <div className="margin-right">
                    <span>
                        {r.name}
                    </span>
                </div>

                <Label color={labelColour}>
                    {r.difficulty}
                </Label>
            </div>
        )
    }

    let game = props.game
    if (game === undefined) {
        return null
    }

    let rules = game.rules
    let filteredRules = rules.filter(matchesSearch)
    let rulePanels = filteredRules.map((r, i) => ({
        key: i,
        title: { content: createRulePanel(r), },
        content: r.description,
    }))

    let header = `Rules (${rules.length})`
    if (filteredRules.length < rules.length) {
        header = `Rules (${filteredRules.length} of ${rules.length})`
    }

    return (
        <div>
            <div className="rule-header">
                <div>
                    <Header>
                        {header}
                    </Header>
                </div>

                <div className="rule-search">
                    <Input
                        size="mini"
                        icon="search"
                        placeholder="Search..."
                        onChange={(_, data) => setSearchTerm(data.value)} />
                </div>
            </div>

            <div>
                <Accordion
                    className="rule-accordion"
                    styled
                    exclusive={false}
                    panels={rulePanels} />
            </div>
        </div>
    )
}
