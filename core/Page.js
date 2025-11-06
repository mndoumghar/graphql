import { Component } from './Component.js';

export class Page extends Component {
    constructor(props = {}) {
        super(props);
        this.title = props.title || 'Page';
        this.setTitle(this.title);
    }

    setTitle(title) {
        document.title = title;
    }
}
