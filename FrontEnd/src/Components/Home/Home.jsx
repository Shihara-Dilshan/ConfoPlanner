import React, {useContext} from 'react'
import Layout from '../Common/Layout'
import Carousel from './Carousel'
import ConferenceData from './ConferenceData'
import ConferenceImages from './ConferenceImages'
import { AuthContext } from '../../util/Auth'

const Home = () => {


    const [currentUser, setCurrentUser] = useContext(AuthContext)

    const img = "https://source.unsplash.com/random"

    return (
        <Layout>
            <Carousel img={img} />
            <ConferenceData />
            <ConferenceImages />
        </Layout>
    )
}

export default Home
