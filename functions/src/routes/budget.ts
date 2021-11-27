import * as functions from 'firebase-functions';

import Account from '../model/user';
import { ObjectId } from 'bson';
import cors from 'cors';
import express from 'express';
import { getClient } from '../db';

const app = express();
app.use( cors() );
app.use( express.json() );

// Get user account;
app.get( "/id", async ( req, res ) => {
    const id = String( req.query._id || '' );
    try {
        const client = await getClient();
        const account = await client.db().collection<Account>( 'accounts' ).findOne( { _id: new ObjectId( id ) } );
        if ( account ) {
            res.json( account );
        } else {
            res.status( 404 ).json( { message: "Not Found" } );
        }
        console.log( `GET ${ id }` );
    } catch ( err ) {
        console.error( "FAIL", err );
        res.status( 500 ).json( { message: "Internal Server Error" } );
    }
} );

app.get( "/", async ( req, res ) => {
    try {
        const client = await getClient();
        const results = await client.db().collection<Account[]>( 'accounts' ).find().toArray();
        res.json( results ); // send JSON results
    } catch ( err ) {
        console.error( "FAIL", err );
        res.status( 500 ).json( { message: "Internal Server Error" } );
    }
} );

app.post( "/", async ( req, res ) => {
    const newUser = req.body as Account;
    try {
        const client = await getClient();
        const results = await client.db().collection<Account>( 'accounts' ).insertOne( newUser );
        console.log( `POST ${ newUser }` );
        res.json( results );
    } catch ( err ) {
        console.error( "FAIL", err );
        res.status( 500 ).json( { message: "Internal Server Error" } );
    }
} );

export default functions.https.onRequest( app );