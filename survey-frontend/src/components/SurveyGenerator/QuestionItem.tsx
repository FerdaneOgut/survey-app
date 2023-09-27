
import { Form } from "react-bootstrap";
import { SurveyQuestion } from "../../data/models/Survey";
import { useCallback } from "react";

interface Props {
  question: SurveyQuestion;
  onOptionChange: (selectedOption: number) => void;
}
export default function QuestionItem(props: Props) {
  const { question, onOptionChange } = props;
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onOptionChange(+e.target.value);
  }, [onOptionChange]);
  return <div key={question.id}>
    <Form.Group className="mb-3" >
      <Form.Label><b>{question.name}</b></Form.Label>
      <div onChange={onChange}> {question.options?.map((v, i) =>
        <div key={i}>
          <Form.Check
            type="radio"
            id={`${question.id}-${i}`}
            value={v.id}
            label={v.name}
            name={question.id.toString()}
          />

        </div>
      )}</div>
    </Form.Group>
  </div>;
}

