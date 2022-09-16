import { FC } from 'react';
import "./TestCard.scss";

const TestCard: FC<{}> = ({ }) => {
    return (
        <div className="testCard">
            <div className="testTitle">Admitere</div>
            <div className="testContent">
                <p>Categorie:</p>
                <p>An:</p>
                <p>Timp:</p>
                <p>Punctaj maxim:</p>
                <p>Punctajul tau:</p>
            </div>
            <div className="play d-flex justify-content-center">
                <button type='button' className='startButton'>Incepe</button>
            </div>

        </div>
    )
}

export default TestCard;