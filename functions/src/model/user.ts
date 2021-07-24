import { ObjectId } from "mongodb";

export default interface User {
    _id?: ObjectId;
    googleUser: GoogleUser;
}

interface GoogleUser {
    googleId: string;
    name: string | undefined | null;
    email: string | undefined | null;
    userCreated: string | undefined | null;
    lastSignIn: string | undefined | null;
    photoURL: string | undefined | null;
    budgetDay: number | undefined | null;
}