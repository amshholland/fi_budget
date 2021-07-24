export interface User {
    _id: string;
    name: string | undefined | null;
    email: string | undefined | null;
    userCreated: string | undefined | null;
    lastSignIn: string | undefined | null;
    photoURL: string | undefined | null;
    budgetDay: number | undefined | null;
}