import { Component } from "../core/Component.js";

export class Logo extends Component {
    constructor() {
        super();
        
        this.pattern = [
            0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0,
            0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0,
            1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0,
            1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0,
            1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0,
            1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0,
            1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0,
            1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0,
            1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0,
            1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0,
            1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0,
            0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0,
            0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0
        ];
    }

    render() {
        const root = document.createElement('div');
        root.className = 'logo-01';

        let index = 0;
        const interval = setInterval(() => {
            if (index >= this.pattern.length) {
                clearInterval(interval);
                return;
            }

            const dot = document.createElement('div');
            dot.className = this.pattern[index] === 1 ? 'dot active' : 'dot';
            root.appendChild(dot);
            
            index++;
        }, 15);

        return root;
    }
}