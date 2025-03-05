import React, { useEffect,useState,useContext,createContext } from 'react'
// import Button from '@mui/material/Button';
import {Link, Navigate, useNavigate} from 'react-router-dom';

import { AppBar,Toolbar,Rating,IconButton,Button,Badge,Skeleton,Paper,TextField,Autocomplete,Card,CardActions,Typography,CardContent ,CardMedia,Accordion,AccordionDetails,AccordionSummary,Alert,Snackbar,Dialog,DialogActions,DialogContent,DialogContentText, DialogTitle,Drawer,Box,Menu,MenuItem,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Collapse,Avatar} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
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
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import InfoIcon from '@mui/icons-material/Info';
import FinalSideNav from './FinalSideNav';
import api from '../api';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { connect } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Settings from './Settings';

function Dashboard(reduxsetusername) {

  
  // const currentUsername= useSelector((state)=>console.log("Welcome :  ",state.username))
  // alert(currentUsername)
  // const username="Welcome " + localStorage.getItem('username')
  // console.log(username)
  // console.log(reduxsetusername)
  const username="Welcome " + reduxsetusername['reduxsetusername']['setusernameReducer']['username']
  // console.log(username)
  // console.log("reduxsetusername :",reduxsetusername['reduxsetusername']['setusernameReducer']['username'])

  const icondisplay=reduxsetusername['reduxsetusername']['setusernameReducer']['username'].charAt(0).toUpperCase()

  const [userdatarows,setUserDataRows]=useState([])

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'product_id', headerName: 'Product ID', width: 130 },
    { field: 'product_name', headerName: 'Product Name', width: 130 ,
      renderCell:(params)=>{
        return(
          <Link to={`/viewproduct/${params.row.product_id}`}  style={{ textDecoration: "None",color:"black"}}>
            {params.row.product_name}
            </Link>

        )
      }

    },
    {field: 'product_image', headerName: 'Product Image', width: 130 ,
      renderCell:(params)=>{
      return(
        <a target="_blank"><img
        src={params.value || 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'}
        alt="Product"
        style={{ width: 50, height: 50, borderRadius: "50%" }}
      />
      </a>
    )
      }
    },
    { field: 'cost', headerName: '$ Cost', width: 130 },

    {
      field: 'rating',
      headerName: 'Rating',
      width: 90,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 90,
    },
    {
      field:'actions',
      headerName:'Actions',
      description:'This column allows you to take actions',
      sortable:false,
      width:200,
      renderCell:(params)=>(
        <>
        <Button variant='contained' sx={{margin: '0 8px 0px 8px',}} onClick={()=>{checkrowfun(params.row)}}>Edit </Button>
        <Button variant='contained' color="error" sx={{justifyContent:'space-evenly'}} onClick={()=>deleteproduct((params.row))}>Delete</Button>
        </>
      )

    }
  ];
  
  
    
    // {userdatarows}
    // console.log('userdatarows',userdatarows[0])
   
  
  
  const paginationModel = { page: 0, pageSize: 5 };

  
  

  const [alerts,setAlerts]=useState(false)
  const[alertcontent,setAlertcontent]=useState('')
  const[alertseverity,setAlertseverity]=useState('')

  const navigate=useNavigate();
  const [editdialog,setEditdilog]=useState(false);
  const [addproductdialog,setAddroductdialogClose]=useState(false);
  const[snackbaropen,setSnackbaropen]=useState(true)
  const [addproductdata,setAddProductdata]=useState({
    product_name:'',
    product_image:null,
    cost:'',
    rating:'',
    status:''
  })
  const [editrowData,setEditrowData]=useState({
    id:"",
    product_id:"",
    product_name:"",
    cost:"",
    rating:"",
    status:"",
    })

    
  
  const logout=async()=>{
      localStorage.clear();
      navigate('/login')
  }

  const alertclose=()=>{
    setAlerts(false)
   }
  

  // const editdialogOpen=()=>{
  //   setEditdilog(true)
  // }

  const [preview, setPreview] = useState(null);

  const onhandleChangeImage=(e)=>{
      const file=e.target.files[0];
      if(file){
        setAddProductdata({...addproductdata,product_image:file})
        setPreview(URL.createObjectURL(file))
      }

  }

  const editdialogClose = () => {
    setEditdilog(false);
  };
  const addproductdialogOpen=()=>{
    setAddroductdialogClose(true)
}

const addproductdialogClose=()=>{
  setAddroductdialogClose(false)
}

// checkrowfun

  const checkrowfun=(currentrow)=>{
    console.log("currentrow :",currentrow)
    setEditrowData(currentrow)
    setEditdilog(true)
  }

  const addproductformreset=()=>{
    setAddProductdata(
      {
      product_name:'',
      product_image:null,
      cost:'',
      rating:'',
      status:''
    } )
  }


  const Snackbarclose=()=>{
    setSnackbaropen(false)
  }
  
  // delete api

  const deleteproduct=async(deletecurrentproductid)=>{
    console.log("delete clicked",deletecurrentproductid.product_id)
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if(confirmDelete){
      const res=await api.delete(`/api/deleteproduct/${deletecurrentproductid.product_id}/`)

      if (res.status===204){
        console.log("successfuly deleted")
        setAlertcontent("Product Successfuly Deleted")
        setAlertseverity('success')
        setAlerts(true)
        await productsapi();
        
      }
      else{
        console.log("something went wrong")
        setAlertcontent("Something Went Wrong")
        setAlertseverity('error')
        setAlerts(true)
      }
    }
    
  }


// productsapi api 

const productsapi=async(e)=>{
  try {
    const res = await api.get('/api/getproducts/');
    setUserDataRows(res.data.length > 0 ? res.data : []);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}


// end productsapi api 

 const addproductfunChange=(e)=>{
  e.preventDefault();
  setAddProductdata({...addproductdata,[e.target.name]:e.target.value})
 }

//  Ensure you're using FormData if you're sending an image:

 

 const addproductFunction=async (e)=>{
  e.preventDefault();

  const formdata= new FormData();
  formdata.append("product_name",addproductdata.product_name);
  formdata.append("product_image",addproductdata.product_image);
  formdata.append('cost',addproductdata.cost);
  formdata.append('rating',addproductdata.rating);
  formdata.append('status',addproductdata.status);




  try{
    const res=await api.post('/api/addproduct/',formdata,{
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("res:",res)
    if(res.status===200){
      // alert("success")
      setAlertcontent("Product Successfuly Added")
      setAlertseverity('success')
      setAlerts(true)
      console.log(res)

    }
    addproductformreset()
    await productsapi();
    
    // else{
    //   console.log("something went wrong")
    // }
  }catch(error){
  console.log(error)
}
 }






  const userkpiapi=async()=>{
        try{
          const res= await api.get('/api/getuserkpicount/');
          // console.log(res.data[0])
          const resdata=await res.data[0];
          // console.log(res.data.length)
          // console.log(res.data[0])
          if(res.data.length>0){
            setKpidata([resdata.orders,resdata.products, resdata.sales])
          }
          else{
            setKpidata([0,0,0])
          }
          // setKpidata([resdata.orders,resdata.products, resdata.sales])

        }
        catch(err){
          console.log(err)
        }
  }

  const[isdraweropen,setIsdraweropen]=useState(false)
  const[collapseopen,setIscollapseopen]=useState(false)
  const handlecollapsemenu=()=>{
      setIscollapseopen(!collapseopen)
  }
  const menulistitems=['Orders','Products','Sales']
  // const kpicounts=[100,65,677]
  const [Kpicounts,setKpidata]=useState([]);
  const titles=['Total No of Orders','Total No of Products','Total No of Sales']
  useEffect(()=>{
    document.title='Dashboard'
    userkpiapi();
    productsapi();
    
  },[])


  const savechangesformfunction=async(e)=>{
      e.preventDefault();
      const formdata= new FormData();
      formdata.append("product_name",editrowData.product_name);
      formdata.append('cost',editrowData.cost);
      formdata.append('rating',editrowData.rating);
      formdata.append('status',editrowData.status);
      console.log("editrowData : ",editrowData)
      const res= await api.patch(`/api/updateproduct/${editrowData.product_id}`,formdata,{
        headers: { "Content-Type": "multipart/form-data" },
      })
      if(res.status===200){
        console.log("product updated success")
        await productsapi();
      }
      else{
        console.log("Something went wrong")
      }

  }


  return (
    <>

      <FinalSideNav icondisplaydata={icondisplay}/>

      {alerts?<Alert severity={alertseverity} onClose={alertclose} variant="filled">{alertcontent}</Alert>:<></>}
        <Grid container spacing={4}>
          
        {menulistitems.map((item,index)=>(
          <Grid size={4} key={index}>
          
            <Card className='totalorderscard' sx={{height:'100px',width:'120px',margin:'45px 0px 0px 45px',}}>
            <CardContent>
              <div className ='totalorderscardtext' sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
              <h6 className='torderstext' >{item}</h6>
              
              <Tooltip title={titles[index] } arrow>
                  <InfoIcon sx={{height:'20px',width:'20px',}}/>
              </Tooltip>
              </div>
                <h6 className='torderskpicount'>{Kpicounts.length>index?Kpicounts[index]:<CircularProgress />}</h6>
                {/* <h6 className='torderskpicount'>{Kpicounts.length>index?Kpicounts[index]: <Skeleton variant="rectangular" width={210} height={60} />}</h6> */}

                {/* <h6 className='torderskpicount'><CircularProgress /></h6> */}
              {/* <h6 className='torderskpicount'>67</h6> */}
            </CardContent>
          </Card>
            
          </Grid>
          ))}

          
            
            <Snackbar
  open={snackbaropen}
  autoHideDuration={1200}
  onClose={Snackbarclose}
  message={username}
  anchorOrigin={{
    vertical: 'top', horizontal: 'right' 
  }}
/>

    
        </Grid>
        <Grid container spacing={8}>
        <Grid size={8}></Grid>
        <Grid size={4}>
        <Button variant='contained' onClick={addproductdialogOpen}>Add Product</Button>
        </Grid>
        </Grid>



        <Paper sx={{ mt: 9, width:900,ml:35,justifyContent:'center',alignItems:'center'}}>
        <Grid container spacing={4} >
        <DataGrid
        rows={userdatarows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
       </Grid>
       </Paper>
       <form id="addproductfrom" method="POST" onSubmit={addproductFunction}>
       <FormControl>
       <Dialog
        open={addproductdialog}
        onClose={addproductdialogClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            // const formData = new FormData(event.currentTarget);
            // const formJson = Object.fromEntries(formData.entries());
            // const email = formJson.email;
            // console.log(email);
            addproductdialogClose();
          },
        }}
      >
        <DialogTitle>Add Product</DialogTitle>
        
        <DialogContent>
          <DialogContentText>
          {/* <FormControl>
                <TextField type={showpassword?"text":"password"} name="old_password" id='standard-basic_username'  variant="standard" label='Old Password'  sx={{marginTop:2, width:280}}  value={changepassword.old_password} onChange={onChangepassword}> </TextField>
                <TextField type={showpassword?"text":"password"} name="new_password" id='standard-basic_password' variant="standard" label='New Password' sx={{marginTop:2}}  value={changepassword.new_password} onChange={onChangepassword}></TextField>
                <TextField type={showpassword?"text":"password"} name="confirm_password" id='standard-basic_cpassword' variant="standard" label='Confirm Password' sx={{marginTop:2}}  value={changepassword.confirm_password} onChange={onChangepassword}></TextField>
                
              
                <Button type="submit" variant='contained' sx={{marginTop:2}}>Change Password</Button>
                </FormControl> */}
          </DialogContentText>
          
          <TextField
            autoFocus
            required
            margin="dense"
            id="product_name"
            name="product_name"
            label="Product Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={addproductfunChange}
            
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="cost"
            name="cost"
            label="Cost"
            type="float"
            fullWidth
            variant="standard"
            onChange={addproductfunChange}
            
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="rating"
            name="rating"
            label="Rating"
            type="float"
            fullWidth
            variant="standard"
            onChange={addproductfunChange}
            
          />
          
          <TextField
            autoFocus
            required
            margin="dense"
            id="status"
            name="status"
            label="Status"
            type="text"
            fullWidth
            variant="standard"
            onChange={addproductfunChange}
           
          />

            {/* Image adding */}

            <TextField accept='image/*' 
            type="file" 
            id='product_image'
            autoFocus
            required
            onChange={onhandleChangeImage}
            />

            {/* <label htmlFor="product-image">
            <Button variant="contained" component="span" color="primary" style={{ marginTop: "10px" }}>
            Choose Image
            </Button>
            </label> */}

            {/* Image ending */}

        </DialogContent>
        <DialogActions>
          <Button onClick={addproductdialogClose}>Cancel</Button>
          <Button type="submit" >Save Product</Button>
        </DialogActions>
       
      </Dialog>
      </FormControl>
    </form>



    {/* edit dailog starts here */}
    <form id="savechangesform" method="POST" onSubmit={savechangesformfunction}>
    <FormControl>
       <Dialog
        open={editdialog}
        onClose={editdialogClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            // const formData = new FormData(event.currentTarget);
            // const formJson = Object.fromEntries(formData.entries());
            // alert("form data ",formJson)
            editdialogClose();
          },
        }}
      >
        
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {/* <FormControl>
                <TextField type={showpassword?"text":"password"} name="old_password" id='standard-basic_username'  variant="standard" label='Old Password'  sx={{marginTop:2, width:280}}  value={changepassword.old_password} onChange={onChangepassword}> </TextField>
                <TextField type={showpassword?"text":"password"} name="new_password" id='standard-basic_password' variant="standard" label='New Password' sx={{marginTop:2}}  value={changepassword.new_password} onChange={onChangepassword}></TextField>
                <TextField type={showpassword?"text":"password"} name="confirm_password" id='standard-basic_cpassword' variant="standard" label='Confirm Password' sx={{marginTop:2}}  value={changepassword.confirm_password} onChange={onChangepassword}></TextField>
                
              
                <Button type="submit" variant='contained' sx={{marginTop:2}}>Change Password</Button>
                </FormControl> */}
          </DialogContentText>
          
          <TextField
            autoFocus
            required
            margin="dense"
            id="productid"
            name="product_id"
            label="Product ID"
            type="number"
            fullWidth
            variant="standard"
            readOnly
            value={editrowData.product_id}
            disabled
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="product_name"
            name="product_name"
            label="Product Name"
            type="text"
            fullWidth
            variant="standard"
            value={editrowData.product_name}
            onChange={(e)=>setEditrowData({...editrowData,[e.target.name]:e.target.value})}
          />
           <TextField
          autoFocus
          required
          margin="dense"
          id="cost"
          name="cost"
          label="Cost"
          type="number"
          fullWidth
          variant="standard"
          value={editrowData.cost}
          onChange={(e)=>setEditrowData({...editrowData,[e.target.name]:e.target.value})}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="rating"
          name="rating"
          label="Rating"
          type="float"
          fullWidth
          variant="standard"
          value={editrowData.rating}
          onChange={(e)=>setEditrowData({...editrowData,[e.target.name]:e.target.value})}
        />
         <TextField
          autoFocus
          required
          margin="dense"
          id="status"
          name="status"
          label="Status"
          type="float"
          fullWidth
          variant="standard"
          value={editrowData.status}
          onChange={(e)=>setEditrowData({...editrowData,[e.target.name]:e.target.value})}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={editdialogClose}>Cancel</Button>
          <Button type="submit" >Save Changes</Button>
        </DialogActions>
      </Dialog>
      </FormControl>
    </form>
      
    </>
  )
}


const mapStateToProps =(state)=>({
  reduxsetusername:state
})


export default connect(mapStateToProps)(Dashboard);