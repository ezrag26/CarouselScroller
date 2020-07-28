import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

const randomBits = () => Math.random().toString(36).slice(2)

const CarouselBanner = ({ images, playOnLoad }) => {
  const [current, setCurrent] = useState(0)
  const [intervalId, setIntervalId] = useState()
  const [playToggle, setPlayToggle] = useState(playOnLoad)

  const next = () => {
    setCurrent(i => (i + 1) % (images.length))
  }

  const prev = () => {
    setCurrent(i => i === 0 ? images.length - 1 : i - 1)
  }

  const togglePlayButton = () => {
    setPlayToggle(val => !val)
  }

  const play = () => {
    setIntervalId(setInterval(() => {
      next()
    }, 3500))
  }

  const pause = () => {
    clearInterval(intervalId)
  }

  useEffect(() => {
    if (playToggle) play()
    else pause()
  },[playToggle])

  return (
    <>
      <div className={'banner'} style={{ backgroundImage: `url("${images[current]}")` }}>
        <div className={'button'} onClick={prev}><span style={{ paddingRight: '30px' }}>&lang;</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', width: '60%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            {images.map((image, i) => {
              return <span key={randomBits()} className={i === current ? 'highlight' : ''} style={{ fontSize: '3em' }}>&bull;</span>
            })}
          </div>
          <div>
            <button onClick={togglePlayButton}>{playToggle ? '\u23F8' : '\u25BA'}</button>
          </div>
        </div>
        <div className={'button'} onClick={next}><span style={{ paddingLeft: '30px' }}>&rang;</span></div>
      </div>
    </>
  )
}

ReactDOM.render(<CarouselBanner images={[
  "https://besthqwallpapers.com/Uploads/20-2-2018/41623/thumb2-new-jersey-devils-4k-nhl-hockey-club-eastern-conference.jpg",
  "https://cdn.hipwallpaper.com/i/52/32/pAh0wX.jpg",
  "https://c4.wallpaperflare.com/wallpaper/495/788/909/hockey-new-jersey-devils-emblem-logo-nhl-hd-wallpaper-preview.jpg"
]} playOnLoad={false}/>, document.querySelector('#root'))