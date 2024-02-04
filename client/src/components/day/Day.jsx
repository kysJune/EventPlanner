import "./Day.css";
import {useState, useEffect} from "react";
import axios from "axios";
import Event from "../event/Event";
const Day = ({day, month, year}) => {
    const [events, setEvents] = useState([]);


    useEffect(() => {
        const fetchEvents = async () => {
            const response = await axios.get(`/events/${day}/${month}/${year}`); //TODO: send the userid as well maybe from a context
            const data = await response.json();
            setEvents([...data]);
        }
        fetchEvents();
    }, [events]);

    return (
        <div className="day">
            <h1>{day}</h1>
            <h2>{month}</h2>
            <h3>{year}</h3>
            {
                events.map((event, index) => {
                    return (
                        <Event key={index} event={event}/>
                    )
                })
            }
        </div>
    )
}