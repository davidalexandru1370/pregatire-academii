import "./Teste.scss"
//@ts-ignore
import DropDown from "../../Components/DropDown/DropDown.tsx"
import constants from "../../Constants/constants.json";
//@ts-ignore
import TestCard from "../../Components/TestCard/TestCard.tsx";
export const Teste = () => {
    return (
        <div className="testePage">
            <div className="testeItems">
                <div className="filterAndSort">
                    <button type='button'
                        className="btn btn-primary"
                    >
                        Filter
                    </button>
                    <p>sort</p>
                </div>
                <p>0 rezultate</p>
            </div>
            <div className="content">
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
                <div className="rightPart">
                    <div className="testCards">
                        <TestCard />
                        <TestCard />
                        <TestCard />
                        <TestCard />
                        <TestCard />
                        <TestCard />
                        <TestCard />
                        <TestCard />
                        <TestCard />
                        <TestCard />
                        <TestCard />
                        <TestCard />
                    </div>
                </div>
            </div>
        </div>
    )
}


