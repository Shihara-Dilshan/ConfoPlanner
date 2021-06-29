import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { isAthenticated, isResearcher, isReviewer } from '..'

const ReviewerRoute = ({component: Component, ...rest}) => {
    return (
        <Route 
            {...rest}
            render={props=> 
                isResearcher() ? (
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
