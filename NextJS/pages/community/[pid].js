// import the data fetching funcitons
// import { getAllProjectsID, getProject} from '../api/name'
import Header from '../../components/HeaderFooter/Header'
import Footer from '../../components/HeaderFooter/Footer'
import { BookmarkHeart, BookmarkHeartFill, CloudArrowDown } from 'react-bootstrap-icons'
import { useState } from 'react'


export default function ProjectDetail({ project }) {
    const { pid, projectName, userOwn, last_modified: pdate, publish } = project
    const { Sample_pics: url, info, tags, license, likes, downloads } = publish

    // // need font file here
    // const style = document.createElement('style');
    // style.appendChild(document.createTextNode(`@font-face{font-family:"${projectName}";src:url("${fonturl}");}textarea{font-family:"${projectName}"}`));
    // document.head.appendChild(style);

    const { isLiked, setIsLiked } = useState(false)
    const buttonStyle = 'f6 link dim br3 ba bw1 ph3 pv2 mb2 dib near-black fr di'
    const tagStyle = 'f6 br3 ba bw1 ph3 pv2 mb2 dib near-black fl di ttc'

    const handleLikeButton = function () {
    }

    return (
        <>
            <Head>
                <title>{projectName} - Calligraphy2Digital</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {/** insert search bar */}
            <Header />
            <div className='mw8'>

                <div className='mt5 db'>
                    <img src={url} className='w-100' />
                </div>

                <div className='flex mt2'>
                    <div className='w-50 left-column pr2'>
                        <div className='flex relative items-end'>
                            <div className='f2 fl di mr3'>{projectName}</div>
                            <div classNam='f4 fl di'>by<strong>{' ' + userOwn}</strong></div>
                        </div>

                        <div className='f5'>{info}</div>
                        <textarea
                            placeholder='Type something to try this font...'
                            rows='8'
                            className='br2 f3'
                        ></textarea>
                    </div>
                    <div className='w-50 right-column pl2'>
                        {{/** buttons div */ }}
                        <div className='relative'>
                            <div className={buttonStyle} onClick={handleLikeButton}>
                                {isLiked ? <BookmarkHeartFill /> : <BookmarkHeart />}
                                <a>Like</a>
                            </div>
                            <div className={buttonStyle} onClick={handleDownloadButton}>
                                <CloudArrowDown />
                                <a>Download</a>
                            </div>
                        </div>
                        {{/** font stats */ }}
                        <div className='flex flex-wrap f5'>
                            <div className='w-50'>Likes:{' ' + likes}</div>
                            <div className='w-50'>Downloads:{' ' + downloads}</div>
                            <div>Last updated: {' ' + pdate.toLocalString().split(',')[0]}</div>
                            <div>License: {' ' + license}</div>
                        </div>
                        {{/** tags */ }}
                        <div className='flex flex-wrap mt5'>
                            <div className='f4 b'>Tags</div>
                            {tags.map(tag => {
                                return <div className={tagStyle}>{tag}</div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

// export async function getStaticPaths() {
//     // Get the ID array of all projects.
//     const pids = getAllProjectsID()

//     // Get the paths we want to pre-render based on pids
//     const paths = pids.map((pid) => ({
//         params: { id: pid },
//     }))

//     // We'll pre-render only these paths at build time.
//     // { fallback: false } means other routes should 404.
//     return { paths, fallback: false }
// }


// export async function getStaticProps({ params }) {
//     // get the project json by pid
//     const project = getProject(params.id)

//     // Pass post data to the page via props
//     return { props: { project } }
// }
