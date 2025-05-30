import React from 'react'
import { Tooltip } from '@mui/material';
import { useUrlParams } from 'dhis2-semis-functions';
import styles from './enrollmentActionsButtons.module.css'
import { useNavigate, useLocation } from 'react-router-dom';
import RequestTransferModal from '../modal/requestTransferModa';
import { IconAddCircle24, Button, ButtonStrip, IconArrowLeft24 } from "@dhis2/ui";

interface EnrollmentActionsButtonsProps {
    selected: any
    setSelected: (args: any) => void
}

function EnrollmentActionsButtons(props: EnrollmentActionsButtonsProps) {
    const navigate = useNavigate()
    const { search } = useLocation()
    const { selected, setSelected } = props
    const { urlParameters } = useUrlParams();
    const { school: orgUnit } = urlParameters();
    const [openRequestModal, setOpenRequestModal] = React.useState(false);

    return (
        <div className={styles.container}>
            <ButtonStrip className={styles.work_buttons}>
                <Button onClick={() => navigate(`/semis/transfer${search}`)} icon={<IconArrowLeft24 />}>
                    <span className={styles.work_buttons_text}>Back to Transfer</span>
                </Button>

                <Tooltip title={orgUnit === null ? "Please select an organisation unit before" : selected?.length == 0 ? "Select at least one row." : ""}
                    onClick={() => setOpenRequestModal(true)}
                >
                    <span>
                        <Button disabled={(selected?.length == 0 && Boolean(orgUnit))} icon={<IconAddCircle24 />}>
                            <span className={styles.work_buttons_text}>Execute transfer</span>
                        </Button>
                    </span>
                </Tooltip>
            </ButtonStrip>

            {openRequestModal && <RequestTransferModal setSelected={setSelected} selected={selected} open={openRequestModal} setOpen={setOpenRequestModal} />}
        </div>
    )
}

export default EnrollmentActionsButtons
