import * as functions from 'firebase-functions';

import Account from '../model/user';
import cors from 'cors';
import express from 'express';
import { getClient } from '../db';

const app = express();
app.use( cors() );
app.use( express.json() );

// Get user account
// app.get( "/", async ( req, res ) => {
//     const userId = String( req.query.userId || '' );
//     try {
//         const client = await getClient();
//         const results = await client.db().collection<Account>( 'accounts' ).find( { userId: userId } ).toArray();
//         console.log( `GET ${ userId }` );
//         res.json( results );
//     } catch ( err ) {
//         console.error( "FAIL", err );
//         res.status( 500 ).json( { message: "Internal Server Error" } );
//     }
// } );

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