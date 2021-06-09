import React from 'react'
import Layout from '../Common/Layout'
import Carousel from './Carousel'

const Home = () => {

    const img = "https://source.unsplash.com/random"

    return (
        <Layout>
            <Carousel img={img} />
        </Layout>
    )
}

export default Home
