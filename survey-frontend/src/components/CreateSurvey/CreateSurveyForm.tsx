import { useCallback, useState } from "react"
import { Survey, SurveyOption, SurveyQuestion } from "../../data/models/Survey";
import { CreateSurveyQuestion } from "./CreateSurveyQuestion";
import SurveyService from "../../data/services/surveyService";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function CreateSurveyForm() {
  const [survey, setSurvey] = useState<Survey>();
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const onSurveyChnage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSurvey(v => {
      if (v) {
        return { ...v, name: e.target.value };
      }
      else
        return { id: 0, name: e.target.value };
    })
  }, []);

  const addQuestion = useCallback(() => {
    if (survey) {
      let s = { ...survey };
      const newQuestion: SurveyQuestion = { id: 0, name: "" };
      if (s?.questions) {
        s.questions.push(newQuestion)
      }
      else
        s.questions = [newQuestion];
      setSurvey(s);
    }
  }, [survey]);

  const addOption = useCallback((questionIdx: number) => {
    if (survey) {
      let s = { ...survey };
      const newOption: SurveyOption = { id: 0, name: "" };
      if (s.questions) {

        if (s.questions?.[questionIdx].options) {
          s.questions[questionIdx].options?.push(newOption)
        }
        else
          s.questions[questionIdx].options = [newOption];
      }
      setSurvey(s);
    }
  }, [survey]);

  const onQuestionChange = useCallback((i: number, value: string) => {
    if (survey) {
      const s = { ...survey };
      const q = s.questions?.[i]!;
      if (q) {
        q.name = value;
      }
      setSurvey(s);
    }
  }, [survey]);

  const onDeleteQuestion = useCallback((i: number) => {
    if (survey) {
      const s = { ...survey };
      s.questions?.splice(i, 1);
      setSurvey(s);
    }
  }, [survey]);

  const onOptionChange = useCallback((questionIndex: number, optionIndex: number, value: string) => {
    if (survey) {
      const s = { ...survey };
      const o = s.questions?.[questionIndex].options?.[optionIndex]!;
      if (o) {
        o.name = value;
      }
      setSurvey(s);
    }

  }, [survey]);

  const onDeleteOption = useCallback((questionIndex: number, optionIndex: number) => {
    if (survey) {
      const s = { ...survey };
      s.questions?.[questionIndex].options?.splice(optionIndex, 1);
      setSurvey(s);
    }
  }, [survey]);

  const checkForError = useCallback(() => {
    const surveyError = !survey || !survey.name;
    const questionError = survey?.questions?.some(s => !s.name);
    const optionEmptyError = survey?.questions?.some(s => s.options?.some(v => !v.name));
    if (surveyError || questionError || optionEmptyError) {
      return "Please fill the empty fields!"
    }
    const optionLengthError = survey?.questions?.some(s => !s.options || s.options?.length <= 1);
    if (optionLengthError) {
      return "Please enter at least two options per questions."
    }
    return undefined;
  }, [survey]);

  const onCreateSurvey = useCallback(() => {
    if (survey) {
      const getError = checkForError();
      if (getError) {
        setError(getError);
        return;
      }
      SurveyService.createSurvery(survey).then(f => navigate("/"));
    }
  }, [navigate, survey, checkForError]);

  return <>
    <Form>
      {error && <Alert key={"danger"} variant={"danger"}>
        {error}
      </Alert>}

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" name="name" onChange={onSurveyChnage} />
      </Form.Group>

    </Form>
    <Button style={{ marginTop: "10px" }} variant="danger" onClick={addQuestion} disabled={survey === undefined}>Add Question</Button>

    {survey?.questions?.map((v, i) => <CreateSurveyQuestion key={i} idx={i}
      onDeleteQuestion={onDeleteQuestion}
      onQuestionChange={onQuestionChange}
      question={v}
      onOptionChange={onOptionChange}
      onDeleteOption={onDeleteOption} addOption={addOption} />)}
    <div>
      <Button style={{ marginTop: "10px" }} variant="primary" onClick={onCreateSurvey} disabled={survey === undefined || !survey.name}>Create Survery</Button>
    </div>
  </>
} 