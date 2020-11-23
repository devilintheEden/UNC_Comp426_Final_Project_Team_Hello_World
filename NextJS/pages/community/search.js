import Head from "next/head";
import Header from '../../components/HeaderFooter/Header'
import Footer from '../../components/HeaderFooter/Footer'
import { useEffect, useState } from 'react'
import SearchBar from "../../components/SearchBar";
import { connectToDatabase } from '../../helper_scripts/mongodb'
import toggleAutoSuggestion from "../../helper_scripts/ToggleAutoSuggestion";
import ItemsGrid from "../../components/GridSystem/ItemsGrid";
import Title from "../../components/Community/title";
import Main from "../../components/Community/Main";

export default function Search({ pids }) {

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
            <Main>
                <Title title='Search Results' />

                <div className='mt4'>
                    <ItemsGrid col={1} row={8} type='font_in_community' infoList={pids} />
                </div>
            </Main>
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
            "publish.published": true,
            projectName: new RegExp(query, 'i'),
        })
        .toArray()

    const pids = fonts.map(font => font.pid)

    return {
        props: {
            pids: JSON.parse(JSON.stringify(pids)),
        },
    };


}