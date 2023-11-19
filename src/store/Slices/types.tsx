// Define a type for the slice state
export type UserType = {
    id: string,
    name: string,
    surname: string,
    roles: []
}

export interface AuthState {
    user: UserType;
    token: string;
    expirationDate: string;
}

export type AppState = {
    isLocked: boolean
}