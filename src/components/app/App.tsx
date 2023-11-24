import { Header } from "@/components/layout/header";
import { DescriptionPage, HomePage } from "@/components/pages";
import peoplesStore from "@/store/peoplesStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export const App = observer(() => {
  const { getPeople } = peoplesStore;

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  return (
    <>
      <Header />

      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="description" element={<DescriptionPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
});
