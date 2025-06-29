import type { FC } from "react";
import { Creates } from "../data/CardCreate";
import { CreateCard } from "../components/CreateCard";

interface CreatePageProps{}

export const CreatePage:FC<CreatePageProps> = () => {
    return (
        <div style={{ display: "grid", gap: "16px", padding: "16px" }}>
            {Creates.map(Create=>(
                <div key={Create.path}>
                    <CreateCard Creates={Create} />
                </div>
            ))}
        </div>
    )
}