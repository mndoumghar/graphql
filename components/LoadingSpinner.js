import { Component } from "../core/Component.js";

export class LoadingSpinner extends Component {
        render() {
            const div = document.createElement('div')
            div.classList.add('spinner');

            div.innerHTML = `
                <div class="double-bounce1"></div>
                <div class = "double-bounce2"></div>
            `;
            return div
        }

}