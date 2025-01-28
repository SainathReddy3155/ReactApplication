import React from 'react'
import { AppBar,Toolbar,Grid,Rating,IconButton,Button,Badge,Avatar,TextField,Autocomplete,Card,CardActions,Typography,CardContent ,CardMedia,Accordion,AccordionDetails,AccordionSummary,Alert,Snackbar,Dialog,DialogActions,DialogContent,DialogContentText, DialogTitle,Drawer,Box,Menu,MenuItem,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Collapse} from '@mui/material'
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
import { useState } from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
function FinalSideNav({icondisplaydata}) {
    const[isdraweropen,setIsdraweropen]=useState(false)
    const[collapseopen,setIscollapseopen]=useState(false)
    const handlecollapsemenu=()=>{
        setIscollapseopen(!collapseopen)
    }

      
    const logout=async()=>{
      localStorage.clear();
      navigate('/login')
    }

    const navigate=useNavigate();
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
                            <Avatar >{icondisplaydata}</Avatar>
                        </IconButton>
                    
        </Toolbar>
       </AppBar>


       {/* sidenav bar */}
       
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
                <Link to ='/dashboard' className='navtablinks'>
                <ListItem onClick={()=>{setIsdraweropen(false);}}>
                <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
                </ListItem>
                </Link>
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
                 <Link to='/activity' className='navtablinks'>
                    <ListItemButton sx={{ pl: 4 }} onClick={()=>{setIsdraweropen(false);}}>
                        <ListItemIcon>
                        <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText secondary="Activity" />
                    </ListItemButton>
                 </Link>
                </Collapse>
                <Link to ='/settings' className='navtablinks'>
                <ListItem onClick={()=>{setIsdraweropen(false);}}>
                <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
           
                </ListItem>
                </Link>
               
                <ListItem onClick={logout}>
                <ListItemButton >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
                </ListItem>
                </List>
              </Box>
           
          </Box>
        </Drawer>

   

        </>
    )
}

export default FinalSideNav