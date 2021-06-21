import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/navbar";
import CompleteList from "./components/CompleteList";
import axios from "axios";
import Doctors from "./components/doctors";
import Patient from "./components/patient";

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
  AddNewIntake = () => {
    let intakeform = Object.assign({}, this.state.intakeform);
    console.log("this.state.intakeform", this.state.intakeform);
    axios
      .post("https://localhost:5001/IntakeForms", intakeform)
      .then((response) => {
        this.setState({ handleCurrentDoctor: intakeform.target.value });

        this.setState({ handleCurrentPatient: intakeform.target.value });
        this.setState({ currentAilment: intakeform.target.value });
        // this.props.currentDoctorId(intakeform);
        // this.props.patient.healthNumber.id(intakeform);
        // this.props.currentAilment(intakeform);
        console.log("POST:", response);
      });
  };
  // AddIntakeform = () => {
  //   let one =
  //     "https://api.storyblok.com/v1/cdn/stories/health?version=published&token=wANpEQEsMYGOwLxwXQ76Ggtt";
  //   let two =
  //     "https://api.storyblok.com/v1/cdn/datasources/?token=wANpEQEsMYGOwLxwXQ76Ggtt";
  //   let three =
  //     "https://api.storyblok.com/v1/cdn/stories/vue?version=published&token=wANpEQEsMYGOwLxwXQ76Ggtt";

  //   const requestOne = axios.get(one);
  //   const requestTwo = axios.get(two);
  //   const requestThree = axios.get(three);

  //   axios
  //     .all([requestOne, requestTwo, requestThree])
  //     .then(
  //       axios.spread((...responses) => {
  //         const responseOne = responses[0];
  //         const responseTwo = responses[1];
  //         const responesThree = responses[2];
  //         // use/access the results
  //       })
  //     )
  //     .catch((errors) => {
  //       // react on errors.
  //     });
  // };
  // async componentDidMount(){
  //   const[handleCurrentDoctor, handleCurrentPatient ] await Promise.all([
  //     axios.get('https://localhost:5001/Doctors'.this.props.handleCurrentDoctor)
  //   ])
  // }
  render() {
    return (
      <React.Fragment>
        <NavBar>Doctor's office</NavBar>
        <main className="container">
          <p className="nodisplay">
            Current Doctor ID: &nbsp;
            {this.state.currentDoctorId} <br />
            Current Patient ID: &nbsp;
            {this.state.patient.id} <br />
            Current Diagnosis text: &nbsp;
            {this.state.currentAilment}
            <br />
          </p>

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
              this.state.patient.healthNumber === undefined ||
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

/*
1. Patient's date of birth input: no data for existing patient!
2.  AddNewPatient has no Id in patient object
*/
