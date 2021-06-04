import React,{useState} from 'react'
import {DatePicker,Select} from 'antd'
import {SearchOutlined} from '@ant-design/icons'
import moment from 'moment'
import {useHistory} from 'react-router-dom'



// destructuring values from the ant component...
const {RangePicker}=DatePicker
const {Option}=Select

const Search=()=>{
    const [location,setLocation]=useState('');
    const [date,setDate]=useState('')
    const [bed,setBed]=useState('')
    const history=useHistory();

    const handleSubmit=()=>{
        history.push(`/search-result?location=${location}&date=${date}&bed=${bed}`)
    }
    return(
        <>
        <div className="d-flex pb-4">
            <div className="w-100">
                <input type="text" name="location" onChange={(event)=>{
                        setLocation(event.target.value)
                    }} 
                    placeholder="Location" 
                    value={location}
                    className="form-control"
                    style={{height:"50px"}}
                ></input>
            </div>
                <RangePicker
                onChange={(value,dateString)=>setDate(dateString)}
                disabledDate={(current)=>
                current && current.valueOf() < moment().subtract(1,"days")}
                className="w-100"
                ></RangePicker>
                <Select onChange={(value)=>setBed(value)}
                className="w-100"
                size="large"
                placeholder="Number of rooms">
                <Option key={1}>{1}</Option>
                <Option key={2}>{2}</Option>
                <Option key={3}>{3}</Option>
                <Option key={4}>{4}</Option>
                </Select>

                <SearchOutlined
                onClick={handleSubmit}
                className="btn btn-primary p-3 btn-square"
                ></SearchOutlined>
            
        </div>
        </>
    )
}

export default Search