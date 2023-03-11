import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import background from "./assets/food2.jpg";

const Nav = (props) => {

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            height: "50vh",
            background: `url(${background}) no-repeat center center`,
            boxShadow: "inset 44px 93px 113px black",
            backgroundSize: "cover",
          }}
        >
          <Toolbar >
            
              
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize:'3rem',fontWeight:'bold',color:'red',display:'flex'}}>
              BB Recipe
            </Typography>
            <Button onClick={()=>{props.changeRecipe("japanese")}} variant="contained" color="error" sx={{mr:"20px"}} >
              <Link style={{ textDecoration: "none", color:"white" }} to="/">
                Japanese cuisine
              </Link>
            </Button>
            
            <Button onClick={()=>{props.changeRecipe("indian")}} variant="contained" color="error" sx={{mr:"20px"}} >
              <Link style={{ textDecoration: "none", color:"white" }} to="/">
                Indian cuisine
              </Link>
            </Button>
            <Button variant="contained" color="error" sx={{mr:"20px"}}>
              <Link
                style={{ textDecoration: "none",color:"white" }}
                state={{ value: null, isEdit: false }}
                to="/create"
              >
                Add Cuisine
              </Link>
            </Button>
           
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Nav;
