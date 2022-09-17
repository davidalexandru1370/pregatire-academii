import React, { FC, Ref, RefObject, useEffect, useRef, useState } from 'react'
import "./DropDown.scss";

interface IDropDown {
    className?: string,
    style?: React.CSSProperties,
    items: string[]
    arrowStyle?: React.CSSProperties,
    onChange: () => void;
}

const DropDown = React.forwardRef<HTMLDivElement, IDropDown>(({
    className,
    style,
    items,
    arrowStyle,
    onChange,
}: IDropDown, ref) => {
    const dropDownClickedRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [showItems, setShowItems] = useState<boolean>(false);
    const [text, setText] = useState<string>("");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropDownClickedRef.current /*&& !dropDownClickedRef.current.contains(event.target)*/ && showItems === true) {
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
        <div ref={ref} className={`dropDown ${className}`} style={style} onClick={(e) => {
            setShowItems(true);
            listRef.current.style.display = 'block'
        }}>
            <div ref={dropDownClickedRef} className="field">
                <span className='dropDownText'>{text}</span>
                <div className='arrowIconBackground' style={{ backgroundColor: `${arrowStyle?.backgroundColor}` }}>
                </div>
                <span className={`material-symbols-outlined text-black arrowIcon ${showItems === true ? "arrowIconTransition" : ""}`} style={arrowStyle}>
                    arrow_drop_down
                </span>
            </div>
            <div ref={listRef} className='list' style={{ width: `${style?.width}`, display: `${showItems === true ? "" : "none"}` }}>
                {
                    items && items.map((element) => {
                        return <p className='item' onClick={() => {
                            setText(element)
                            listRef.current.style.display = "none";
                            onChange && onChange();
                        }}>{element}</p>
                    })
                }
            </div>
        </div >
    )
});
export default DropDown;