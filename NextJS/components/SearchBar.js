import { Search } from 'react-bootstrap-icons';
import { useState } from 'react'
export default function SearchBar() {
    const [lockReq, setLockReq] = useState(false)

    const handleInputChange = async function () {
        if (!lockReq) {
            const res = await getSuggestions()

        }
    }
    return (
        <div className='bg-black-80 pv3'>
            <form
                className='center mw6 br-pill ba pv2 ph3 bg-white relative black-80'
                action='URL'
                autoComplete='off'
                method='get'
                role='search'
            >
                <Search className='absolute f3' />
                <input
                    type='search'
                    placeholder='Search the community'
                    required
                    className='bn f4 outline-0 w-100 pl4 ml2'
                    onInput={handleInputChange}
                ></input>
            </form>
            <div className='mt2 bt1'>
            </div>
        </div>

    )
}