import { useCallback, useState } from "react";
import { Survey, SurveyQuestion } from "../../data/models/Survey";

import QuestionItem from "./QuestionItem";
import { QuestionAnswer } from "../../data/models/QuestionAnswer";
import { Alert, Button } from "react-bootstrap";

interface Props {
  survey?: Survey;
  onSubmit: (answers: Record<number, QuestionAnswer>) => void;
}

export function SurveyGenerator(props: Props) {
  const { survey } = props;
  const [answers, setAnswers] = useState<Record<number, QuestionAnswer>>({});
  const [error, setError] = useState<string>();

  const onSubmit = useCallback(() => {
    if (Object.keys(answers).length > 0 && survey?.questions?.length !== Object.keys(answers).length) {
      setError("Please answer the all questions of the Survey");
      return;
    }
    props.onSubmit(answers);
  }, [answers, props, survey]);

  const onOptionChange = useCallback((question: SurveyQuestion, answer: number) => {
    setAnswers(p => {
      const old = { ...p };
      old[question.id] = { answer: answer, question: question }
      return old;
    })
  }, []);

  return survey ? <div>

    <h3>
      {survey?.name}
    </h3>
    {error && <Alert key={"danger"} variant={"danger"}>
      {error}
    </Alert>}

    <div>
      {survey?.questions?.map((v, i) => <QuestionItem key={i} question={v} onOptionChange={(value) => onOptionChange(v, value)} />)}
    </div >
    <Button style={{ marginTop: "10px" }} variant="primary" onClick={onSubmit} disabled={Object.keys(answers).length === 0}>Submit</Button>
  </div>
    : <></>

}

