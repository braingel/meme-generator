// import memesData from "./memesData"
import { useState, useEffect } from "react"

export default function Form() {
    // const [memeImage, setMemeImage] = useState("https://i.imgflip.com/3si4.jpg")
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/3si4.jpg"
    })

    const [allMemeImages, setAllMemeImages] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemeImages(data.data.memes))
    }, [])
    
    function getMemeImage() {
        // const memesArray = memesData.data.memes
        const randomNumber = Math.floor(Math.random() * allMemeImages.length)
        const imageURL = allMemeImages[randomNumber].url
        setMeme(prevState => ({
            ...prevState,
            randomImage: imageURL
        }))
        // const {url} = memesArray[randomNumber] // object destructuring, returns the url of the object
        // setMemeImage(imageURL)
    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    // how to update a variable so that it would then replace the valule on the screen to the new variable?
    return (
        <main>
            <div className="meme-form">
                <label>
                    Top text
                    <input 
                        type="text" 
                        className="form--input" 
                        placeholder="Shut up"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Bottom text
                    <input 
                        type="text" 
                        className="form--input" 
                        placeholder="And take my money"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                </label>
                <button className="form--button" onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image"/>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}