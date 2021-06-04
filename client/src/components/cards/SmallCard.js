import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { EditOutlined, DashOutlined, DeleteOutlined } from '@ant-design/icons'

/**we have assigned the defalut value here so  that if we dont receive them as the prop we dont have
 * any issue bcz handleHotelDelete is can be done from the dashboard page..*/
const SmallCard = ({ hotel, handleHotelDelete = (f) => f,
    owner = false,
    showMoreButton = true }) => {
    const history = useHistory()
    const currencyFormatter = (data) => {
        return data.amount.toLocaleString(data.currency, {
            style: "currency",
            currency: data.currency,
        });
    };
    const diffDays = (from, to) => {
        const day = 24 * 60 * 60 * 1000
        const start = new Date(from)
        const end = new Date(to)
        const ans = Math.round(Math.abs((start - end) / day))
        return ans
    }
    return (
        <>
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        {(hotel.image && hotel.image.contentType)
                            ?
                            <img src={`/hotel/image/${hotel._id}`}
                                alt="default hotel image"
                                className="card-image img img-fluid"></img>

                            :
                            <img src="https://via.placeholder.com/900x500.png?text=MERN+booking"
                                alt="default hotel image"
                                className="card-image img img-fluid"></img>

                        }
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <                     h3 className="card-title">{hotel.title} <span className="float-right text-primary">
                                {currencyFormatter({
                                    amount: hotel.price,
                                    currency: "usd"
                                })}</span></h3>
                            <p className="alert alert-info">{hotel.location}</p>
                            <p className="card-text">{`${hotel.content.substring(0, 200)}...`}</p>
                            <p className="card-text">
                                <span className="float-right text-primary">
                                    for {diffDays(hotel.from, hotel.to)}
                                    {diffDays(hotel.from, hotel.to) <= 1 ? 'day' : 'days'}
                                </span>
                            </p>
                            <p className="card-text">{hotel.bed} room</p>
                            <p className="card-text">Available from {new Date(hotel.from).toLocaleDateString()} to {new Date(hotel.to).toLocaleDateString()}</p>

                            <div className="d-flex justify-content-between h4">
                                {
                                    showMoreButton && <button className="btn btn-primary" onClick={() => {
                                        history.push(`/hotel/${hotel._id}`)
                                    }}>Show Details</button>
                                }
                                {
                                    owner && <>
                                        <Link to={`/hotel/edit/${hotel._id}`}>
                                            <EditOutlined className="text-warning"></EditOutlined>
                                        </Link>
                                        <DeleteOutlined className="text-danger"
                                            onClick={() => handleHotelDelete(hotel._id)}>
                                        </DeleteOutlined>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SmallCard