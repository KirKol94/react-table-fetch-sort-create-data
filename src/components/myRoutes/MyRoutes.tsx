import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "../loader";

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const CreatePage = lazy(() => import("@/pages/create/Create"));
const DescriptionPage = lazy(
  () => import("@/pages/description/DescriptionPage")
);

export const MyRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="description" element={<DescriptionPage />} />
        <Route path="create" element={<CreatePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};
