import React, { useEffect } from 'react'
import { useState } from 'react';
import FinalSideNav from './FinalSideNav'
import {Link, Navigate, useNavigate} from 'react-router-dom';

import { AppBar,Toolbar,Rating,IconButton,Button,Badge,TextField,Autocomplete,Card,CardActions,Typography,CardContent ,CardMedia,Accordion,AccordionDetails,AccordionSummary,Alert,Snackbar,Dialog,DialogActions,DialogContent,DialogContentText, DialogTitle,Drawer,Box,Menu,MenuItem,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Collapse,Avatar, Checkbox} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
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
import CircularProgress from '@mui/material/CircularProgress';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import PasswordIcon from '@mui/icons-material/Password';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import InfoIcon from '@mui/icons-material/Info';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { connect } from 'react-redux';




function Settings(reduxsetusername) {
    useEffect(()=>{
        document.title='Settings'
    },[])

    const username=reduxsetusername['reduxsetusername']['setusernameReducer']['username']
    const icondisplay=reduxsetusername['reduxsetusername']['setusernameReducer']['username'].charAt(0).toUpperCase()
    const [alerts,setAlerts]=useState(false)
    const[alertcontent,setAlertcontent]=useState('')
    const[alertseverity,setAlertseverity]=useState('')


    const [tabvalue,setTabvalue]=useState('1')
    const [showpassword,setShowpassword]=useState(false)

    const handleTabChange=(event,value)=>{
        setTabvalue(value)
    }
    
    const resetForm=()=>{
        setChangePassword({old_password:'',new_password:'',confirm_password:''})
    }

    const [changepassword,setChangePassword]=useState({
        old_password:"",
        new_password:"",
        confirm_password:""
    })

    const alertClose=()=>{
        setAlerts(false)
    }

    const onChangepassword=(e)=>{
        e.preventDefault();
        setChangePassword({...changepassword,[e.target.name]:e.target.value})

    }

    const OnChangepaswwordSubmit=async(e)=>{
        e.preventDefault();
        if(changepassword.old_password==="" || changepassword.new_password==="" || changepassword.confirm_password===""){
            setAlerts(true)
            setAlertcontent("Please fill all the details")
            setAlertseverity("error")
            return false
        }
        else if(changepassword.new_password!= changepassword.confirm_password){
            setAlerts(true)
            setAlertcontent("Password doesn't match")
            setAlertseverity("error")
            return false
        }
        else if(changepassword.old_password==changepassword.new_password ){
            setAlerts(true)
            setAlertcontent("Old password and New password can't be same")
            setAlertseverity("error")
            return false
        }
        else{
            console.log(changepassword)
            setAlerts(true)
            setAlertcontent("Password Updated Successfully")
            setAlertseverity("success")
            resetForm();

        }
    }

    const Onchangeshowpassword=()=>{
            // console.log("dafjak")
            if(showpassword!=true){
                setShowpassword(true)
            }
            else{
                setShowpassword(false)

            }

    }
  return (
    <div>
      <FinalSideNav icondisplaydata={icondisplay}/>
      <Grid container spacing={4} sx={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'30px'}}>
      <Grid size={8} >
   <Card>
    <CardContent>
        <TabContext value={tabvalue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
   <TabList onChange={handleTabChange}>
    <Tab  icon ={<SettingsIcon/>}  iconPosition = "start" label='General' value='1'/>
    <Tab icon ={<PasswordIcon/>}  iconPosition = "start" label='Change Password' value='2'/>
    <Tab icon ={<NotificationsIcon/>}  iconPosition = "start" label='Notifications' value='3'/>
   </TabList>
   </Box>
       <TabPanel value='1'>
       <div className='generalsettings'>
            <div className='generalsetting'>
                    <img className ='profileimage' src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
            </div>
            <div className='userdetails'>
            <Typography color='green' variant='h5'>{username}</Typography>
            </div>
            <div className='userdetails'>
            <Typography variant='h6'>Web Developer</Typography>
            </div>
            <div className='userdetails'>
            <Typography variant='h6'>Jan 20, 1989</Typography>
            </div>
            <div className='userdetails'>
            <Typography variant='h6'>New York, USA</Typography>
            </div>
            <div className='userdetails'>
            <Typography variant='h6'>Sainath@gmail.com</Typography>
            </div>
        </div>
       
       </TabPanel>
       <TabPanel value='2'> 
       <div className='passwordalerts'> 
       {alerts?<Alert severity={alertseverity} onClose={alertClose}>{alertcontent}</Alert>:<></>}
       </div>
        <div className='changepasswordsetting'>
            <form id="changepaswordform" method="POST" onSubmit={OnChangepaswwordSubmit}>
                <FormControl>
                <TextField type={showpassword?"text":"password"} name="old_password" id='standard-basic_username'  variant="standard" label='Old Password'  sx={{marginTop:2, width:280}}  value={changepassword.old_password} onChange={onChangepassword}> </TextField>
                <TextField type={showpassword?"text":"password"} name="new_password" id='standard-basic_password' variant="standard" label='New Password' sx={{marginTop:2}}  value={changepassword.new_password} onChange={onChangepassword}></TextField>
                <TextField type={showpassword?"text":"password"} name="confirm_password" id='standard-basic_cpassword' variant="standard" label='Confirm Password' sx={{marginTop:2}}  value={changepassword.confirm_password} onChange={onChangepassword}></TextField>
                
                {/* <FormControlLabel value="Showpasswords" control={<Checkbox />} label="Show Password" labelPlacement="end" onChange={Onchangeshowpassword}/> */}
                <FormControlLabel value="Show Passwords" control={<Checkbox/> } label="Show Password" labelPlacement="end" onChange={Onchangeshowpassword}/> 
                <Button type="submit" variant='contained' sx={{marginTop:2}}>Change Password</Button>
                </FormControl>
            </form>
           
        </div>
        <Typography sx={{display:'flex',justifyContent:'center'}}>*You will be automatically logged off after changing the password </Typography>
        </TabPanel>
       <TabPanel value='3'>
       <div className='generalsettings1'>
            <div className='notificationssetting'>
                Enable Notifications
                <Switch  />
            </div>
        </div>
       </TabPanel>
       </TabContext>
    </CardContent>
   </Card>
  </Grid>
       </Grid>
    </div>
  )
}

const mapStateToProps=(state)=>({
    reduxsetusername:state
})

export default connect(mapStateToProps)(Settings);
