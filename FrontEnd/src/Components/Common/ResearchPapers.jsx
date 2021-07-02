import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import ImgMediaCard from "./ResearchCard";

const ResearchPapers = () => {
  const [researchPapers, setResearchPapers] = useState([]);
  const [approvedPapers, setApprovedPapers] = useState([]);

  function getResearchPapers(papers) {
    papers.forEach(resPaper => {
      axios.get(`http://localhost:5000/api/paper/get/${resPaper.paper._id}`)
      .then(res => {
        let paper = res.data;
        setResearchPapers(prevState => [...prevState, {  paper }]);
      })
      .catch(err => console.log(err));
    });
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/conferences/60d76048aa132a4cf07b74dd")
      .then((res) => {
        if(res.data.conference.sortedPaperSchedule) { 
          const tempPapers = res.data.conference.sortedPaperSchedule.researchPapers.filter(
            paper => paper.isApproved == true
          );
          setApprovedPapers(tempPapers);
          getResearchPapers(tempPapers);
        }
        
        })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout>
      <div style={{display: 'flex', justifyContent: 'left',flexDirection: 'row', alignContent: 'center', flexWrap: 'wrap'}}>
          {researchPapers.length > 0 ? researchPapers.map((research) =>
                <ImgMediaCard researchData={research}/>
          ) : ''}
          </div>
    </Layout>
  );
};

export default ResearchPapers;
