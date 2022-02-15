import { ObjectId } from "mongodb";

export default interface Transaction {
  _id?: ObjectId;
  accountId: string;
  type: string;
  category: string;
  amount: number;
  date: string;
}