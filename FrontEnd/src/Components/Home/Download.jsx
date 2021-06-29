import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Layout from '../Common/Layout'
import ImgMediaCard from "./../Download/ResearchCard";
import WorkshopCard from "./../Download/WorkshopCard";
import axios from 'axios';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));


const Download = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [researchPapers, setResearchPapers] = useState([]);
  const [workshopData, setWorkshopData] = useState([]);

  useEffect( () => {
    axios
        .get('http://localhost:5000/api/paper/getall')
        .then(res => setResearchPapers(res.data.result))
        .catch(err => console.log(err))
  }, []);

  useEffect( () => {
    axios
        .get('http://localhost:5000/api/workshop/view/all')
        .then(res => setWorkshopData(res.data.result))
        .catch(err => console.log(err))
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
      <Layout>
    <div className={classes.root} style={{width: '100%'}}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Download Research Papers" {...a11yProps(0)} />
          <Tab label="Download Workshop Presentations" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div style={{display: 'flex', justifyContent: 'left',flexDirection: 'row', alignContent: 'center', flexWrap: 'wrap'}}>
          {researchPapers.map((research) =>
                <ImgMediaCard researchData={research}/>
          )}
          </div>
          
          
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <div style={{display: 'flex', justifyContent: 'left',flexDirection: 'row', alignContent: 'center', flexWrap: 'wrap'}}>
          {workshopData.map((workshopData) =>
                <WorkshopCard workshopData={workshopData}/>
          )}
          </div>
        </TabPanel>
      </SwipeableViews>
    </div>
    </Layout>
  );
}

export default Download
