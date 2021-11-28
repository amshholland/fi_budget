import { ObjectId } from "mongodb";

export interface Account {
    _id?: ObjectId;
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