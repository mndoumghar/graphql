import { Component } from "../core/Component.js"
import { Storage } from "../utils/Storage.js"
import { Router } from "../core/Router.js"

export class Logout extends Component {
    constructor() {
        super()

    }

    render() {
        const contraint = document.createElement("div");
        const BtnLogout = document.createElement("button");
        contraint.classList.add("logout");
        BtnLogout.textContent = "Logout";
        BtnLogout.addEventListener("click", (e) => {
            e.preventDefault();
            this.handlerIsLogin();
        })

        contraint.appendChild(BtnLogout);
        return contraint;
    }

    handlerIsLogin() {
        if (Storage.getToken()) {
            Storage.removeToken();
            const root = new Router();
            root.navigator("/login");
            const contarint = document.getElementById("root");
            contarint.innerHTML = '';
        }
    }

}