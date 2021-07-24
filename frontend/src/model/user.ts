export interface User {
    _id?: string;
    googleUser: GoogleUser[];
}

export interface GoogleUser {
    googleId: string;
    name: string;
    email: string;
    userCreated: string;
    lastSignIn: string;
    photoURL: string;
    budgetDay: number;
}