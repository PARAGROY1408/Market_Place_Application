import React, { useState, useEffect } from 'react'
import DashboardNav from '../components/DashboardNav'
import ConnectNav from '../components/ConnectNav'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { HomeOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import SmallCard from '../components/cards/SmallCard'
import axios from 'axios'
import { compose } from 'redux'
const DashboardSeller = () => {
    const { auth } = useSelector((state) => {
        return {
            ...state
        }
    });
    const { token } = auth
    const [hotels, setHotels] = useState([]) // this hotels will contain all the hotels that is psoted by the login user..
    const [loading, setLoading] = useState(false);
    useEffect(() => { // this will be triggered the moment the component is rendered..
        loadAllHotels();
    }, [])
    const loadAllHotels = async () => {
        /**this function will load all the hotels posted by that user... */
        let res = await axios.get(`/seller-hotels`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        //console.log("All the hotles posted by the logged in user are.......",res);
        //console.log(res.data)
        setHotels(res.data); // we will update the state the moment the page is rendered..
    }
    const handleClick = async () => {
        setLoading(true);
        try {
            let res = await axios.post(`/create-connect-account`, {}, {
                headers: {
                    Authorization: "Bearer " + auth.token
                }
            })
            // in the res we will get the login link..
        }
        catch (err) {
            console.log("the error at the DashBoardSeller is ", err);
            toast.error("Stripe connect failed try again");
            setLoading(false);
        }
    }
    const handleHotelDelete=async (hotelId)=>{
        // we will be making a request to the backend....
        try{
            if(!window.confirm("Are you sure"))
                return ;
            let res=await axios.delete(`/delete-hotel/${hotelId}`,{
                headers:{
                    Authorization:"Bearer "+token
                }
            })
            console.log(res); // this is the response from the backend
            toast.success("Hotel Deleted Successfully")
            loadAllHotels() // we want to execute this function so that the remaining hotels could be displayed.
        }
        catch(err)
        {
           console.log("erro while deleting the hotel ",err)
        }
    }
    const connected = () => { /**this will be shown if the user is connected to stripe.. */
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <h2> Users Hotels</h2>
                    </div>
                    <div className="col-md-2">
                        <Link to="/hotel/new" className="btn btn-primary">+ Add New</Link>
                    </div>
                </div>
                <div className="row">
                        {
                            hotels.map((hotel)=>{
                                return <SmallCard key={hotel._id} hotel={hotel} owner={true} showMoreButton ={false} handleHotelDelete={handleHotelDelete}/>
                            })
                        }
                </div>
            </div>
        )
    }
    const notConnected = () => { // when the user is not connected to stripe
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 offset-md-3 text-center">
                        <div className="p-5 pointer">
                            <HomeOutlined className="h1" />
                            <h4> Setup payouts to post hotel rooms</h4>
                            <p className="lead">
                                Neme of Application partners with the stripe to transfer the earning to
                                your bank account
                            </p>
                            <button className="btn btn-primary mb-3" onClick={handleClick} disabled={loading}>
                                {loading ?
                                    "Processing...."
                                    : "Setup Payout"}
                            </button>
                            <p className="text-muted">
                                <small>
                                    You will be redirected  to the stripe to complete the onboarding process
                            </small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
    return (
        <>
            <div className="container-fluid bg-secondary p-5">
                <ConnectNav></ConnectNav>
            </div>
            <div className="container-fluid p-4">
                <DashboardNav></DashboardNav>
            </div>
            { /*auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled
            ? connected()
            : notConnected()*/
                connected()}
        </>
    )
}
export default DashboardSeller