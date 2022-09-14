import React, { FC } from 'react'
import "./DropDown.scss";

const DropDown: FC<{ className: string, style: React.CSSProperties, options: string[] }> = ({
    className,
    style,
    options
}) => {
    return (
        <div className={`${className}`} style={style}>
            <div className="field">

            </div>
        </div>
    )
}
export default DropDown;