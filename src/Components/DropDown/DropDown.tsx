import React, { FC, Ref, RefObject, useEffect, useRef, useState } from 'react'
import "./DropDown.scss";

export interface IDropDown {
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
        if (showItems === false) {
            return;
        }
        const handleClick = (event) => {

            if (dropDownClickedRef.current.contains(event.target) && showItems === true) {
                event.stopPropagation();
                setShowItems(false);
            }
            else if (listRef.current.contains(event.target)) {
                onChange && onChange();
                return;
            }
            else if (dropDownClickedRef.current.contains(event.target) === false) {
                setShowItems(false);
                onChange && onChange();
            }

        }

        const handleEscPressed = (event: KeyboardEvent) => {
            if (dropDownClickedRef.current && showItems === true && event.code === 'Escape') {
                setShowItems(false);
            }
        }

        document.addEventListener('click', handleClick, true);
        document.addEventListener('keydown', handleEscPressed, true);
        return () => {
            document.removeEventListener('click', handleClick, true);
            document.removeEventListener('keypress', handleEscPressed, true);
        }
    }, [showItems])

    return (
        <div ref={ref} className={`dropDown ${className}`} style={style} onClick={() => {
            if (showItems === false) {
                setShowItems(true);
            }
        }} >
            <div ref={dropDownClickedRef} className="field">
                <span className='dropDownText' style={{ color: style?.color }}
                >{text}</span>
                <div className='arrowIconBackground' style={{ backgroundColor: `${arrowStyle?.backgroundColor}` }}>
                </div>
                <span className={`material-symbols-outlined text-black arrowIcon ${showItems === true ? "arrowIconTransition" : ""}`} style={arrowStyle}>
                    arrow_drop_down
                </span>
            </div>
            <div ref={listRef} className='list' style={{ width: `${style?.width}`, display: `${showItems === true ? "block" : "none"}` }}>
                {
                    items && items.map((element) => {
                        return <p className='item' onClick={() => {
                            console.log('item');
                            setText(element);
                            setShowItems(false);
                            onChange && onChange();
                        }}
                        >{element}</p>
                    })
                }
            </div>
        </div >
    )
});
export default DropDown;