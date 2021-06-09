import React from 'react'
import Carousel from './Carousel'

const Home = () => {

    const img = "https://source.unsplash.com/random"

    return (
        <div>
            <Carousel img={img} />
        </div>
    )
}

export default Home
