import axios from "axios";

export const UserService = {
    path: "http://localhost:3000/api/user",
    async register(login: string, password: string) {
        const resp = await axios.post(`${this.path}/register`, {
            login: login,
            password: password,
        });
        return resp.data;
    },
    async login(login: string, password: string) {
        const resp = await axios.post(`${this.path}/login`, {
            login: login,
            password: password,
        });
        return resp.data;
    },
    async refresh(token: string) {
        const resp = await axios.get(`${this.path}/refresh?token=${token}`);
        return resp.data;
    },
};
