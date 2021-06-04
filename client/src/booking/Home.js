import React,{useState,useEffect} from 'react'
import {useSelector}from 'react-redux' // we need to access the state in this component with the help of useSelector hook
import axios from "axios"
import SmallCard from '../components/cards/SmallCard'
import Search from '../components/forms/Search'
const Home=()=>{
    const [hotels,setHotels]=useState([])
    useEffect(()=>{
      loadAllhotels();
    },[])
    const loadAllhotels=async ()=>{
       let res=await axios.get(`/hotels`);
       // now in the res we get all the hotels saved in our database from the backend...
       //console.log(res);
       //console.log(res.data); info of the hotel lies here..
       // now we want to update the out state..
       // we want all the hotels to be present inside our state..
       //console.log(res.data)
       setHotels(res.data)
    }
    const {auth}=useSelector((state)=>{return {...state}}) // it takes a fucntion and return a state
    // state is a js object and it has user which is also a js object so here we are doing object destructuring
    return(
        <>
        <div className="container-fluid bg-secondary p-5 text-center">
            <h1>All Hotels </h1>
        </div>
        <div className="col">
            <br></br>
            <Search></Search>
        </div>
        <br></br>
        <div className="container-fluid">
            {
            hotels.map((hotel)=>{
                return <SmallCard key={hotel._id} hotel={hotel}></SmallCard> // every hotel is passes as a prop to child component
            })
           }
        </div>
        </>
    )
}
export default Home