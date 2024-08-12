import { Skills } from "../DB";
import { useState } from "react";
import { Input } from "@nextui-org/react";
import { Search, Close } from "@mui/icons-material";
import "../Styles/ModifySkills.sass"
import { Badge } from "@mui/material";

const SkillImageUrl = "https://skillicons.dev/icons?i="
function ModifySkills({
    State,
    setState,
    AddSkill,
    RemoveSkill
}: {
    State: {
        Theme: "light" | "dark" | "unset"
        IconsPerLine?: number
        Icons: Array<{
            name: string
            id: string
        }>
    }
    setState: (state: any) => void
    AddSkill: (id: string) => void
    RemoveSkill: (id: string) => void
}) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredSkills = Skills.filter(skill => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const lowerCaseName = skill.name.toLowerCase();
        const lowerCaseId = skill.id.toLowerCase();

        return (
            !State.Icons.find(icon => icon.id === skill.id) &&
            (lowerCaseName.includes(lowerCaseSearchTerm) ||
                lowerCaseId.includes(lowerCaseSearchTerm) ||
                skill.keywords?.some(keyword => keyword.toLowerCase().includes(lowerCaseSearchTerm)))
        );
    });

    return (
        <div className={"Configaration"}>
            <div className="Form">
                {/* ? Select Theme */}
                <select value={State.Theme} onChange={(event) => setState({ ...State, Theme: event.target.value })}>
                    <option value="unset">Default</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>

                {/* ? Number of Skill per Line Input */}
                {/* <input type="number" placeholder="Number of Skills per Line" value={State.IconsPerLine} onChange={(event) => setState({ ...State, IconsPerLine: parseInt(event.target.value) })} /> */}
                <Input
                    type="number"
                    placeholder="Number of Skills per Line"
                    value={State?.IconsPerLine?.toString()}
                    onChange={(event) => setState({ ...State, IconsPerLine: parseInt(event.target.value) })}
                    startContent={<Search />}
                />

                {/* ? Search Input */}
                <input type="text" placeholder="Search skill" value={searchTerm} onChange={handleSearch} />
            </div>

            {/* ? Render Skills from*/}
            <div className="Skills">
                {
                    State.Icons.map(skill => (
                        <div className="Skill" key={skill.id}>
                            <Badge
                                badgeContent={<Close />}
                                color="error"
                                overlap="circular"
                                onClick={() => RemoveSkill(skill.id)}
                            >
                                <img src={`${SkillImageUrl}${skill.id}`} alt={skill.name} />
                            </Badge>
                            {skill.name}
                        </div>
                    ))
                }
                {
                    filteredSkills.map(skill => (
                        <div key={skill.id} onClick={() => AddSkill(skill.id)} className="Skill">
                            <img src={`${SkillImageUrl}${skill.id}`} alt={skill.name} />
                            {skill.name}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ModifySkills