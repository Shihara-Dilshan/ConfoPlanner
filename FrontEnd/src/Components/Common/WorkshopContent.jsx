import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import WorkshopCard from "./WorkshopCard"
import axios from 'axios';

const WorkshopContent = () => {
  const [workshopData, setWorkshopData] = useState([]);

  useEffect( () => {
    axios
        .get('http://localhost:5000/api/workshop/view/all')
        .then(res => setWorkshopData(res.data.result.filter(data => data.status === "Approved")))
        .catch(err => console.log(err))
  }, []);
  
  return (
    <Layout>
      <div style={{display: 'flex', justifyContent: 'left',flexDirection: 'row', alignContent: 'center', flexWrap: 'wrap'}}>
          {workshopData.map((workshopData) =>
                <WorkshopCard workshopData={workshopData}/>
          )}
          </div>
    </Layout>
  );
};

export default WorkshopContent;
