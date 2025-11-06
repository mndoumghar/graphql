export class GraphQLClient {
    constructor(token) {
        this.token = token;
        this.endpoint = 'https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql'
    }

    async query(query, variables = {}) {
        const response = await fetch(this.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            },
            body: JSON.stringify({ query, variables }),
        });

        const data = await response.json();
        console.log("data " , data);
        
        if (!response.ok || data.errors) {
            console.error('GraphQL Error:', data.errors);
            throw new Error(data.errors?.[0]?.message || 'GraphQL query failed');
        }

        return data.data;
    }
}
