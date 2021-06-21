import React, {useContext} from 'react'
import Layout from '../Common/Layout'
import Carousel from './Carousel'
import { AuthContext } from '../../util/Auth'

const Home = () => {


    const [currentUser, setCurrentUser] = useContext(AuthContext)

    const img = "https://source.unsplash.com/random"

    return (
        <Layout>
            <Carousel img={img} />
            {JSON.stringify(currentUser)}
        </Layout>
    )
}

export default Home
