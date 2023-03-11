import { Edit } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import FileBase64 from 'react-file-base64';



const cuisineType = ["indian","japanese"]


const Add = () => {
  const location = useLocation();
  const { value, isEdit } = location.state;

  let navigate = useNavigate();

  const [recipe, setRecipe] = useState(
    value
      ? {
          _id: value._id,
          rName: value.rName,
          rDur: value.rDur,
          rServe: value.rServe,
          rType: value.rType,
          rImage:value.rImage
        
        }
      : {
          rName: "",
          rDur: 0,
          rServe: 0,
          rType: "",
          rImage:""
          
        }
  );

  const handleChange= (e)=>{
    let value = e.target.value
    let name=e.target.name
    console.log("value",value,"name",name,"recipe",recipe)
   setRecipe({...recipe,[name]:value})
   }

  useEffect(()=>{
  console.log("recipe",recipe)
  },[recipe])

  const addRecipe = () => {
    axios.post("/api/create", recipe).then((response) => {
      console.log(response.data);
      navigate("/");
    });
  };

  const editRecipe = () => {
    axios.put("/api/update", recipe).then((response) => {
      console.log(response.data);
      navigate("/");
    });
  };

  return (
    <div style={{marginLeft:"5vw",marginRight:"5vw"}}>
      <Typography style={{ color: "red", marginTop:"20px" }} variant="h3">
        {isEdit ? "Edit Cuisine" : "Add Cuisine"}
      </Typography>
      <TextField
        className="text"
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        name="rName"
        value={recipe.rName}
        onChange={(e)=>{handleChange(e)}}
        variant="outlined"
        label="Cuisine Name"
        fullWidth
        margin="normal"
      />
      <TextField
        className="text"
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        name="rDur"
        value={recipe.rDur}
        onChange={(e)=>{handleChange(e)}}
        variant="outlined"
        label="Duration for cooking"
        fullWidth
        margin="normal"
      />
      <TextField
        className="text"
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        name="rServe"
       value={recipe.rServe}
        onChange={(e)=>{handleChange(e)}}
        variant="outlined"
        label="No: of serving"
        fullWidth
        margin="normal"
      />
       <TextField
       select
       defaultValue='Indian'
        className="text"
        InputLabelProps={{
          style: { color: '#fff' },
        }}
        name="rType"
        value={recipe.rType}
        onChange={(e)=>{handleChange(e)}}
        variant="outlined"
        label="Cuisine type"
        fullWidth
        margin="normal"
      >
        {cuisineType.map((item)=>(
           <MenuItem key={item} value={item}>
           {item}
         </MenuItem>
        ))}
      </TextField>

      <div>
      <FileBase64
      name="rImage"
      type="file"
        multiple={ false }
        onDone={ ({base64}) => setRecipe({...recipe,rImage:base64}) } />
      </div>
      
      
      <Button
        onClick={isEdit ? editRecipe : addRecipe}
        style={{ maxHeight: "30px", minWidth: "30px", minHeight: "30px", marginTop:"10px", marginBottom:"50px", paddingTop:"20px",paddingBottom:"20px" }}
        variant="contained"
        color="error"
        fullWidth
      >
        {isEdit ? "Edit" : "Add"}
      </Button>
    </div>
  );
};
export default Add;
