import { Outlet } from "react-router-dom"
import { useConfig } from "@dhis2/app-runtime"
import { HeaderBarLayout, SemisHeader } from "dhis2-semis-components"

const WithHeaderBarLayout = () => {
    const { baseUrl } = useConfig()

    return (
        <HeaderBarLayout
            header={
                <SemisHeader
                    baseUrl={baseUrl}
                    academicYears={{
                        options: [
                            { label: '2024', value: '2024' },
                            { label: '2023', value: '2023' },
                            { label: '2022', value: '2022' }
                        ]
                    }}
                    orgunits={{
                        options: []
                    }}
                />
            }
        >
            <Outlet />
        </HeaderBarLayout>
    )
}

export default WithHeaderBarLayout