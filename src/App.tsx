import React from "react"

import { Skill_Type, Skills } from "./DB";
import Preview from "./Components/Preview";
import ModifySkills from "./Components/ModifySkills";
const MapLink = "https://skillicons.dev/icons"
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

interface State_Type {
    Theme: "light" | "dark" | "unset"
    IconsPerLine?: number
    Icons: Array<Skill_Type>
}

const DefaultState: State_Type = {
    Theme: prefersDarkMode ? "dark" : "unset",
    IconsPerLine: 7,
    Icons: []
} as State_Type

function App() {
    const [State, setState] = React.useState<State_Type>(DefaultState);

    function AddSkill (id: string) {
        const Skill = Skills.find(skill => skill.id === id)
        if (Skill) {
            const Icons = State.Icons
            Icons.push(Skill)
            setState({ ...State, Icons })
        }
    }

    function RemoveSkill (id: string) {
        const Icons = State.Icons.filter(icon => icon.id !== id)
        setState({ ...State, Icons })
    }

    function GenerateURL() {
        // ? Generate Skill Icons String
        const Icons = State.Icons.map(icon => icon.id).join(",")

        // ? Generate URL
        let SkillURL = new URL(MapLink)
        SkillURL.searchParams.set("i", Icons)
        if (State.Theme !== "unset") {
            SkillURL.searchParams.set("theme", State.Theme)
        }
        SkillURL.searchParams.set("perline", State.IconsPerLine ? State.IconsPerLine.toString() : "")
        return SkillURL.toString()
    }

    return (
        <>
            {
                State.Icons.length > 0 && <Preview URL={GenerateURL()} />
            }
            <ModifySkills State={State} setState={setState} AddSkill={AddSkill} RemoveSkill={RemoveSkill} />
        </>
    )
}

export default App
