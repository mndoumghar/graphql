
import { Component } from "react";

export class UserInfo extends Component {
    render() {
        const div = document.createElement('div');
        div.classList.add('user-info'),
        div.innerHTML = `
            <h3>${this.props.user.login}</h3>
            <p>${this.props.user.firstName} ${this.props.user.lastName}</p>          
        `;

        return div
    }
    
}

const test = new Component();
test.render();