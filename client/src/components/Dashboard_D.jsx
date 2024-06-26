import React from "react";
import { Link } from "react-router-dom";
import caduceus from './pictures/caduceus.png';
import doctor_icon from './pictures/doctor.png';
import record_icon from './pictures/folder.png';
import prescription_icon from './pictures/prescription.png';
import bookapp_icon from './pictures/calendar.png';
import logged_in_icon from './pictures/logged-in2.png'
import './Home.css'; // Make sure to import the updated CSS file
import './Book_Appointment.css';
import './Dashboards.css';
import { useNavigate, useParams } from "react-router-dom";
const Dashboard_D = () => {
    const { user_id, doctor_id } = useParams();

    return (
        <div className="home">
            <div className="header">
                <div className="left-section">
                    <img className="symbol" src={caduceus} alt="Caduceus" />
                    <a href="/"><span className="website-name">IRL Anti-Virus</span></a>
                </div>
                <div className="right-section">
                <img className="logged-in-symbol" src={logged_in_icon} alt="logged_in" />
                </div>
            </div>
            <div className="parent-container">
                <div className="dashboard-container">
                    <img className = "dashboard-icon" src={doctor_icon}></img>
                    <p className = "dashboard-header">Dashboard</p>
                    <p><Link className="dashboard-link" to={`/dashboard-doctor/patient-records/${user_id}/${doctor_id}`}>Patient Records</Link></p>
                    <p><Link className="dashboard-link" to={`/dashboard-doctor/appointments/${user_id}/${doctor_id}`}>Appointments</Link></p>
                    <p><Link className="dashboard-link" to={`/dashboard-doctor/prescription/${user_id}/${doctor_id}`}>Prescription</Link></p>
                    <p><Link className="dashboard-link" to={`/dashboard-doctor/modify-prescription/${user_id}/${doctor_id}`}> Modify Prescription</Link></p>
                </div>
                <div className="boxes-container">
                    <div className="box">
                        <Link  to={`/dashboard-doctor/patient-records/${user_id}/${doctor_id}`} className="box-content">
                            <img className="box-image" src={record_icon} alt="Patient Records" />
                            <div style={{  fontSize: '20px', marginTop: '60px', marginLeft: '30px' }}>Patient Records</div>
                        </Link>
                    </div>
                    <div className="box">
                        <Link to={`/dashboard-doctor/appointments/${user_id}/${doctor_id}`} className="box-content">
                            <img className="box-image" src={bookapp_icon} alt="Box 1 Image" />
                            <div style={{  fontSize: '20px', marginTop: '60px', marginLeft: '30px' }}>Appointments</div>
                        </Link>
                    </div>
                    <div className="box">
                        <Link to={`/dashboard-doctor/prescription/${user_id}/${doctor_id}`} className="box-content">
                            <img className="box-image" src={prescription_icon} alt="Box 1 Image" />
                            <div style={{  fontSize: '20px', marginTop: '60px', marginLeft: '30px' }}>Prescription</div>
                        </Link>
                    </div>
                  
                </div>
            </div>
        </div>
    );
};

export default Dashboard_D;
