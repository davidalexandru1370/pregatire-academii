import "./Teste.scss"
//@ts-ignore
import DropDown from "../../Components/DropDown/DropDown.tsx"
import constants from "../../Constants/constants.json";
export const Teste = () => {
    return (
        <div className="testePage">
            <div className="leftMenuBar">
                <div className="filterCard">
                    <span>Categoria</span>
                    <DropDown style={{ width: "12vw" }} items={constants.academies} />
                </div>
            </div>
        </div>
    )
}


