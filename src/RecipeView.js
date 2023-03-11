import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { Button } from '@mui/material';
import {Typography} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import sushi from './assets/sushi.avif'
import { FaUserFriends, FaClock } from "react-icons/fa";
import { Link } from 'react-router-dom';





const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
 
const RecipeView = (props) => {

  var [recipe, setRecipe] = useState([]);

  useEffect(() => {
    
      fetchRecipe();
  },[props.cuisine]);



  const fetchRecipe = () => {
    axios.get("/api/view")
      .then((response)=> {
        console.log(response.data)
        let cuisineList= response.data.filter((item)=>{
          
         return item.rType === props.cuisine
        })
        setRecipe(cuisineList);
      })
  }

  const deleteRecipe = (id) => {
   const data = {"_id": id}
   axios.delete("/api/delete",{data:data})
   .then((response)=> {
    console.log(response.data)
     alert("Successfully Deleted!!");
     fetchRecipe();

   })

  }

  return (
    <div style={{marginLeft:"5vw",marginRight:"5vw"}} >
      <Typography  style={{color:"red", marginTop:"20px"}} variant="h3">Recipe List</Typography>
      
      <div style={{width:"100%",display:'grid', gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
      {recipe.map((item)=>(
        <Card key={item._id} sx={{ maxWidth: 345, margin:'15px', border: 'solid 1px' }}>
        <CardMedia
          sx={{ height: 140 }}
          image={item.rImage}
          title="sushi"
          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.rName}
          </Typography>
        </CardContent>
        
        <CardActions style={{display:'flex',justifyContent: 'space-between'}}>
          <div style={{display:'flex'}}>
          <div style={{display:'flex'}}>
            <FaClock/>
            <Typography  >{item.rDur}</Typography>
          </div>
          <div style={{display:'flex'}}>
            <FaUserFriends/>
            <Typography  >{item.rServe}</Typography>
          </div>
          </div>
          <div>
          <Button  size="small" color='secondary'><Link style={{textDecoration:"none"}} to='/create' state = {{value:item,isEdit:true}} >Edit</Link></Button>
          <Button onClick={()=>{deleteRecipe(item._id)}} size="small" color='error'>Delete</Button>
          
          
          </div>
        
        </CardActions>
      </Card>
      )) }
      </div>
    </div>
  )
}

export default RecipeView
