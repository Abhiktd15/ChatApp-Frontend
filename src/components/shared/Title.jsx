import React from 'react'
import {Helmet} from 'react-helmet-async'

const Title = ({title="Talkative",description="This is a Chat App called Talkative"}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
        </Helmet>
    )
}

export default Title