import { useCallback, useEffect, useMemo, useState } from "react"
import SurveyService from "../data/services/surveyService";
import { Survey } from "../data/models/Survey";
import { Link, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

export function SurveryList() {
  const [surveys, setSurveys] = useState<Survey[]>([]);

  const navigate = useNavigate();
  const createSurvey = useCallback(() => {
    navigate("/create-survey");
  }, [navigate]);


  const getBody = useMemo(() =>
    surveys.map((v, i) => <tr key={i}>
      <td>{v.id}</td>
      <td>{v.name}</td>
      <td> <Link to={`/survey/${v.id}`}>Go to Survey</Link> </td>
    </tr>)
    , [surveys]);

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await SurveyService.getAll();
        setSurveys(resp.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

  }, []);
  return <div>
    <Button style={{ marginTop: "10px" }} variant="primary" onClick={createSurvey}>Create a New Survery</Button>
    <Table striped bordered hover style={{ marginTop: "30px" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {getBody}
      </tbody>
    </Table>

  </div>
}
