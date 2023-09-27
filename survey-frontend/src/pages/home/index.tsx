
import { SurveryList } from "../../components/SurveryList";

const Home = () => {
  return <div style={{ display: "flex", flexDirection: "column" }}>
    <div style={{marginTop:"10px"}}>
      <h6>Survey List</h6>
      <SurveryList />
    </div>
  </div>;
}
export default Home;