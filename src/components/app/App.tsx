import { Suspense, lazy } from "react";
import { Header } from "@/components/layout/header";
import { Navigate, Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("@/components/pages/home/HomePage"));
const DescriptionPage = lazy(
  () => import("@/components/pages/description/DescriptionPage")
);

export const App = () => {
  return (
    <>
      <Header />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="description" element={<DescriptionPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </>
  );
};
