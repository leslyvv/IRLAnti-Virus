import React, { useState, useEffect } from "react"
import {Link, useNavigate, useParams} from "react-router-dom"
import './Home.css'
import './Book_Appointment.css'
import './Booking_View_R.css'
import useDropDown from "./UseDropDown";
import caduceus from './pictures/caduceus.png'
import receptionist_icon from './pictures/receptionist.png'
import calendar_icon from './pictures/calendar.png'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import check from './pictures/check-2.png'
import down from './pictures/down.png'
import logged_in_icon from './pictures/logged-in2.png'
import './Dashboards.css';

const Booking_View_R = () => {

moment.locale("en-US");
const localizer = momentLocalizer(moment); 

const[calendarEvents, setCalendarEvents] = useState([]);

 // Converting appointments data into calendar events
 const formatAppointmentsForCalendar = (appointments) => {
  //maps through appointment information
  return appointments.map(appointment => {
    return {
      //formats appointment information into a title
      title: `Appointment ${appointment.appointment_id} with Doctor ${appointment.doctor_id} and with Patient ${appointment.patient_id}`,
      start: new Date(appointment.start_time),
      end: new Date(appointment.end_time),
      allDay: false 
    };
  });
};

useEffect(() => {
  axios.get('http://localhost:8800/appointment')
    .then(response => {
      const data = response.data;
      if (Array.isArray(data)) {
        const formattedAppointments = formatAppointmentsForCalendar(data);
        setCalendarEvents(formattedAppointments);
      } else {
        console.error("Data received is not an array:", data);
      }
    })
    .catch(error => console.error(error));
}, []);
  //another way of fetching data for appointment
  const [appointments, setAppointments] = useState([]);
  useEffect(() =>{
    const getAppointment= async ()=>{
      try{
          const res= await fetch('http://localhost:8800/appointment_info');
          if(!res.ok){
              throw new Error('Network error')
          }
          const getData= await res.json();
          setAppointments(getData);
          console.log(getData);
      } catch(error){
          console.error("Couldn't fetch hospital: ", error);
      }
      };
      getAppointment();
    }, []);

  //dropdown for appointment
  const appointmentDropDown = useDropDown();
  //find doctor information based on apppointment_id chosen
  const[selectedAppointment, setSelectedAppointment] = useState([]);
  const[selectedAppointmentID, setSelectedAppointmentID] = useState(null);
  //alows only one hospital selection alongside with it's location at a time
  const handleAppointmentSelect = async (appointment_id) => {
    setSelectedAppointmentID(appointment_id);
  
    // variable assigned
    // look through appointments that are fetched to return element if same id selected by appointment
    const appointment_selection = appointments.find(appointment =>  appointment.appointment_id === appointment_id);
    setSelectedAppointment(appointment_selection);
  

  }
  const { user_id, receptionist_id } = useParams();
    return (
      <div className ="home">
        <div className= "header">
        <div className="left-section">
          <img className="symbol" src={caduceus}/>
          <a href="/"><span className="website-name">IRL Anti-Virus</span></a>
        </div>
        <div className = "right-section">
          <img className="logged-in-symbol" src={logged_in_icon} alt="logged_in" />
        </div>
      </div>
      <div className = "parent-container">
      <div className = "dashboard-container">
          <img className = "dashboard-icon" src={receptionist_icon}></img>
          <p className = "dashboard-header">Dashboard</p>
          <p><Link className="dashboard-link" to={`/dashboard-receptionist/patient-records/${user_id}/${receptionist_id}`}>Patient Records</Link></p>
          <p><Link className="dashboard-link" to={`/dashboard-receptionist/appointments/${user_id}/${receptionist_id}`}>Appointments</Link></p>
          <p><Link className="dashboard-link" to={`/dashboard-receptionist/billing/${user_id}/${receptionist_id}`}>Billing</Link></p>
      </div>
      
      <div className= "blue-container">
            <div className = "first-header-container">
              <div className = "blue-header">
                Appointments
              </div>
                  <img className = "icon-match-header" src={calendar_icon}></img>
              </div>
              <p className= "blue-section-headers">Appointment Information</p><br></br>
              <div className="calendar-perspective"> 
                <Calendar
                  localizer={localizer}
                  events={calendarEvents}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500 }}
                  />

              </div>
              <p className= "blue-section-headers">Appointment Information</p><br></br>
              <div className= "patient-info-bubbles">
                <div className = "bubbles1">
                    <p className="bubbles-header">
                    </p>
                    <div className="hospitals-container">
                      <button type="button" className="select-hospital" onClick={appointmentDropDown.toggleList}>
                        Select Appointment
                        <img className="down-pic" src={down} alt="Down" />
                      </button>
                      <ul className="list-items" style={{ display: appointmentDropDown.isOpen ? 'block' : 'none' }}>
                        { Array. isArray(appointments) && appointments.map((appointment) => (
                          <li key={appointment.appointment_id} className="item" onClick={() => handleAppointmentSelect(appointment.appointment_id)}>
                            <span className="checkboxes">
                              {/* Show checkmark if appointment is selected */}
                              <img className={`check-pic ${selectedAppointmentID === appointment.appointment_id ? '' : 'check-pic-hidden'}`} src={check} alt="Check" width="10" height="10" />
                            </span>
                            <span className="item-text">{appointment.appointment_id}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className ="bubbles2">
                    <p className="bubbles-header2">
                        Doctor ID:
                    </p>
                    <div className= "doctor-id" style={{width: '100%', height: '100%'}}> {selectedAppointment && selectedAppointment.doctor_id} </div>
                  </div>
                  <div className ="bubbles2">
                    <p className="bubbles-header2">
                        Doctor First Name:
                    </p>
                    <div className= "doctor-id" style={{width: '100%', height: '100%'}}> {selectedAppointment && selectedAppointment.doctor_first_name} </div>
                  </div>
                  <div className ="bubbles2">
                    <p className="bubbles-header2">
                        Doctor Last Name:
                    </p>
                    <div className= "doctor-id" style={{width: '100%', height: '100%'}}> {selectedAppointment && selectedAppointment.doctor_last_name} </div>
                  </div>
                </div>
                <div className = "patient-container-right">
                <div className= "patient-info-bubbles">
                <div className ="bubbles2">
                    <p className="bubbles-header2">
                        Patient ID:
                    </p>
                    <div className= "doctor-id" style={{width: '100%', height: '100%'}}> {selectedAppointment && selectedAppointment.patient_id} </div>
                  </div>
                  <div className ="bubbles2">
                    <p className="bubbles-header2">
                        Patient First Name:
                    </p>
                    <div className= "doctor-id" style={{width: '100%', height: '100%'}}> {selectedAppointment && selectedAppointment.patient_first_name} </div>
                  </div>
                  <div className ="bubbles2">
                    <p className="bubbles-header2">
                        Patient Last Name:
                    </p>
                    <div className= "doctor-id" style={{width: '100%', height: '100%'}}> {selectedAppointment && selectedAppointment.patient_last_name} </div>
                  </div>
                  </div>
                </div>

                <div className= "space-for-go-back">      
                <Link className="dashboard-link" to={`/dashboard-receptionist/${user_id}/${receptionist_id}`}>Go Back</Link>
            </div>
        </div>
    </div>
 </div>   
    );
};

export default Booking_View_R;