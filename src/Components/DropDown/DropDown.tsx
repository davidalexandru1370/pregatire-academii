import React, { FC, useEffect, useRef, useState } from 'react'
import "./DropDown.scss";

const DropDown: FC<{ className?: string, style?: React.CSSProperties, items: string[] }> = ({
    className,
    style,
    items
}) => {
    const dropDownClickedRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [showItems, setShowItems] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropDownClickedRef.current && !dropDownClickedRef.current.contains(event.target) && showItems === true) {
                setShowItems(false);
            }
        }

        const handleEscPressed = (event: KeyboardEvent) => {
            if (dropDownClickedRef.current && showItems === true && event.code === 'Escape') {
                setShowItems(false);
            }
        }

        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('keydown', handleEscPressed, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.removeEventListener('keypress', handleEscPressed, true);
        }
    }, [showItems])

    return (
        <div className={`${className}`} style={style}>
            <div ref={dropDownClickedRef} className="field" onClick={() => {
                setShowItems(true);
                listRef.current.style.display = 'block'
            }}>
                <span className='dropDownText'>{text}</span>
                <div className='arrowIconBackground'>
                </div>
                <span className={`material-symbols-outlined text-black arrowIcon ${showItems === true ? "arrowIconTransition" : ""}`}>
                    keyboard_arrow_down
                </span>

            </div>
            <div ref={listRef} className='list' style={{ display: `${showItems === true ? "block" : "none"}` }}>
                {
                    items && items.map((element) => {
                        return <p className='item' onClick={() => {
                            setText(element)
                            listRef.current.style.display = "none";
                        }}>{element}</p>
                    })
                }
            </div>
        </div >
    )
}
export default DropDown;