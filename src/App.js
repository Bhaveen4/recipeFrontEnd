import logo from './logo.svg';
import './App.css';

import Nav from './Nav';
import RecipeView from './RecipeView';
import Add from './Add';
import { Route, Routes } from 'react-router-dom';
import { IconContext } from "react-icons";
import { Fragment, useState } from 'react';






function App() {

  let[recipe,setRecipe] = useState('indian')
  const changeRecipe= (recipe)=>{
    setRecipe(recipe)
  }
  return (

    <div className="App">
      <IconContext.Provider value={{ color: "black", className: "global-class-name" }}>
      <div className='container'>
      <Nav recipe={recipe}  changeRecipe={changeRecipe} />
     
      <Routes>
        <Route path='/' element={<RecipeView cuisine={recipe}  />} ></Route>
        <Route path='/create' element={<Add />} ></Route>
        
      </Routes>
      
      
      
      </div>
      </IconContext.Provider>
    </div>

    

  );
}

export default App;
