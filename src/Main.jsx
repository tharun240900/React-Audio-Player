import React, { useRef, useState } from 'react'
import Player from './Player'
import './main.css';
import MyConetxt from './MyContext';


function Main() {
    const a = [
        { name: 'Lingidi_Telugu', src: './audio/Lingidi.mp3', img: './images/Lingidi.jpg' },
        { name: 'Sweetheart_Hindi', src: './audio/Sweetheart.mp3', img: './images/SweetHeart.jpg' },
        { name: 'Kantara_Kannada', src: './audio/Kantara.mp3', img: './images/Kantara.jpg' },
        { name: 'Paiya_Tamil', src: './audio/Paiya-ThuliThuli.mp3', img: './images/Paiya.jpg' },
        { name: 'Maangalyam_Malayalam', src: './audio/Maangalyam.mp3', img: './images/maanglyam.webp' }
    ]

    // let song = a[0];
    const [song, setsong] = useState(a[0]);



    return (
        <MyConetxt.Provider value={{ song, setsong, a }}>
            <div className='d-flex justify-content-center flex-wrap m-0 p-0'>

                <Player />

                <div className="card p-1" id='songsList'>
                    <h4 className='card-title text-center text-light  m-2'> Songs List</h4>
                    {a.map((e, i) => {
                        return (
                            <button key={i} className='card m-1 border-1 ' onClick={() => { setsong(e) }}>
                                <i className='m-2'>{i + 1}.<span>   </span>{e.name}</i>
                            </button>
                        )
                    })}
                </div>
            </div>
        </MyConetxt.Provider>
    )
}

export default Main