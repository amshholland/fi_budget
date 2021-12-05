export interface Account {
    _id?: string;
    user: User[];
    budgetDay?: number;
}

export interface User {
    googleId: string;
    name: string;
    email: string;
    userCreated: string;
    lastSignIn: string;
    photoURL: string;
}