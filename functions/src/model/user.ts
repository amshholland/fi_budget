import { ObjectId } from "mongodb";

export default interface Account {
    _id?: ObjectId;
    users: User[];
    budgetDay?: number;
}

interface User {
    googleId: string;
    name: string;
    email: string;
    userCreated: string;
    lastSignIn: string;
    photoURL: string;
}