import React, { FC, useEffect, useRef, useState } from 'react'
//@ts-ignore
import DropDown from '../DropDown/DropDown.tsx'
import "./ButtonWithDropDown.scss"

interface IButtonWithDropDown {
    style?: React.CSSProperties,
    className?: string,
    title?: string,
    options: string[],
    onChange?: () => void,
    initialValue?: string
};

const dropDownStyle: React.CSSProperties = {
    width: "100%",
    marginTop: "10px",
    backgroundColor: "transparent"
};

const dropDownArrowStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
}


const ButtonWithDropDown: FC<IButtonWithDropDown> = ({ style, className, title, options, onChange, initialValue }: IButtonWithDropDown) => {
    const buttonWithDropDownRef = useRef<HTMLDivElement>(null);
    const [clickedDiv, setClickedDiv] = useState<boolean>(false);
    const dropDownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event) => {
            if (buttonWithDropDownRef.current &&
                dropDownRef.current.contains(event.target) === false &&
                buttonWithDropDownRef.current.contains(event.target)) {
                console.log('aci');

                dropDownRef.current.click();
            }
        }

        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick)
        }

    }, [clickedDiv])


    return (
        <div ref={buttonWithDropDownRef} style={style} className={`buttonWithDropDown ${className}`}
        >
            <div className="title">{title}</div>
            <div className='dropDownSpace'>
                <DropDown ref={dropDownRef} style={dropDownStyle} items={['da']} arrowStyle={dropDownArrowStyle} />
            </div>
        </div>
    )
}

export default ButtonWithDropDown;
