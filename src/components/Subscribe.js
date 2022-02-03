import React from "react";

class Subscribe extends React.Component {

    constructor() {
        super();

        this.state = {
           
        }
        
    }

    subscriptCon(status, name) {
        
    }

    render() {
        return (
            <div class="row mb-2">
                <button type="button" class={this.props.colour} onClick={this.subscriptCon(this.props.status,this.props.name )}>{this.props.status} {this.props.name}</button>
            </div>
        )
    }
};

export default Subscribe;