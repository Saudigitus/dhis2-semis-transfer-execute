import { Center, CircularLoader, NoticeBox } from "@dhis2/ui";
import { format } from "date-fns";
import { CustomForm, ModalComponent, useDataStoreKey, WithBorder, WithPadding } from "dhis2-semis-components";
import { useGetDataElements, useShowAlerts, useUploadEvents, useUrlParams } from "dhis2-semis-functions";
import { useState } from "react";
import { Form } from "react-final-form";

export default function RequestTransferModal({ open, setOpen, selected, setSelected }: { setSelected: (args: any) => void, open: boolean, setOpen: (args: any) => void, selected: any }) {
    const { urlParameters } = useUrlParams()
    const { sectionType, school } = urlParameters()
    const { transfer } = useDataStoreKey({ sectionType: sectionType as unknown as "student" | "staff" })
    const { dataElements } = useGetDataElements({ programStageId: transfer?.programStage as unknown as string, type: "programStage" })
    const { hide, show } = useShowAlerts()
    const { uploadValues } = useUploadEvents()
    const [loading, setLoading] = useState(false)

    async function onSubmit(values: any) {
        setLoading(true)
        const dataElementsToPost = dataElements?.filter(x => x.id !== transfer.status)
        let proceed = true, dataElementsValues = []

        for (let dataElement of dataElementsToPost)
            if (!values[dataElement.id]) proceed = false
            else dataElementsValues.push({ dataElement: dataElement.id, value: values[dataElement.id] })

        if (proceed) {
            const events = []
            for (const event of selected) {
                events.push(
                    {
                        enrollment: event?.enrollmentId,
                        occurredAt: format(new Date(), "yyyy-MM-dd"),
                        orgUnit: school,
                        program: event?.program,
                        programStage: transfer?.programStage,
                        scheduledAt: format(new Date(), "yyyy-MM-dd"),
                        status: "ACTIVE",
                        trackedEntityInstance: event?.trackedEntity,
                        dataValues: [
                            ...dataElementsValues,
                            { dataElement: transfer.status, value: 'Pending' }
                        ]
                    })
            }

            await uploadValues({ events: events }, 'COMMIT', 'CREATE_AND_UPDATE')
                .then(() => {
                    setLoading(false);
                    setOpen(false);
                    setSelected([])
                    show({
                        message: `Transfer request sent successfully`,
                        type: { success: true }
                    });
                    setTimeout(hide, 5000);
                })
                .catch(() => { setLoading(false); setOpen(false) })
        } else {
            show({
                message: `Please fill all required fields`,
                type: { warning: true }
            });
            setTimeout(hide, 5000);
        }
    }

    return (
        <ModalComponent
            open={open}
            size="large"
            children={<WithPadding>
                <NoticeBox
                    title={`WARNING! ${selected?.length} rows will be affected`} warning>
                </NoticeBox>
                <WithPadding />
                <WithBorder type="all" >
                    <WithPadding>
                        {
                            dataElements.length > 0 ?
                                <CustomForm
                                    Form={Form}
                                    loading={loading}
                                    initialValues={{}}
                                    formFields={[
                                        {
                                            storyBook: false,
                                            name: "Final Result",
                                            description: "Student final result",
                                            fields: dataElements?.filter(x => x.id !== transfer.status)
                                        }
                                    ]}
                                    storyBook={false}
                                    withButtons={true}
                                    onFormSubtmit={(e) => onSubmit(e)}
                                    onCancel={() => setOpen(false)}
                                /> : <Center>
                                    <CircularLoader />
                                </Center>
                        }
                    </WithPadding>
                </WithBorder>
            </WithPadding>}
            title="Request transfer"
            handleClose={() => setOpen(false)}
        />
    )
}