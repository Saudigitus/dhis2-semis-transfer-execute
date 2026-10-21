// A row of the table: the enrollment values plus the latest transfer record of the learner.
type TableDataProps = Record<string, any>

export function formatTableData({ tableData, transferStatus, statusOptions }:
    { tableData: TableDataProps[], transferStatus: string, statusOptions: any[] }
) {
    return tableData?.map((item) => ({
        ...item,
        disabled: item.programStageEvent
            && item[transferStatus] === statusOptions?.find((opt) => opt?.configKey === "penddingCode")?.code,
    }))
}