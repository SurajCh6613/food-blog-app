import React from 'react'
import { useLoaderData } from 'react-router-dom'
import foodImg from '../assets/foodRecipe.png'
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";

const RecipeItems = () => {
    const allRecipes = useLoaderData();
    
  return (
    <div className='card-container'>
        {
            allRecipes?.map((item,index)=>(
                <div key={index} className='card'>
                    <img src={`http://localhost:3000/images/${item.coverImage}`} alt="" width="120px" height="100px" />
                    <div className='card-body'>
                        <div className='title'>{item.title}</div>
                        <div className='icons'>
                            <div className='timer'>
                               <BsStopwatchFill /> 30 Min
                            </div>
                            <FaHeart />
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default RecipeItems