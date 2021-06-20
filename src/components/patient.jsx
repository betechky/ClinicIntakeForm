import React, { Component } from "react";
import axios from "axios";

class Patient extends Component {
  state = {
    patient: {},
    isCreate: false,
  };

  handleId = (id) => {
    axios.get("https://localhost:5001/Patients/" + id).then((response) => {
      if (response.data.dateofBirth !== undefined) {
        response.data.dateofBirth = this.formatDate(
          new Date(response.data.dateofBirth)
        );
      }
      // this.setState({ patient: response.data === "" ? {} : response.data });
      // this.props.onCurrentPatient(response.data);
      let patient = Object.assign({}, response.data);
      patient.id = id;

      this.setState({ patient });
      this.props.onCurrentPatient(patient);
      this.setState({ isCreate: response.data.name !== undefined });
    });
  };

  UpdatePatient = () => {
    let patient = Object.assign({}, this.state.patient);

    axios
      .put("https://localhost:5001/Patients/" + this.state.patient.id, patient)
      .then((response) => {
        console.log("PUT : ", response);
      });
  };

  AddNewPatient = () => {
    let patient = Object.assign({}, this.state.patient);

    console.log("this.state.patient", this.state.patient);

    axios.post("https://localhost:5001/Patients", patient).then((response) => {
      this.props.onCurrentPatient(patient);
      console.log("POST : ", response);
    });
  };

  formatDate = (date) => {
    let d = new Date(date),
      month = d.getMonth() + 1 + "",
      day = d.getDate() + "",
      year = d.getFullYear() + "";

    if (month.length < 2) month = "0" + month; // 01
    if (day.length < 2) day = "0" + day; // 10

    return year + "-" + month + "-" + day;
  };

  render() {
    return (
      <React.Fragment>
        Search Id:
        <input
          className="form-control m-2"
          type="text"
          placeholder="Search by Id and press enter"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              this.handleId(e.target.value);
            }
          }}
          // onBlur={(e) => this.handleId(e.target.value)}
        ></input>
        <input
          className="form-control m-2"
          type="text"
          placeholder="Health Number"
          value={this.state.patient.healthNumber || ""}
          onChange={(e) =>
            this.setState((prevState) => {
              let patient = Object.assign({}, prevState.patient);
              patient.healthNumber = e.target.value;
              return { patient };
            })
          }
        ></input>
        <input
          className="form-control m-2"
          type="text"
          placeholder="Name"
          value={this.state.patient.name || ""}
          onChange={(e) =>
            this.setState((prevState) => {
              let patient = Object.assign({}, prevState.patient);
              patient.name = e.target.value;
              return { patient };
            })
          }
        ></input>
        <input
          className="form-control m-2"
          type="date"
          placeholder="Date of Birth"
          value={this.state.patient.dateofBirth || ""}
          onChange={(e) =>
            this.setState((prevState) => {
              let patient = Object.assign({}, prevState.patient);
              patient.dateofBirth = e.target.value;
              return { patient };
            })
          }
        ></input>
        <input
          className="form-control m-2"
          type="text"
          placeholder="Phone Number"
          value={this.state.patient.phoneNumber || ""}
          onChange={(e) =>
            this.setState((prevState) => {
              let patient = Object.assign({}, prevState.patient);
              patient.phoneNumber = e.target.value;
              return { patient };
            })
          }
        ></input>
        <input
          className="form-control m-2"
          type="text"
          placeholder="Address"
          value={this.state.patient.address || ""}
          onChange={(e) =>
            this.setState((prevState) => {
              let patient = Object.assign({}, prevState.patient);
              patient.address = e.target.value;
              return { patient };
            })
          }
        ></input>
        <button
          type="button"
          className="btn btn-success btn-small  m-2"
          disabled={this.state.isCreate}
          onClick={this.AddNewPatient}
        >
          Add New Patient
        </button>
        <button
          type="button"
          class="btn btn-warning btn-small m-2"
          disabled={!this.state.isCreate}
          onClick={this.UpdatePatient}
        >
          Update Patient
        </button>
      </React.Fragment>
    );
  }
}

export default Patient;
