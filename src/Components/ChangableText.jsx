import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ".././App.css"
class Changabletext extends React.Component {

    constructor(props){
        super(props);
        this._text_choices = props.text_choices; 
        this.state = {current_id : 0};
    }

    componentDidMount(){
        this.timeout  = setInterval(() => {
            let _current_id = this.state.current_id;
            this.setState({current_id : _current_id >= 2 ? 0 : _current_id+1   });
        }, 4000);
    }

    componentWillUnmount(){
        
    }

    render() {
        let _current_value = this.state.current_id;
        let text = this._text_choices[_current_value].name;
        return (
            <div className="hero-item" >
                <h3  data-text={text}>{text}</h3>
            </div>
        );
    }
}

export default Changabletext;
