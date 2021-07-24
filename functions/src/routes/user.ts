import * as functions from "firebase-functions";

import { ObjectId } from "mongodb";
import Transaction from "../model/budget";
import User from "../model/User";
import cors from "cors";
import express from "express";
import { getClient } from '../db';

const app = express();
app.use( cors() );
app.use( express.json() );

// Get user
app.get( "/", async ( req, res ) => {
    try {
        const client = await getClient();
        const results = await client.db().collection<User[]>( 'users' ).find().toArray();
        res.json( results ); // send JSON results
    } catch ( err ) {
        console.error( "FAIL", err );
        res.status( 500 ).json( { message: "Internal Server Error" } );
    }
} );

// Add new user
app.post( "/", async ( req, res ) => {
    const newUser = req.body as User;
    console.log( newUser );
    try {
        const client = await getClient();
        const results = await client.db().collection<User>( 'users' ).insertOne( newUser );
        res.json( results );
    } catch ( err ) {
        console.error( "FAIL", err );
        res.status( 500 ).json( { message: "Internal Server Error" } );
    }
} );

// List transactions
app.get( "/transactions", async ( req, res ) => {
    const userId = String( req.query.userId || '' );
    try {
        const client = await getClient();
        const results = await client.db().collection<Transaction>( 'transactions' ).find( { userId: userId } ).toArray();
        res.json( results );
    } catch ( err ) {
        console.error( "FAIL", err );
        res.status( 500 ).json( { message: "Internal Server Error" } );
    }
} );

// Add new favorite
app.post( "/", async ( req, res ) => {
    const newFavorite = req.body as Transaction;
    console.log( newFavorite );
    try {
        const client = await getClient();
        const results = await client.db().collection<Transaction>( 'transactions' ).insertOne( newFavorite );
        res.json( results );
    } catch ( err ) {
        console.error( "FAIL", err );
        res.status( 500 ).json( { message: "Internal Server Error" } );
    }
} );

// Delete favorite
app.delete( "/:id", async ( req, res ) => {
    const id = req.params.id;
    try {
        const client = await getClient();
        const result = await client.db().collection<Transaction>( 'transactions' ).deleteOne( { _id: new ObjectId( id ) } );
        if ( result.deletedCount === 0 ) {
            res.status( 404 ).json( { message: "Not Found" } );
        } else {
            res.status( 204 ).end();
        }
    } catch ( err ) {
        console.error( "FAIL", err );
        res.status( 500 ).json( { message: "Internal Server Error" } );
    }
} );

export default functions.https.onRequest( app );