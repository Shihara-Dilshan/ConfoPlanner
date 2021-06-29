import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import ImgMediaCard from "./ResearchCard";

const ResearchPapers = () => {
  const [researchPapers, setResearchPapers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/paper/getall")
      .then((res) =>
        setResearchPapers(
          res.data.result.filter((data) => data.status === "Approved")
        )
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout>
      <div style={{display: 'flex', justifyContent: 'left',flexDirection: 'row', alignContent: 'center', flexWrap: 'wrap'}}>
          {researchPapers.map((research) =>
                <ImgMediaCard researchData={research}/>
          )}
          </div>
    </Layout>
  );
};

export default ResearchPapers;
