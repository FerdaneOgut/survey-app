import { Survey } from "../models/Survey";
import http from "./../http.common";
const getAll = () => {
  return http.get<Array<Survey>>("/survey");
};
const createSurvery = (body:Survey) => {
  return http.post<Survey>("/survey",body);
};
const getByID = (id:number|string) => {
  return http.get<Survey>(`/survey/${id}`);
};

const SurveyService = {
  getAll,
  createSurvery,
  getByID
};

export default SurveyService