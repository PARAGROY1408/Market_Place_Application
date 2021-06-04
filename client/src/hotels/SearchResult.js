import React,{useState,useEffect} from 'react'
import queryString from 'query-string'
import axios from 'axios'
import SmallCard from '../components/cards/SmallCard'
import Search from '../components/forms/Search'

const SearchResult=()=>{
    const [searchLocation,setSearchLocation]=useState('')
    const [searchDate,setSearchDate]=useState('')
    const [searchBed,setSearchBed]=useState('')
    const [hotels,setHotels]=useState([])// this will contain the response that is coming from the backend based on the search parameter.\

    useEffect(()=>{
        // first we need to grab the search parameter from the url..
        const {location,date,bed}=queryString.parse(window.location.search) // it have the url
        /*
        console.log(location)
        console.log(date) // it contain both the from and to date..
        console.log(bed)
        console.log("this is triggered..")
        we got the info now we will make a request at the backend...*/
        const loadHotel=async ()=>{
            try{
                let res=await axios.post(`/search-hotel`,{
                    location:location,
                    date:date,
                    bed:bed
                })
                console.log(res) // this will contain all the hotels that staisfy the criteria..
                setHotels(res.data)
             }
             catch(err)
             {
                 console.log("error while handling the search query...",err)
             }
        }
        loadHotel()
    },[window.location.search])
    
    return(
        <>
        <div className="col">
            <br></br>
            <Search></Search>
        </div>
        <div className="container-fluid">
            <div className="row">
                {
                    hotels.map((hotel)=> <SmallCard key={hotel._id} hotel={hotel}></SmallCard>)
                }
            </div>
        </div>
        </>
    )
}
export default SearchResult