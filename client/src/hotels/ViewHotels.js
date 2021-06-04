/**when the user on the home page click on the showDetails button this component will be rendered. */
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom' // to fetch the id of the hotel from the url..
import { load } from 'algolia-places-react'
import axios from 'axios'
import moment from 'moment'
import { useSelector } from 'react-redux'
const ViewHotels = () => {
    const { hotelId } = useParams()
    const [hotel, setHotel] = useState({})
    const [Image, setImage] = useState("")
    useEffect(() => {
        loadHotel() // this will make a request to the backend to load the hotel
    }, [])
    const { auth } = useSelector((state) => {
        return state
    })
    const history = useHistory()
    const loadHotel = async () => {
        const res = await axios.get(`/hotel/${hotelId}`)
        //console.log(res) // this will contain all the information of the hotel
        const { hotel } = res.data;
        //console.log(hotel)
        // now we get all the information of the hotel and now we need to store it inside our state..
        setHotel(hotel)

        // to load the image we have a separate end point and we need to make a request to that endpoint to fetch the image of the hotel..
        //const res_image=await axios.get(`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`)
        //console.log(res_image)
        // res_image.data it have the buffer data of the image
        setImage(`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`)
        //setImage(res_image.data)
    }
    const diffDays = (from, to) => {
        const day = 24 * 60 * 60 * 1000
        const start = new Date(from)
        const end = new Date(to)
        const ans = Math.round(Math.abs((start - end) / day))
        return ans
    }
    const handleClick = (e) => {
        e.preventDefault();
        if (!auth) {
            history.push("/login")
        }
        else {
            window.alert("Your booking has been confirmed pay the amount to the hotel")
            history.push("/dashboard")
        }


    }
    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h2>{hotel.title}</h2>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <br></br>
                        <img src={Image} alt={hotel.title} className="img img-fluid m-2"></img>
                    </div>
                    <div className="col-md-6">
                        <br></br>
                        <b>{hotel.content}</b>
                        <p className="alert alert-info mt-3">${hotel.price}</p>
                        <p className="card-text">
                            <span className="float-right text-primary">
                                for {diffDays(hotel.from, hotel.to)}
                                {diffDays(hotel.from, hotel.to) <= 1 ? 'day' : 'days'}
                            </span>
                        </p>
                        <p>
                            From <br></br>
                            {moment(new Date(hotel.from)).format("MMMM Do YYYY, h:mm:ss a")}
                        </p>
                        <p>
                            To <br></br>
                            {moment(new Date(hotel.to)).format("MMMM Do YYYY, h:mm:ss a")}
                        </p>
                        <i>Posted By {hotel.postedBy && hotel.postedBy.name}</i>
                        <br></br>
                        <button className="btn btn-block btn-lg btn-primary mt-3" onClick={handleClick}>

                            {auth && auth.token ?
                                'Book Now ' : 'Login to Book Now'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ViewHotels