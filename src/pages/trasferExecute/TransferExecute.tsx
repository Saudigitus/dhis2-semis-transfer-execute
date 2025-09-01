import { useRecoilState } from "recoil";
import CustomInfoPage from "../info/infoPage";
import { Table } from "dhis2-semis-components";
import { ProgramConfig } from "dhis2-semis-types";
import React, { useEffect, useState } from "react";
import { TableDataRefetch, Modules } from "dhis2-semis-types";
import useGetSelectedKeys from "../../hooks/config/useGetSelectedKeys";
import { useHeader, useTableData, useUrlParams, useViewPortWidth } from "dhis2-semis-functions";
import EnrollmentActionsButtons from "../../components/enrollmentButtons/EnrollmentActionsButtons";

const TransferExecute = () => {
  const { urlParameters } = useUrlParams();
  const { viewPortWidth } = useViewPortWidth();
  const [refetch] = useRecoilState(TableDataRefetch);
  const [selected, setSelected] = useState<any[]>([]);
  const { dataStoreData, program: programData } = useGetSelectedKeys()
  const { academicYear, grade, class: section, school, schoolName, } = urlParameters();
  const { getData, tableData, loading } = useTableData({ module: Modules.Transfer });
  const [pagination, setPagination] = useState({ page: 1, pageSize: 50, totalPages: 0, totalElements: 0 });
  const [filterState, setFilterState] = useState<{ dataElements: any; attributes: any; }>({ attributes: [], dataElements: [] });
  const { columns } = useHeader({ dataStoreData, programConfigData: programData as unknown as ProgramConfig, programStage: "" });

  useEffect(() => {
    if (school) {
      void getData({
        page: pagination.page,
        pageSize: pagination.pageSize,
        program: programData!.id as string,
        orgUnit: school,
        order: dataStoreData?.defaults?.defaultOrder,
        baseProgramStage: dataStoreData?.registration?.programStage as string,
        attributeFilters: filterState.attributes,
        dataElementFilters: [
          academicYear !== null ? `${dataStoreData.registration.academicYear}:in:${academicYear}` : null,
          grade !== null ? `${dataStoreData.registration.grade}:in:${grade}` : null,
          section !== null ? `${dataStoreData.registration.section}:in:${section}` : null,
        ].filter((filter): filter is string => filter !== null),
      });
    }
  }, [filterState, refetch, school, pagination.page, pagination.pageSize, academicYear, grade, section]);

  useEffect(() => {
    setPagination((prev: any) => ({ ...prev, totalPages: tableData?.pagination?.totalPages, totalElements: tableData?.pagination?.totalElements }))
  }, [tableData])

  return (
    <div style={{ height: "85vh" }}>
      {!(Boolean(schoolName) && Boolean(school)) ? (
        <CustomInfoPage />
      ) : (
        <Table
          programConfig={programData!}
          title="Transfer Execute"
          viewPortWidth={viewPortWidth}
          columns={columns}
          tableData={tableData.data}
          selectable={true}
          selected={selected}
          setSelected={setSelected}
          defaultFilterNumber={5}
          filterState={{ attributes: [], dataElements: [] }}
          loading={loading}
          rightElements={
            <EnrollmentActionsButtons
              selected={selected}
              setSelected={setSelected}
            />
          }
          setFilterState={setFilterState}
          pagination={pagination}
          setPagination={setPagination}
        />
      )}
    </div>
  );
};

export default TransferExecute;