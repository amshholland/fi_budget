import * as functions from 'firebase-functions';

import { Account } from '../model/account';
import cors from 'cors';
import express from 'express';
import { getClient } from '../db';

const app = express();
app.use( cors() );
app.use( express.json() );


app.get( "/:googleId", async ( req, res ) => {
    const id = String( req.params.googleId || '' );
    try {
        const client = await getClient();
        const account = await client.db().collection<Account>( 'accounts' ).findOne( {
            "user.googleId": id
        } );
        if ( account ) {
            res.json( account );
        } else {
            res.status( 404 ).json( { message: "Not Found" } );
        }
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
        const result = await client.db().collection<Account>( 'accounts' ).insertOne( newUser );
        newUser._id = result.insertedId;
        res.json( result );
    } catch ( err ) {
        console.error( "FAIL", err );
        res.status( 500 ).json( { message: "Internal Server Error" } );
    }
} );

app.put( "/", async ( req, res ) => {
  const newUser = req.body as Account;
  try {
    const client = await getClient();
    const result = await client.db().collection<Account>( 'accounts' ).insertOne( newUser );
    newUser._id = result.insertedId;
    res.json( result );
  } catch ( err ) {
    console.error( "FAIL", err );
    res.status( 500 ).json( { message: "Internal Server Error" } );
  }
} );

export default functions.https.onRequest( app );