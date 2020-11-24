import Head from "next/head";
import { connectToDatabase } from '../../helper_scripts/mongodb'
import Header from '../../components/HeaderFooter/Header'
import Footer from '../../components/HeaderFooter/Footer'
import { BookmarkHeart, BookmarkHeartFill, CloudArrowDown } from 'react-bootstrap-icons'
import { useState } from 'react'

export default function ProjectDetail({ project }) {
    const font = project[0]
    const { pid, projectName, userOwn, last_modified: pdate, publish } = font
    const { Sample_pics: urls, info, tags, license, likes, downloads } = publish


    // need font file here
    // const style = document.createElement('style');
    // style.appendChild(document.createTextNode(`@font-face{font-family:"${projectName}";src:url("/Backend/Users/${userOwn}/Projects/${pid}");}textarea{font-family:"${projectName}"}`));
    // document.head.appendChild(style);

    const [isLiked, setIsLiked] = useState(false)
    const buttonStyle = 'f4 link dim br3 ba bw1 ph3 pv2 mb2 dib near-black di mh3 pointer'
    const tagStyle = 'f4 br3 ba bw1 ph3 pv2 mb3 mr3 dib near-black fl di ttc'

    const handleLikeButton = function () {
    }
    const handleDownloadButton = function () {
    }

    return (
        <>
            <Head>
                <title>{projectName} - Calligraphy2Digital</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {/** insert search bar */}
            <Header />
            <div className='mw9 center mt4 mb5'>

                <div className='db pv4'>
                    {/* <img src={urls[0]} className='w-100' /> */}
                    <img src="https://placeholder.pics/svg/1200x100/DEDEDE/555555/1" width='100%' />
                </div>

                <div className='flex mt4'>
                    <div className='w-two-thirds left-column pr5'>
                        <div className='flex relative items-end'>
                            <div className='f1 fl di mr3 b'>{projectName}</div>
                            <div className='f3 fl di ml4'>by<strong>{' ' + userOwn}</strong></div>
                        </div>

                        <div className='f3 mt4'>{info}</div>
                        <textarea
                            placeholder='Type something to try this font...'
                            rows='6'
                            className='br4 f3 mt4 w-50 pa3 outline-0'
                        ></textarea>
                    </div>
                    <div className='w-third right-column pl2'>
                        {/** buttons div */}
                        <div className='w-100 tr'>
                            <div className={buttonStyle} onClick={handleLikeButton}>
                                {isLiked ? <BookmarkHeartFill className='v-mid' /> : <BookmarkHeart className='v-mid' />}
                                <a>{isLiked ? ' Unlike' : ' Like'}</a>
                            </div>
                            <div className={buttonStyle} onClick={handleDownloadButton}>
                                <CloudArrowDown className='v-mid' />
                                <a> Download</a>
                            </div>
                        </div>
                        {/** font stats */}
                        <div className='flex flex-wrap f3 w-100 mt4'>
                            <div className='w-50'>Likes:{' ' + likes}</div>
                            <div className='w-50'>Downloads:{' ' + downloads}</div>
                            <div className='w-100 mt1'>Last updated: {' ' + new Date(pdate).toLocaleString().split(',')[0]}</div>
                            <div className='w-100 mt1'>License: {' ' + license}</div>
                        </div>
                        {/** tags */}
                        <div className='mt5'>
                            <div className='f3 b'>Tags</div>
                            <div className='flex flex-wrap mt3'>
                                {tags.map(tag =>
                                    <div className={tagStyle} key={tag}>{tag}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export async function getStaticPaths() {
    // Get the ID array of all projects.
    const { db } = await connectToDatabase();

    const fonts = await db
        .collection("project1")
        .find()
        .toArray();



    // Get the paths we want to pre-render based on pids
    const paths = fonts.map((font) => ({
        params: { pid: font.pid.toString() },
    }))


    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths: paths, fallback: false }
}


export async function getStaticProps({ params }) {
    // get the project json by pid
    const { db } = await connectToDatabase();

    const project = await db
        .collection("project1")
        .find({ pid: parseInt(params.pid) })
        .toArray()


    return {
        props: {
            project: JSON.parse(JSON.stringify(project)),
        },
    };

}

