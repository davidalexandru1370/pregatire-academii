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

        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        }
    }, [showItems])

    return (
        <div className={`${className}`} style={style}>
            <div ref={dropDownClickedRef} className="field" onClick={() => {
                setShowItems(true);
                listRef.current.style.display = 'block'
            }}>
                <span className='dropDownText'>{text}</span>
                <span className="material-symbols-outlined text-black arrowIcon">
                    keyboard_arrow_down
                </span>

            </div>
            <div ref={listRef} className='list'>
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