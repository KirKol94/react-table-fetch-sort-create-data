import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "../loader";
import { PATH } from "@/consts/paths";

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
        <Route path={PATH.ABOUT} element={<DescriptionPage />} />
        <Route path={PATH.CREATE} element={<CreatePage />} />
        <Route path="*" element={<Navigate to={PATH.BASE} />} />
      </Routes>
    </Suspense>
  );
};
