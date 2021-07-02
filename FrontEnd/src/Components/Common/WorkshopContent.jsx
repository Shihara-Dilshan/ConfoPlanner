import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import WorkshopCard from "./WorkshopCard"
import axios from 'axios';

const WorkshopContent = () => {
  const [workshopData, setWorkshopData] = useState([]);
  const [approvedWorkshops, setApprovedWorkshops] = useState([]);

  function getWorkshopData(workshops) {
    workshops.forEach(workshop => {
      axios.get(`http://localhost:5000/api/workshop/viewbyid/${workshop.workshop._id}`)
      .then(res => {
        let workshop = res.data.result[0];
        setWorkshopData(prevState => [...prevState, {
                workshop
              }]);
      })
      .catch(err => console.log(err));      
    });
  }

  useEffect( () => {
    axios
        .get('http://localhost:5000/api/conferences/60d76048aa132a4cf07b74dd')
        .then(res => {
          if(res.data.conference.sortedWorkshopSchedule) {
            const tempWorkshops = res.data.conference.sortedWorkshopSchedule.workshops.filter(
              workshop => workshop.isApproved == true
            );
            setApprovedWorkshops(tempWorkshops);
            getWorkshopData(tempWorkshops);
          }
          
        })
        .catch(err => console.log(err))
  }, []);
  
  return (
    <Layout>
      <div style={{display: 'flex', justifyContent: 'left',flexDirection: 'row', alignContent: 'center', flexWrap: 'wrap'}}>
          {workshopData.length != 0 ? workshopData.map((workshopData) =>
                <WorkshopCard workshopData={workshopData.workshop}/>
          ) : ""}
          </div>
    </Layout>
  );
};

export default WorkshopContent;
