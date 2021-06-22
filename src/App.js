import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/navbar";
import CompleteList from "./components/CompleteList";
import axios from "axios";
import Doctors from "./components/doctors";
import Patient from "./components/patient";
// import Intakeforms from "./components/Intakeforms";

// const intakeform = axios.create({
//   baseURL: `https://localhost:5001/IntakeForms`,
// });

class App extends Component {
  state = {
    doctors: [],
    patient: {},
    currentDoctorId: 0,
    currentAilment: "",
    patients: {},
    intakeform: {},
  };

  componentDidMount() {
    axios.get("https://localhost:5001/Doctors").then((response) => {
      this.setState({ doctors: response.data });
      this.setState({ currentDoctorId: this.state.doctors[0].id });
    });
  }

  handleCurrentDoctor = (event) => {
    console.log(event.target.value);
    this.setState({ currentDoctorId: event.target.value });
  };

  handleCurrentPatient = (event) => {
    console.log(event);
    this.setState({ patient: event });
  };
  handleAiment = (e) => {
    // console.log(e.target.value);
    this.setState({ currentAilment: e.target.value });
  };

  AddNewIntake = async () => {
    let intakeform = Object.assign(
      {
        doctors: this.state.currentDoctorId,
        patient: this.state.patient.id,
        ailment: this.state.currentAilment,
      },
      this.state.intakeform
    );
    console.log(intakeform);

    axios
      .post("https://localhost:5001/IntakeForms", intakeform)
      .then((response) => {
        this.setState({ intakeform: response.data });
        console.log("POST : ", response);
      });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar>Doctor's office</NavBar>
        <main className="container">
          <p>
            Current Doctor ID: &nbsp;
            {this.state.currentDoctorId} <br />
            Current Patient ID: &nbsp;
            {this.state.patient.id} <br />
            Current Diagnosis text: &nbsp;
            {this.state.currentAilment}
            <br />
          </p>
          {/* <Intakeforms></Intakeforms> */}
          <Doctors
            doctors={this.state.doctors}
            onCurrentDoctor={this.handleCurrentDoctor}
          ></Doctors>
          <hr />
          <Patient onCurrentPatient={this.handleCurrentPatient}></Patient>
          <hr />
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Ailment:
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={this.handleAiment}
            ></textarea>
          </div>
          <button
            className="btn btn-success m-2"
            disabled={
              this.state.currentDoctorId === undefined ||
              this.state.patient.id === undefined ||
              this.state.currentAilment === ""
            }
            onClick={this.AddNewIntake}
          >
            Add Intake
          </button>

          <div>
            <CompleteList />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
