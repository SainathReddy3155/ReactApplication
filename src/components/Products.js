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

function Products() {

    const [products,setProducts]=useState([])
    useEffect(() => {
        console.log("HELLLOOOO")
        allproductsapi()
    },[])

    // ALL PRODUCTS API

    const allproductsapi = async (e) => {
        const res = await axios.get("https://fakestoreapi.com/products")
        console.log("res",res.data)
        setProducts(res.data)
    }

    return (
        <>
            <FinalSideNav />


            <Grid container spacing={2} style={{margin:"0px 65px "}}>
            {products.map((item,index)=>(    
                <Grid size={4} key={index}>
                   <Card sx={{ maxWidth: 345, marginTop: 20, boxShadow: "3px 3px 60px #bebebe, -31px -20px 57px #ffffff" }}>
                        <CardMedia component="img"
                            height="194"
                            image={item['image']}
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
                            {item['title']}
                            </Typography>
                        </CardContent>
                        <CardContent style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                            ${item['price']}
                            </Typography>
                        </CardContent>

                        <CardContent style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Rating name="read-only" value={item['rating']['rate']} readOnly />
                        </CardContent>
                        <CardContent style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                            {item['rating']['count']} in stock
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
{/* <Card sx={{ maxWidth: 345, marginTop: 20, boxShadow: "3px 3px 60px #bebebe, -31px -20px 57px #ffffff" }}>
                        <CardMedia component="img"
                            height="194"
                            image="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                            alt="Paella dish"
                            style={{ objectFit: "contain" }}
                        />
                        <CardContent style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h5" sx={{ color: 'text.secondary' }}>
                                Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
                            </Typography>
                        </CardContent>
                        <CardContent style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                                $ 87
                            </Typography>
                        </CardContent>

                        <CardContent style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                                wdgwd
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Back</Button>
                            <Button size="small" >Add To Cart</Button>
                        </CardActions>

                    </Card> */}