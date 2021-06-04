import React from 'react'
import { DatePicker, Select } from 'antd'
import moment from "moment"
const { Option } = Select;
const config = {
    appId: process.env.REACT_APP_ALGOLIA_APP_ID,
    apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
    language: "en"
}
const HotelEditForm=({value,setValue,location,setLocation,handleImageChange,handleSubmit,handleChange})=>{
    const { title, content, image, price, from, to, bed } = value;
    return(
        <>
        <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="btn btn-outline-secondary btn-block m-2 text-left">
                        Image
                    <input type="file" name="image" onChange={handleImageChange} hidden></input>
                    </label>
                    <input type="text" name="title" onChange={handleChange} placeholder="Title" className="form-control m-2" value={title}
                    ></input>
                    <textarea name="content" onChange={handleChange} placeholder="Content" className="form-control m-2" value={content}
                    ></textarea>
                    {/*
                    <AlgoliaPlaces className="form-control ml-2 mr-2" placeholder="Location" default
                    Value={location} options={config} onChange={({suggestion})=>{
                        console.log(suggestion)
                    }}
                    style={{height:"50px"}}></AlgoliaPlaces>*/
                    }
                    <input type="text" name="location" onChange={(event)=>{
                        setLocation(event.target.value)
                    }} placeholder="Location" className="form-control m-2" value={location}
                    ></input>
                    
                    
                    <input type="number" name="price" onChange={handleChange} placeholder="Price" className="form-control m-2" value={price}
                    ></input>
                    
                    <Select
                        onChange={(ele) => setValue({ ...value, bed: ele })}
                        className="w-100 m-2"
                        size="large"
                        placeholder="Number of rooms"
                        value={bed}
                    >
                        <Option key={1}>{1}</Option>
                        <Option key={2}>{2}</Option>
                        <Option key={3}>{3}</Option>
                        <Option key={4}>{4}</Option>
                    </Select>
                    {
                    from &&
                    (
                    <DatePicker
                        defaultValue={moment(from, "YYYY-MM-DD")}
                        placeholder="From date"
                        className="form-control m-2"
                        onChange={(date, dateString) =>
                            setValue({ ...value, from: dateString })
                        }
                        disabledDate={(current) =>
                            current && current.valueOf() < moment().subtract(1, "days")
                        }
                    />
                    )
                    }
                    {
                    to && 
                    (
                    <DatePicker
                        defaultValue={moment(to, "YYYY-MM-DD")}
                        placeholder="To date"
                        className="form-control m-2"
                        onChange={(date, dateString) =>
                            setValue({ ...value, to: dateString })
                        }
                        disabledDate={(current) =>
                            current && current.valueOf() < moment().subtract(1, "days")
                        }
                    />
                    )
                    }
                    <button className="btn btn-outline-primary m-2">Save</button>
                </div>
            </form>
        </>
    )
}
export default HotelEditForm