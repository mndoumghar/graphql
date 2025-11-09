// Auth.js
import { Storage } from './Storage.js';

export const Auth = {

    async sign(username, password) {
        const mydata = btoa(`${username}:${password}`);

        const response = await fetch('https://learn.zone01oujda.ma/api/auth/signin', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${mydata}`,
            },
        });

        const text = await response.text();
        let body;
        try {
            body = text ? JSON.parse(text) : null;
        } catch {
            body = text;
        }

        if (!response.ok) {
            // Build a useful error message
            const serverMsg = body && (body.error || body.message) ? (body.error || body.message) : (typeof body === 'string' ? body : response.statusText);
            throw new Error(`Signin failed (${response.status}): ${serverMsg}`);
        }

        // At this point response.ok === true
        // Determine token location (depends on your API)
        const token = (body && (body.token || body.accessToken)) ? (body.token || body.accessToken) : (typeof body === 'string' ? body : null);

        if (!token) {
            // If server returns a JSON object but no token field, store whole object as JSON
            Storage.setToken(JSON.stringify(body));
        } else {
            Storage.setToken(token);
        }

        return token || body;
    }
};
