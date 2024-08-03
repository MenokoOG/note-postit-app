import React from "react"
import moment from 'moment'
import { useNavigate } from "react-router-dom"

export default function Note(props){

    const {title, _id, timeStamp} = props

    const navigate = useNavigate()

    function handleNavigate(){
        navigate(`/details/${_id}`)
    }

    return (
        
        <div className ='note'
            onClick= {handleNavigate}>
            <h1>{title} </h1>
            <p>{timeStamp}</p>

        </div>
    )
}