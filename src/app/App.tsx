import React from 'react'
import './App.module.css'
import { AppWrapper } from 'dhis2-semis-components'
import { Router } from '../components/routes'
import '../index.css'

const MyApp = () => {

    return (
        <AppWrapper dataStoreKey='dataStore/semis/values'>
            <Router />
        </AppWrapper>
    )
}

export default MyApp
