import { Router } from "./core/Router.js";
import { LoginPAge } from "./Pages/LoginPage.js"
import { ProfilePage } from "./Pages/ProfilePage.js";
import { ErrorPage } from "./utils/Storage.js"

const routes = {
    '/login': LoginPAge,
    '/profile': ProfilePage,
    '*': ErrorPage
};

const router = new Router(routes);


// check JWT
const token = Storage.getToken()
if (token) {
    router.navigator('./profile');
} else {
    router.navigator('/login')
}

window.router = router