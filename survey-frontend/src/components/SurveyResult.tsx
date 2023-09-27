import { ListGroup } from "react-bootstrap";
import { QuestionAnswer } from "../data/models/QuestionAnswer";
import { Survey } from "../data/models/Survey"

interface Props {
  survey?: Survey;
  answers: Record<number, QuestionAnswer>;
}
export default function SurveyResult(props: Props) {
  const { survey, answers } = props;
  return <div>
    <h1>Answers of  `{survey?.name}`</h1>
    <ListGroup as="ol" numbered>
      {Object.entries(answers).map((v, i) =>
        <ListGroup.Item
          key={i}
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{v[1].question.name} </div>
            {v[1].question.options?.find(f => f.id === v[1].answer)?.name}
          </div>

        </ListGroup.Item>
      )}

    </ListGroup>

  </div>
}