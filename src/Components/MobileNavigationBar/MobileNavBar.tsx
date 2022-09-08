import "./mobileNavBarStyle.scss"
const MobileNavBar = () => {
    return (
        <div className="mobileNavigationBar">
            <ul className="listNoDecoration navBar">
                <li className="navBarItem">
                    <span className="material-symbols-outlined navBarItem">home</span>
                </li>
                <li className="navBarItem">
                    <span className="material-symbols-outlined navBarItem">
                        article
                    </span>
                </li>
                <li className="navBarItem">
                    <span className="material-symbols-outlined navBarItem">person</span>
                </li>
            </ul>
        </div>
    )
}

export default MobileNavBar;