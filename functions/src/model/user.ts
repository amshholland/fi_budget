import { ObjectId } from "mongodb";

export default interface User {
    _id?: ObjectId;
    googleUser: GoogleUser[];
}

interface GoogleUser {
    googleId: string;
    name: string;
    email: string;
    userCreated: string;
    lastSignIn: string;
    photoURL: string;
    budgetDay: number;
}