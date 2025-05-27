import React from "react";
import { TransferExecute } from "../../pages";
import { Routes, Route } from "react-router-dom";
import WithHeaderBarLayout from "../../layout/WithHeaderBarLayout";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<WithHeaderBarLayout />}>
        <Route
          key={"transfer-execute"}
          path={"/"}
          element={<TransferExecute />}
        />
      </Route>
    </Routes>
  );
}
