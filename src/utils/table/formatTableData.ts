import { TableDataProps } from "../../../../../libs/components/src/types/table/TableContentProps";

export function formatTableData({ tableData, transferStatus, statusOptions }:
    { tableData: TableDataProps[], transferStatus: string, statusOptions: any[] }
) {
    return tableData?.map((item) => ({
        ...item,
        disabled: item.programStageEvent
            && item[transferStatus] === statusOptions?.find((opt) => opt?.configKey === "penddingCode")?.code,
    }))
}