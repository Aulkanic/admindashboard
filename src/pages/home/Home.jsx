import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FetchingBmccScho } from '../../api/request';
import { useState } from "react";
import { useEffect } from "react";
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['Area 1', 'Area 2', 'Area 3', 'Area 4'],
  datasets: [
    {
      label: 'Number of People',
      data: [25, 18, 30, 12],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const Home = () => {
  const [totalscho,setTotalscho] = useState([]);

  useEffect(() => {

    async function Fetch(){
      const scholars = await FetchingBmccScho.FETCH_SCHOLARS()
      console.log(scholars)
      setTotalscho(scholars.data.Scholars)
    }
    Fetch();
  }, []);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
      <Navbar />
      <Box
      sx={{
        margin:'10px',
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '30%',
          height: 158,
        },
      }}
    >
    <Card elevation={10} sx={{ minWidth: 275}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Total Scholars
        </Typography>
        <Typography variant="h5" component="div">
          {totalscho.length}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">See More</Button>
      </CardActions>
    </Card>
    <Card elevation={10} sx={{ minWidth: 275}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          benevolent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />

        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    <Card elevation={10} sx={{ minWidth: 275}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          benevolent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />

        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </Box>
      <div>
      <Bar data={data} options={options} />
      </div>
      </div>
      </div>
  )
}
export default Home