import React, {Component} from "react";
import Logo from "../../logo.png"

class NavBar extends Component {
    render() {
        const navBarStyle = {
            display: 'block',
            backgroundColor: '#b2d8d8',
            minHeight: '15vh',
            verticalAlign: 'middle'
        }

        const logoStyle = {
           margin: '2em',
           
        }

        return (
            <div style={navBarStyle}>
                <img src={Logo} style={logoStyle}/>
            </div>
        )
    }
}

export default NavBar;