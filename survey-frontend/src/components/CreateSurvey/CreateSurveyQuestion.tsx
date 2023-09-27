import { useCallback } from "react";
import { SurveyQuestion } from "../../data/models/Survey";
import { CreateSurveyOption } from "./CreateSurveyOption";
import { Button, CloseButton, Col, Form, Row } from "react-bootstrap";

interface Props {
  idx: number;
  onDeleteQuestion: (i: number) => void;
  onQuestionChange: (i: number, value: string) => void;
  question: SurveyQuestion;
  onDeleteOption: (answerIdx: number, optionIndex: number) => void;
  onOptionChange: (answerIdx: number, optionIndex: number, value: string) => void;
  addOption: (answerIdx: number) => void;
}

export function CreateSurveyQuestion(props: Props) {
  const { idx, question } = props;

  const onQuestionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    props.onQuestionChange(idx, e.target.value);
  }, [idx, props]);

  const addOptions = useCallback(() => {
    props.addOption(idx);
  }, [idx, props]);

  const onDelete = useCallback(() => {
    props.onDeleteQuestion(idx);
  }, [idx, props]);

  const onDeleteOption = useCallback((optionIndex: number) => {
    props.onDeleteOption(idx, optionIndex);
  }, [idx, props]);
  const onOptionChange = useCallback((optionIndex: number, value: string) => {
    props.onOptionChange(idx, optionIndex, value);
  }, [idx, props]);

  return <div key={idx}>
    <Form style={{ marginBottom: "15px" }}>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          <Form.Label>Question</Form.Label>
        </Form.Label>
        <Col sm="7">
          <Form.Control type="text" onChange={onQuestionChange} value={question?.name} />
        </Col>
        <Col sm="3">
          <Row>
            <Col sm="3">

              <CloseButton onClick={onDelete} />
            </Col>
            <Col>
              <Button variant="outline-success" size="sm" onClick={addOptions}>Add Options</Button>
            </Col>
          </Row>
        </Col>
      </Form.Group>
      {question?.options?.map((v, i) => <CreateSurveyOption key={i} idx={i} onDelete={onDeleteOption} onChange={onOptionChange} option={v} />)}
    </Form>

  </div>
}
