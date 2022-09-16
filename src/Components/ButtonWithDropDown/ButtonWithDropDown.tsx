import React, { FC } from 'react'
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
    backgroundColor: "#efefef"
};

const ButtonWithDropDown: FC<IButtonWithDropDown> = ({ style, className, title, options, onChange, initialValue }: IButtonWithDropDown) => {
    return (
        <div style={style} className={`buttonWithDropDown ${className}`}>
            <div className="title">{title}</div>
            <DropDown style={dropDownStyle} items={['da']} />
        </div>
    )
}

export default ButtonWithDropDown;
