import { Component } from "./Component.js";

export class Page extends Component {
    constructor(prop ={}) {
        super(prop);
        this.title = prop.title || "page";
    }

    setTitle(title) {
        document.title =title;
    }
}