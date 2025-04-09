interface AuthPayload {
    partner: string;
    user: string;
    password: string;
}

interface AuthCredentials{
    id: number;
    user: string;
    name: string;
    password?: string;
    status?: string;
    email: string;
    image: string;
    language: string;
    equipment_downtime: number;
}

interface AuthResponse {
    token: string;
}

export { AuthPayload, AuthCredentials, AuthResponse };