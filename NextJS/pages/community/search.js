import Head from "next/head";
import Header from '../../components/HeaderFooter/Header'
import Footer from '../../components/HeaderFooter/Footer'
import { useEffect, useState } from 'react'
import SearchBar from "../../components/SearchBar";
import { connectToDatabase } from '../../helper_scripts/mongodb'
import toggleAutoSuggestion from "../../helper_scripts/ToggleAutoSuggestion";

export default function Search(props) {
    const { users, fonts } = props

    useEffect(() => {
        toggleAutoSuggestion()
    }, [])

    return (
        <>
            <Head>
                <title>Search Results - Calligraphy2Digital</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <SearchBar />

            <div className='mw9 center mt4 mb5'>

                <div className='pv4'>
                    <h1>Search Results</h1>
                </div>

                <div className='flex mt4'>
                    {/* {fonts} */}
                </div>
            </div>
            <Footer />
        </>
    )
}


export async function getServerSideProps(context) {

    const query = context.query.query

    const { db } = await connectToDatabase();

    const fonts = await await db
        .collection("projects")
        .find({
            projectName: new RegExp(query, 'i')
        })
        .toArray()

    const users = await db
        .collection("users")
        .find({ 'profile.profileName': new RegExp(query, 'i') })
        .toArray()





    return {
        props: {
            fonts: JSON.parse(JSON.stringify(fonts)),
            users: JSON.parse(JSON.stringify(users))
        },
    };


}