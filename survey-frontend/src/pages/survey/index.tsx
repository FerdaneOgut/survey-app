import { useParams } from "react-router-dom";
import { SurveyGenerator } from "../../components/SurveyGenerator";
import { useEffect, useState } from "react";
import { Survey } from "../../data/models/Survey";
import SurveyService from "../../data/services/surveyService";
import { QuestionAnswer } from "../../data/models/QuestionAnswer";
import SurveyResult from "../../components/SurveyResult";

export default function SurveyPage() {
  const { id } = useParams();
  const [survey, setSurvey] = useState<Survey>();
  const [answers, setAnswers] = useState<Record<number, QuestionAnswer>>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await SurveyService.getByID(id!);
        setSurvey(resp.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);
  console.log(answers);

  return Object.keys(answers).length > 0 ?
    <SurveyResult survey={survey} answers={answers} /> :
    <SurveyGenerator survey={survey} onSubmit={(answers) => setAnswers(answers)} />

}