import { Route, Routes } from "react-router-dom";

import React from "react";
const Loading = () => <p>Loading ...</p>;
const Home = React.lazy(() => import('./pages/home'));
const CreateSurvey = React.lazy(() => import('./pages/create-survery'));
const SurveyPage = React.lazy(() => import('./pages/survey'));
const AppRoutes = () => {
  return (

    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-survey' element={<CreateSurvey />} />
        <Route  path="/survey/:id" element={<SurveyPage />} />
      </Routes>
    </React.Suspense>
  );
}
export default AppRoutes;