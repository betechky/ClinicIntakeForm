import React, { useState, useEffect } from "react";
import axios from "axios";
import App from "../App";

function Intakeforms() {
  const [doctorId, setDoctorID] = useState([]);
  const [patientId, setPatientID] = useState([]);
  const [ailment, setAilment] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = () => {
    const doctorIntake = "https://localhost:5001/Doctors/1";
    const patientIntake = "https://localhost:5001/Patients/1";
    const ailmentIntake = "https://localhost:5001/IntakeForms/2";

    const getDoctor = axios.get(doctorIntake);
    const getPatient = axios.get(patientIntake);
    const getAilment = axios.get(ailmentIntake);
    axios.all([getDoctor, getPatient, getAilment]).then(
      axios.spread((...allData) => {
        const alldataDoctor = allData[0].data.name;
        const alldataPatient = allData[1].data.name;
        const alldataAilment = allData[2].data.ailment;

        setDoctorID(alldataDoctor);
        setPatientID(alldataPatient);
        setAilment(alldataAilment);
      })
    );
  };

  const handleDrId = (id) => {
    axios.get("https://localhost:5001/Doctors/" + id).then((response) => {
      let doctor = Object.assign({}, response.data);

      this.setState({ doctor });
      this.props.onCurrentPatient(doctor);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <input type="text" placeholder="Search" />
      <ul>
        <li>Doctor :{doctorId}</li>
        <li>patient:{patientId}</li>
        <li>ailment is:{ailment}</li>
      </ul>
    </div>
  );
}

export default Intakeforms;
