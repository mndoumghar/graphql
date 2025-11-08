import { Router } from './core/Router.js';
import { LoginPage } from './Pages/LoginPage.js';
import { ProfilePage } from './Pages/ProfilePage.js';
import { Storage } from './utils/Storage.js';

const routes = {
    '/login': LoginPage,
    '/profile': ProfilePage,
    '*': LoginPage
};

const router = new Router(routes);
window.router = router;

const token = Storage.getToken();

if (token) {
    if (typeof token == "undefined") {
        router.navigator('/login');

    } else {
         router.navigator('/profile');
    }

} else {
    router.navigator('/login');
}
