import Head from "next/head";
import Header from "../components/HeaderFooter/Header.js";
import Footer from "../components/HeaderFooter/Footer.js";
import SearchBar from '../components/SearchBar'
import toggleAutoSuggestion from "../helper_scripts/ToggleAutoSuggestion.js";
import Filter from "../components/Filter.js";
import Main from "../components/Community/Main.js";
import Title from "../components/Community/title.js";
import { useEffect, useState } from "react";
import checkCookie from "../helper_scripts/checkcookie.js";
import ItemsGrid from "../components/GridSystem/ItemsGrid.js";
import { connectToDatabase } from '../helper_scripts/mongodb'

export default function Community({ fonts }) {
    const [infoList, setInfoList] = useState(fonts)
    const [uid, setUID] = useState(-1)
    useEffect(() => {
        setUID(checkCookie())
        toggleAutoSuggestion()
    }, [])

    const filterFeed = function (category, sortBy, direction) {
        switch (category) {
            case 'all':
                break
            case 'free':
                setInfoList(preList => preList.filter(font => font.license === 'Downloadable'))
                break
            case 'notFree':
                setInfoList(preList => preList.filter(font => font.license === 'Copyrighted'))
                break
        }
        if (direction == 'up') {
            switch (sortBy) {
                case 'popularity':
                    setInfoList(preList => preList.sort((a, b) => (a.likes.length + a.downloads) - (b.likes.length + b.downloads)))
                    break
                case 'date':
                    setInfoList(preList => preList.sort((a, b) => a.last_modified.getTime() - b.last_modified.getTime()))
                    break
            }
        } else if (direction == 'down') {
            switch (sortBy) {
                case 'popularity':
                    setInfoList(preList => preList.sort((b, a) => (a.likes.length + a.downloads) - (b.likes.length + b.downloads)))
                    break
                case 'date':
                    setInfoList(preList => preList.sort((b, a) => a.last_modified.getTime() - b.last_modified.getTime()))
                    break
            }
        }

    }

    return (
        <div className="container">
            <Head>
                <title>Community - Calligraphy2Digital</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="google-signin-client_id" content="2632322765-1q6o3aucrg484d4poc95vbio3025hde9.apps.googleusercontent.com" />
                <script src="https://apis.google.com/js/platform.js" async defer></script>
            </Head>
            <Header key={uid} uid={uid} />
            <SearchBar />
            <Main>
                <Title title='Explore and find your favorites' />
                <Filter filterFeed={filterFeed} />
                <ItemsGrid row={8} col={1} type='font_in_community' infoList={infoList} />
            </Main>
            <Footer />
        </div>
    )
}

export async function getStaticProps() {
    // get the project json by pid
    const { db } = await connectToDatabase();

    const fonts = await await db
        .collection("projects")
        .find({
            "publish.published": true,
        })
        .toArray()

    return {
        props: {
            fonts: JSON.parse(JSON.stringify(fonts)),
        },
    };

}
