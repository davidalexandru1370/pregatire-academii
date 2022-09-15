import "./Teste.scss"
//@ts-ignore
import DropDown from "../../Components/DropDown/DropDown.tsx"
import constants from "../../Constants/constants.json";
export const Teste = () => {
    return (
        <div className="testePage">
            <div className="leftMenuBar">
                <div className="filterCard">
                    <div className="cardItem">
                        <span>Categoria</span>
                        <DropDown items={constants.academies} />
                    </div>
                    <div className="cardItem">
                        <span>Anul</span>
                        <DropDown items={constants.academies} />
                    </div>
                    <div className="cardItem d-flex justify-content-center pt-3" >
                        <button
                            type="button"
                            className=" text-white filterButton">
                            Filtreaza
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}


