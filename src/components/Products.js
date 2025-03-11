import React, { useEffect, useState } from 'react'
import FinalSideNav from './FinalSideNav'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import api from '../api';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
function Products() {
    const catergories=[
        {label:"Mens"},
        {label:"Womens"},
        {label:"Electronics"},
    ]
    const [products,setProducts]=useState([])
    const [autocompletevalue,setAutocompletevalue]=useState("")
    useEffect(() => {
        allproductsapi()
    },[])

    const onAutocompleteChange=(e,newvalue)=>{
        if (newvalue){
            console.log("hellloooooo",newvalue['label'])
            
        }
    }

    // ALL PRODUCTS API

    const allproductsapi = async (e) => {
        const res = await api.get("/api/getstoreproducts/")
        // console.log("res",res.data)
        setProducts(res.data)
    }

    return (
        <>
            <FinalSideNav />
            <Grid container spacing={2} style={{display:"flex",justifyContent:"flex-start",alignItems:"center",margin:"10px"}}>
                <Grid size={4}>
                    <Autocomplete 
                     disablePortal 
                     options={catergories} 
                     sx={{ width: 300 }}
                     value={autocompletevalue}
                     onChange={onAutocompleteChange}
                     renderInput={(params) => <TextField {...params} label="Filter By" />} />
                </Grid>
            </Grid>
           

            <Grid container spacing={2} style={{margin:"0px 65px "}}>
            {products.map((item,index)=>(    
                <Grid size={4} key={index}>
                   <Card sx={{ maxWidth: 345, marginTop: 20, boxShadow: "3px 3px 60px #bebebe, -31px -20px 57px #ffffff" }}>
                        <CardMedia component="img"
                            height="194"
                            image={item['image'].replace("http://127.0.0.1:8000/images/https%3A/","https://")}
                            alt="Paella dish"
                            style={{ objectFit: "contain" }}
                        />
                        <CardContent >
                            <Typography variant="h5" sx={{ color: 'text.secondary',fontSize:"16px" }}>
                            {item['category']}
                            </Typography>
                        </CardContent>
                        <CardContent style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h5" sx={{ color: 'text.secondary' }}>
                                <Link to='/test' style={{textDecoration:"None"}}>
                                     {item['title'].slice(0, 20)}..
                                </Link>
                            </Typography>
                        </CardContent>
                        <CardContent style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                            ${item['price']}
                            </Typography>
                        </CardContent>

                        <CardContent style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Rating name="read-only" value={item['rating']} readOnly />
                        </CardContent>
                        <CardContent style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                            {item['stockcount']} in stock
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" >Add To Cart</Button>
                        </CardActions>

                    </Card>
                </Grid>
                ))}
            </Grid>

        </>
    )
}

export default Products
