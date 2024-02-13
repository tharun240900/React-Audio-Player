import React, { useContext, useEffect, useRef } from 'react';
import './player.css';
import MyConetxt from './MyContext';


function Player() {

    const n = useRef(true);

    const { song, setsong, a } = useContext(MyConetxt);
    let { name, src, img } = song;

    const audio = useRef(null);
    const playAndPause = useRef(null);
    const mute = useRef(null);
    const loopBtn = useRef(null);
    const progresser = useRef(null);
    const durationUpdate = useRef(null);
    const totalDuration = useRef(null);
    const volume = useRef(null);
    const shuf = useRef(null);


    useEffect(() => {
        progresser.current.value = audio.current.currentTime + "";

        let a = audio.current;

        const handleLoadedMetadata = () => {
            const [min, sec] = minAndSec(audio.current.duration);
            totalDuration.current.innerText = min.padStart(2, '0') + ":" + sec.padStart(2, '0');
            volume.current.style.backgroundImage = `linear-gradient(to right, white 0%, white 100%, rgb(69, 69, 69) 100%, rgb(69, 69, 69) 100%)`;
            volume.current.value = '100';
            progresser.current.value = '0';
            progresser.current.style.backgroundImage = `linear-gradient(to right, white 0%, white 0%, rgb(69, 69, 69) 0%, rgb(69, 69, 69) 100%)`;

            // audio.current.play();
            // playAndPause.current.classList.add('fa-circle-pause');
            // playAndPause.current.classList.remove('fa-circle-play');
        };

        a.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            a.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [src])


    function playPause() {
        let a = audio.current;
        if (a.paused) {
            a.play();
            playAndPause.current.classList.add('fa-circle-pause');
            playAndPause.current.classList.remove('fa-circle-play');
        }
        else {
            a.pause();
            playAndPause.current.classList.add('fa-circle-play');
            playAndPause.current.classList.remove('fa-circle-pause');
        }
    }

    function muteUnMute() {
        let a = audio.current;
        if (a.muted) {
            a.muted = false;
            mute.current.classList.add('fa-volume-high');
            mute.current.classList.remove('fa-volume-xmark');
        }
        else {
            a.muted = true;
            mute.current.classList.remove('fa-volume-high');
            mute.current.classList.add('fa-volume-xmark');
        }
    }

    function loop() {
        let a = audio.current;
        if (a.loop) {
            a.loop = false;
            loopBtn.current.classList.add('text-light');
            loopBtn.current.classList.remove('text-success');
        } else {
            a.loop = true;
            loopBtn.current.classList.add('text-success');
            loopBtn.current.classList.remove('text-light');
        }
    }
    //---------------------------------------------------------
    //progresser
    function progrsser(e) {
        audio.current.currentTime = (Number(e.target.value) * audio.current.duration) / 100;
    }

    function timeUpdate(e) {
        let a = audio.current;
        let gradient = (a.currentTime / a.duration) * 100;
        progresser.current.value = gradient;
        progresser.current.style.backgroundImage = `linear-gradient(to right, white 0%, white ${gradient}%, rgb(69, 69, 69) ${gradient}%, rgb(69, 69, 69) 100%)`;
        time(a.currentTime);
        if (a.currentTime === a.duration) {

            if (n.current) forward();
            else shuffle();
            // forward();
            audio.current.addEventListener('loadedmetadata', function () {
                this.play();
            })
        }
    }
    function time(val) {
        const [min, sec] = minAndSec(val);
        durationUpdate.current.innerText = min.padStart(2, '0') + ":" + sec.padStart(2, '0');
    }

    // coverting seconds to minutes and seconds
    function minAndSec(val) {
        let x = val / 60;
        let min = Math.trunc(x) + "";
        let sec = Math.trunc((x - min) * 60) + "";
        return [min, sec];
    }

    //volume-------------------------------

    function volumeChange(e) {
        let gradient = e.target.value;
        audio.current.volume = gradient / 100;
        e.target.style.backgroundImage = `linear-gradient(to right, white 0%, white ${gradient}%, rgb(69, 69, 69) ${gradient}%, rgb(69, 69, 69) 100%)`;
    }

    function hover() {
        volume.current.style.display = 'inline-block';
    }
    function hoverOut() {
        volume.current.style.display = 'none';
    }
    //---------------------------------------------------------------
    //forward and backward
    function backward() {
        let position = songIndex();
        if (position === 0) settingSong(a.length - 1);
        else settingSong(position - 1);
    }
    function forward() {
        let position = songIndex();
        if (position === a.length - 1) settingSong(0);
        else settingSong(position + 1);
    }

    function settingSong(val) {
        if (val >= 0 && val <= a.length - 1) setsong(a[val]);
    }

    //Shuffling the song ----------------------------------------------------

    function shuffling() {
        if (n.current) {
            n.current = false;
            shuf.current.classList.add("text-success");
            shuf.current.classList.remove("text-light");
        }
        else {
            n.current = true;
            shuf.current.classList.remove("text-success");
            shuf.current.classList.add("text-light");
        }
    }

    function shuffle() {
        settingSong(x());
    }
    function x() {
        let i = Math.trunc(Math.random() * 5);
        console.log(i)
        if (songIndex() !== i) {
            return i;
        }
        else return shuffle();
    }
    //----------------------------------------------------------------------
    function songIndex() {
        for (let i = 0; i < a.length; i++)
            if (JSON.stringify(song) === JSON.stringify(a[i])) return i;
    }

    return (
        <>
            <audio src={src} ref={audio} onTimeUpdate={timeUpdate} ></audio>
            <div className='card ' id='card'>
                <img src={img} alt="error" className='card-img-top p-2' />
                <h5 className="card-text text-center text-light p-1">{name}</h5>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <input type="range" min={0} max={100} id="rng" onInput={progrsser} ref={progresser} />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-2  d-flex justify-content-evenly align-items-center">
                            <span className='mx-1 text-light' ref={durationUpdate}>00:00</span>
                        </div>
                        <div className="col-8"></div>
                        <div className="col-2  d-flex justify-content-evenly align-items-center">
                            <span className='mx-1 text-light' ref={totalDuration}>00:00</span>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-3 d-flex justify-content-between align-items-center">
                            <button onClick={loop}><i ref={loopBtn} className="fa-solid fa-repeat text-light"></i></button>
                            <button onClick={shuffling} ><i className="fa-solid fa-shuffle text-light" ref={shuf}></i></button>
                        </div>
                        <div className="col-6 d-flex justify-content-evenly align-items-center">
                            <button onClick={backward}><i className="fa-solid fa-backward-step text-light"></i></button>
                            <button onClick={playPause} id='playPause'><i className="fa-solid fa-circle-play text-light" ref={playAndPause}></i></button>
                            <button onClick={forward}><i className="fa-solid fa-forward-step text-light"></i></button>
                        </div>
                        <div className="col-3 py-0  d-flex justify-content-end align-items-center" id='vlumeParent' onMouseOver={hover} onMouseOut={hoverOut}>
                            <input type="range" id='volume' className='mr-2' ref={volume} onChange={volumeChange} min={0} max={100} />
                            <button onClick={muteUnMute} ><i ref={mute} className="fa-solid fa-volume-high text-light"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Player;