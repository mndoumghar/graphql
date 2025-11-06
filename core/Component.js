
export class Component {
    constructor( prop = {}) {
        this.prop = prop;
        this.elemnt = null;
    }

    render() {
        throw new Error ("Component Must implemnt render()")
    }
    mount(parent) {
        this.elemnt = this.render()
        parent.appendChild(this.elemnt)
    }
    unmount() {
        if(this.elemnt && this.elemnt.parentNode) {
            this.elemnt.parentNode.removeChild(this.elemnt)
        }
    }
}