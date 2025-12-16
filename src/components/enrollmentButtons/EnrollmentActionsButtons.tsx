import React from 'react'
import { Tooltip } from '@mui/material';
import { useUrlParams } from 'dhis2-semis-functions';
import styles from './enrollmentActionsButtons.module.css'
import { useNavigate, useLocation } from 'react-router-dom';
import RequestTransferModal from '../modal/requestTransferModa';
import { IconAddCircle24, Button, ButtonStrip, IconArrowLeft24 } from "@dhis2/ui";
import { D2I18n } from 'dhis2-semis-types';

interface EnrollmentActionsButtonsProps {
    selected: any
    setSelected: (args: any) => void
    i18n: D2I18n
}

function EnrollmentActionsButtons(props: EnrollmentActionsButtonsProps) {
    const navigate = useNavigate()
    const { search } = useLocation()
    const { selected, setSelected, i18n } = props
    const { urlParameters } = useUrlParams();
    const { school: orgUnit } = urlParameters;
    const [openRequestModal, setOpenRequestModal] = React.useState(false);

    return (
        <div className={styles.container}>
            <ButtonStrip className={styles.work_buttons}>
                <Button onClick={() => navigate(`/semis/transfer${search}`)} icon={<IconArrowLeft24 />}>
                    <span className={styles.work_buttons_text}>Back to Transfer</span>
                </Button>

                <Tooltip title={orgUnit === null ? i18n.t("Please select an organisation unit before") : selected?.length == 0 ? i18n.t("Select at least one row.") : ""}
                    onClick={() => setOpenRequestModal(true)}
                >
                    <span>
                        <Button disabled={(selected?.length == 0 && Boolean(orgUnit))} icon={<IconAddCircle24 />}>
                            <span className={styles.work_buttons_text}>{i18n.t("Execute transfer")}</span>
                        </Button>
                    </span>
                </Tooltip>
            </ButtonStrip>

            {openRequestModal && <RequestTransferModal i18n={i18n} setSelected={setSelected} selected={selected} open={openRequestModal} setOpen={setOpenRequestModal} />}
        </div>
    )
}

export default EnrollmentActionsButtons
