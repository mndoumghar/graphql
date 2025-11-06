import { Storage } from './Storage.js';

export const Auth = {
    async sign(username, password) {
        const mydata = btoa(`${username}:${password}`);

        const response = await fetch('https://learn.zone01oujda.ma/api/auth/signin', {
            method: 'POST',
            headers: { 'Authorization': `Basic ${mydata}` }
        });

        
        const data = await response.json();
        const token = data.token ;
        Storage.setToken(token);
        return token;
    }
}
