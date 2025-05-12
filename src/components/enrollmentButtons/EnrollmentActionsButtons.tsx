import React from 'react'
import { IconAddCircle24, Button, ButtonStrip } from "@dhis2/ui";
import Tooltip from '@material-ui/core/Tooltip';
import styles from './enrollmentActionsButtons.module.css'
import { useUrlParams } from 'dhis2-semis-functions';
import { ProgramConfig, selectedDataStoreKey } from 'dhis2-semis-types'
import RequestTransferModal from '../modal/requestTransferModa';

function EnrollmentActionsButtons({ programData, selectedDataStoreKey, selected, setSelected }: { setSelected: (args: any) => void, selected: any, programData: ProgramConfig, selectedDataStoreKey: selectedDataStoreKey }) {
    const { urlParameters } = useUrlParams();
    const { school: orgUnit } = urlParameters();
    const [openRequestModal, setOpenRequestModal] = React.useState(false);

    return (
        <div className={styles.container}>
            <ButtonStrip className={styles.work_buttons}>
                <Tooltip title={orgUnit === null ? "Please select an organisation unit before" : ""}
                    onClick={() => setOpenRequestModal(true)}
                >
                    <span>
                        <Button disabled={(selected?.length == 0 && Boolean(orgUnit))} icon={<IconAddCircle24 />}>
                            <span className={styles.work_buttons_text}>Execute transfer</span>
                        </Button>
                    </span>
                </Tooltip>
            </ButtonStrip>

            {openRequestModal && <RequestTransferModal setSelected={setSelected} programData={programData} selectedDataStoreKey={selectedDataStoreKey} selected={selected} open={openRequestModal} setOpen={setOpenRequestModal} />}
        </div>
    )
}

export default EnrollmentActionsButtons
