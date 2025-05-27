import '../index.css'
import React from 'react'
import './App.module.css'
import { Router } from '../components/routes'
import { HashRouter } from 'react-router-dom'
import { AppWrapper } from 'dhis2-semis-components'

const MyApp = () => {

    return (
        <AppWrapper baseUrl="http://localhost:8080" dataStoreKey='dataStore/semis/values'>
            <HashRouter>
                <Router />
            </HashRouter>
        </AppWrapper>
    )
}

export default MyApp
