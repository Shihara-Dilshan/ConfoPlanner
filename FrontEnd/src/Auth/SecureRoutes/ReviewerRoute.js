import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { isAthenticated, isReviewer } from '..'

const ReviewerRoute = ({component: Component, ...rest}) => {
    return (
        <Route 
            {...rest}
            render={props=> 
                isReviewer() ? (
                   <Component {...props}/> 
                ): (
                    <Redirect 
                        to={{
                            pathname: '/login',
                            state: {from: props.location}
                        }}
                    />
                )}
        />
    )
}

export default ReviewerRoute
