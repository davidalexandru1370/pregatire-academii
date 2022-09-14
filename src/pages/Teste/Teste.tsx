import "./Teste.scss"
//@ts-ignore
import DropDown from "../../Components/DropDown/DropDown.tsx"

export const Teste = () => {
    return (
        <div className="testePage">
            <div className="leftMenuBar ">
                <div className="filterCard">
                    <span>Categoria</span>
                    <DropDown style={{ width: "20vw" }} />
                </div>
            </div>
        </div>
    )
}


