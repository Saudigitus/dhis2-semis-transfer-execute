import { useRecoilState } from "recoil";
import { ProgramConfig } from "dhis2-semis-types";
import React, { useEffect, useState } from "react";
import { TableDataRefetch, Modules } from "dhis2-semis-types";
import { useDataStoreKey } from "dhis2-semis-components";
import { Table, useProgramsKeys } from "dhis2-semis-components";
import EnrollmentActionsButtons from "../../components/enrollmentButtons/EnrollmentActionsButtons";
import { useGetSectionTypeLabel, useHeader, useTableData, useUrlParams, useViewPortWidth } from "dhis2-semis-functions";
import CustomInfoPage from "../info/infoPage";

const TransferExecute = () => {
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, totalPages: 0 });
  const { sectionName } = useGetSectionTypeLabel();
  const dataStoreData = useDataStoreKey({ sectionType: sectionName });
  const programsValues = useProgramsKeys();
  const programData = programsValues[0];
  const [selected, setSelected] = useState<any[]>([]);
  const { viewPortWidth } = useViewPortWidth();
  const { urlParameters } = useUrlParams();
  const { academicYear, grade, class: section, school, schoolName, } = urlParameters();
  const { getData, tableData, loading } = useTableData({ module: Modules.Enrollment, selectedDataStore: dataStoreData, });
  const { columns } = useHeader({ dataStoreData, programConfigData: programData as unknown as ProgramConfig, tableColumns: [], module: Modules.Enrollment, });
  const [filterState, setFilterState] = useState<{ dataElements: any; attributes: any; }>({ attributes: [], dataElements: [] });
  const [refetch] = useRecoilState(TableDataRefetch);

  useEffect(() => {
    if (school) {
      void getData({
        page: 1,
        pageSize: 10,
        program: programData.id as string,
        orgUnit: school,
        baseProgramStage: dataStoreData?.registration?.programStage as string,
        attributeFilters: filterState.attributes,
        dataElementFilters: [filterState.dataElements],
      });
    }
  }, [filterState, refetch, school, pagination]);

  useEffect(() => {
    const filters = [
      academicYear !== null
        ? `${dataStoreData.registration.academicYear}:in:${academicYear}`
        : null,
      grade !== null ? `${dataStoreData.registration.grade}:in:${grade}` : null,
      section !== null
        ? `${dataStoreData.registration.section}:in:${section}`
        : null,
    ].filter(Boolean); // Remove valores nulos

    setFilterState({ ...filterState, dataElements: filters.join(",") });
  }, [academicYear, grade, section]);

  return (
    <div style={{ height: "85vh" }}>
      {!(Boolean(schoolName) && Boolean(school)) ? (
        <CustomInfoPage />
      ) : (
        <Table
          programConfig={programData}
          title="Transfers"
          viewPortWidth={viewPortWidth}
          columns={columns}
          tableData={tableData.data}
          selectable={true}
          selected={selected}
          setSelected={setSelected}
          defaultFilterNumber={3}
          filterState={{ attributes: [], dataElements: [] }}
          loading={loading}
          rightElements={
            <EnrollmentActionsButtons
              selected={selected}
              setSelected={setSelected}
              selectedDataStoreKey={dataStoreData}
              programData={programData as unknown as ProgramConfig}
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
