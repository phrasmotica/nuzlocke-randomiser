import { Difficulty } from "./Difficulty"

export interface Rule {
    id: string
    name: string
    description: string
    difficulty: Difficulty
    overrides: string[]
    conflicts: string[]
}
