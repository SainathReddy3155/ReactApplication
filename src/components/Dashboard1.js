import React, { useEffect,useState } from 'react'
// import Button from '@mui/material/Button';
import {Link, Navigate, useNavigate} from 'react-router-dom';

import { AppBar,Toolbar,Rating,IconButton,Button,Badge,TextField,Autocomplete,Card,CardActions,Typography,CardContent ,CardMedia,Accordion,AccordionDetails,AccordionSummary,Alert,Snackbar,Dialog,DialogActions,DialogContent,DialogContentText, DialogTitle,Drawer,Box,Menu,MenuItem,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Collapse,Avatar} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import PhoneIcon from '@mui/icons-material/Phone';
import LogoutIcon from '@mui/icons-material/Logout';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import InfoIcon from '@mui/icons-material/Info';


function Dashboard() {

  const location=useLocation();


  const navigate=useNavigate();

  const logout=async()=>{
      localStorage.clear();
      navigate('/login')
  }


  useEffect(()=>{
    document.title='Dashboard'
    
  },[])
  
  const[isdraweropen,setIsdraweropen]=useState(false)
  const[collapseopen,setIscollapseopen]=useState(false)
  const handlecollapsemenu=()=>{
      setIscollapseopen(!collapseopen)
  }
  const menulistitems=['Home','Orders','Settings']
  return (
    <>



<AppBar position='static' sx={{backgroundColor:"white"}}>
        <Toolbar sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          
          <IconButton>
          <MenuIcon onClick={()=>setIsdraweropen(true)}/>
          </IconButton>
         
          {/* <h6>Sainath</h6> */}
          
                        {/* <IconButton>
                            <HomeOutlinedIcon/>
                        </IconButton>
                        <IconButton>
                            <Badge badgeContent={100} max={99}  color="secondary">
                                <NotificationsOutlinedIcon/>
                            </Badge>    
                        </IconButton>   */}
                        
                        <TextField id="standard-basic" label="Search Items..." variant="standard" sx={{width:'500px',}} />
                        <IconButton>
                            <Avatar >SR</Avatar>
                        </IconButton>
                    
        </Toolbar>
       </AppBar>





     
      {/* <Button type="submit" variant="contained" sx={{ marginTop: 2 }} onClick={logout}>
        Logout
      </Button> */}
      
        {/* <img src='https://www.logogenie.net/images/articles/starbucks-logo1.jpg' width='260px' height='90px'/> */}

        <Drawer anchor='left' open={isdraweropen}>
          <Box p={2} textAlign="center" width="250px">
            
            <Typography variant='h6'>
            <img src='https://www.logogenie.net/images/articles/starbucks-logo1.jpg' width='260px' height='90px' alt='loding...'/>
            <IconButton>
              <ChevronLeftIcon onClick={()=>setIsdraweropen(false)}/>
            </IconButton>
            </Typography>
           
              <Box>
                <List>
                <ListItem onClick={()=>{setIsdraweropen(false);}}>
                <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
                </ListItem>
                <ListItem onClick={handlecollapsemenu}>
                <ListItemButton>
              <ListItemIcon>
                <AutoGraphIcon />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
              {collapseopen?<ExpandLess/>:<ExpandMore/>}
            </ListItemButton>
            
                </ListItem>
                <Collapse in={collapseopen} timeout="auto" unmountOnExit>
                    <ListItemButton sx={{ pl: 4 }} onClick={()=>{setIsdraweropen(false);}}>
                        <ListItemIcon>
                        <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText secondary="Activity" />
                    </ListItemButton>
                </Collapse>
                <ListItem onClick={()=>{setIsdraweropen(false);}}>
                <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
                </ListItem>
                <ListItem onClick={logout}>
                <ListItemButton >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" o/>
            </ListItemButton>
                </ListItem>
                </List>
              </Box>
           
          </Box>
        </Drawer>

        {/* end of side navbar */}

        <Grid container spacing={2}>
          <Grid siz={3}>
            {/* {menulistitems.map((item,index)=>(item+'djhda'))} */}
            <Card className='totalorderscard' sx={{height:'100px',margin:'45px 0px 0px 45px',}}>
            <CardContent>
              <div className ='totalorderscardtext' sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
              <h6 className='torderstext'>Total Orders</h6>
              <InfoIcon sx={{height:'20px',width:'20px',}}/>
              </div>
              <h6 className='torderskpicount'>843</h6>
            </CardContent>
          </Card>
            
          </Grid>

          <Grid siz={3}>
            {/* {menulistitems.map((item,index)=>(item+'djhda'))} */}
            <Card className='totalorderscard' sx={{height:'100px',margin:'45px 0px 0px 45px',}}>
            <CardContent>
              <div className ='totalorderscardtext' sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
              <h6 className='torderstext'>Total Products</h6>
              <InfoIcon sx={{height:'20px',width:'20px',}}/>
              </div>
              <h6 className='torderskpicount'>563</h6>
            </CardContent>
          </Card>
            
          </Grid>

          <Grid siz={3}>
            {/* {menulistitems.map((item,index)=>(item+'djhda'))} */}
            <Card className='totalorderscard' sx={{height:'100px',margin:'45px 0px 0px 45px',}}>
            <CardContent>
              <div className ='totalorderscardtext' sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
              <h6 className='torderstext'>Total Sales</h6>
              <InfoIcon sx={{height:'20px',width:'20px',}}/>
              </div>
              <h6 className='torderskpicount'>777</h6>
            </CardContent>
          </Card>
            
          </Grid>


        </Grid>
    </>
  )
}

export default Dashboard
