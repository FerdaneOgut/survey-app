import { useCallback } from "react";
import { SurveyOption } from "../../data/models/Survey";
import { CloseButton, Col, Form, Row } from "react-bootstrap";

interface Props {
  idx: number;
  onDelete: (i: number) => void;
  onChange: (i: number, value: string) => void;
  option: SurveyOption;
}

export function CreateSurveyOption(props: Props) {
  const { idx, option } = props;

  const onOptionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(idx, e.target.value);
  }, [idx, props]);
  const onDelete = useCallback(() => {
    props.onDelete(idx);
  }, [idx, props]);

  return <Form.Group key={idx} as={Row} controlId="formPlaintextEmail" style={{ padding: "0", marginBottom: "0px !important" }}>
    <Form.Label column sm="2">

    </Form.Label>
    <Col sm="7" style={{ padding: "0", marginBottom: "5px" }}>
      <div style={{ display: "flex", alignItems:"center" }}>
        <Form.Label>Option</Form.Label>
        <Form.Control type="text" onChange={onOptionChange} value={option?.name} />
        <CloseButton onClick={onDelete} />
      </div>
    </Col>
  </Form.Group>
}
