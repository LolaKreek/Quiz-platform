export type changeHandlerType = {
    e: React.FormEvent<HTMLFormElement>
    formikHandler: {
        (e: React.ChangeEvent<any>): void;
        <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    }
}

export type userType = {
    uid: string,
    displayName: string | null,
    email: string | null,
    emailVerified: boolean,
    isAnonymous: boolean,
    phone: string | null,
    photoURL: string | null,
    [key: string]: any,
}