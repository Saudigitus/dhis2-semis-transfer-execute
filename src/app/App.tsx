import '../index.css'
import React from 'react'
import './App.module.css'
import { Router } from '../components/routes'
import { AppWrapper } from 'dhis2-semis-components'
import { useConfig } from '@dhis2/app-runtime'
import { HashRouter } from 'react-router-dom'
import { D2I18n } from 'dhis2-semis-types'

const TransferExecute = ({ i18n }: { i18n: D2I18n }) => {
    const { baseUrl } = useConfig()

    return (
        // <AppWrapper
        //     baseUrl={baseUrl}
        //     dataStoreKey="dataStore/semis/values"
        //     schoolCalendarKey={"dataStore/semis/schoolCalendar"}
        // >
        //     <HashRouter>
        <Router i18n={i18n} />
        //     </HashRouter>
        // </AppWrapper>
    )
}

export default TransferExecute