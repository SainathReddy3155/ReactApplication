import React, { useState, useEffect } from 'react'
import FinalSideNav from './FinalSideNav';
import { useParams } from 'react-router-dom';
import api from '../api';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid2';
import Rating from '@mui/material/Rating';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import Alert from '@mui/material/Alert';
function SingleProduct() {

  const product_id = useParams();
  console.log("params : ", product_id)
  const [productdata, setProductdata] = useState([]);
  const [productrating,setProductrating]=useState(0);

  const [alerts,setAlerts]=useState(false)
  const[alertcontent,setAlertcontent]=useState('')
  const[alertseverity,setAlertseverity]=useState('')
  useEffect(() => {
    console.log("Helloo")

    const fetchdata = async () => {

      try {
        const res = await api.get(`/api/getsinglproduct/${product_id.id}/`)
        if (res.status === 200) {
          console.log("res : ", res.data)
          setProductdata(res.data)
          setProductrating(res.data.rating)
        }
        else {
          alert("Something went wrong")
        }
      } catch (e) {
        alert("Something went wrong", e)
      }
    }


    fetchdata()

  }, [])

  const addtocart=async()=>{
    setAlerts(true)
    setAlertcontent("Succesfully Added to Cart")
    setAlertseverity("success")

  }

  const alertclose=()=>{
    setAlerts(false)
   }
  
  return (
    <>
      <FinalSideNav />
      {alerts?<Alert severity={alertseverity} onClose={alertclose} variant="filled">{alertcontent}</Alert>:<></>}
      <Grid container spacing={2}>
        <Grid size={4}>

        </Grid>
        <Grid size={4}>

          <Card sx={{ maxWidth: 345, marginTop: 20 }}>
            <CardMedia component="img"
              height="194"
              image={productdata.product_image}
              alt="Paella dish"
              style={{ objectFit: "contain" }}
            />
            <CardContent style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Typography variant="h5" sx={{ color: 'text.secondary' }}>
                {productdata.product_name}
              </Typography>
            </CardContent>
            <CardContent style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                $ {productdata.cost}
              </Typography>
            </CardContent>
            <CardContent style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Rating name="read-only" value={productrating} readOnly />
            </CardContent>
            <CardContent style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                {productdata.status}
              </Typography>
            </CardContent>
            <CardActions>
        <Button size="small"><Link to="/dashboard" style={{textDecoration:"None",color:"#1976d2"}}>Back</Link></Button>
        <Button size="small" onClick={addtocart}>Add To Cart</Button>
      </CardActions>

          </Card>


        </Grid>
      </Grid>



    </>
  )
}

export default SingleProduct
