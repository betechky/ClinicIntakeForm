import React, { Component } from "react";
import axios from "axios";

class Patientlist extends Component {
  state = {
    patientlist: [],
  };

  componentDidMount() {
    const fetchPosts = async () => {
      const res = await axios.get("https://localhost:5001/Patients", {
        Id: this.props.Id,
        Name: this.props.Name,
        HealthNumber: this.props.HealthNumber,
        DateOfBirth: this.props.DateOfBirth,
        Address: this.props.address,
        phoneNumber: this.props.phoneNumber,
      });
      console.log(res);
      this.setState({ patientlist: res.data });
    };
    fetchPosts();
  }

  //   handleAllPatient = (id) => {
  //     axios
  //       .get("https://localhost:5001/Patients", {
  //         Id: this.props.Id,
  //         Name: this.props.Name,
  //         HealthNumber: this.props.HealthNumber,
  //         DateOfBirth: this.props.DateOfBirth,
  //         Address: this.props.address,
  //         phoneNumber: this.props.phoneNumber,
  //       })
  //       .then((response) => {
  //         console.log(response);
  //         this.setState({ patient: response.data.Patientlist });
  //       });
  //   };

  render() {
    return (
      <div className="container">
        <h2>Complete List of Patient</h2>
        <p>The .table-striped class adds zebra-stripes to a table:</p>
        <div className="btn-spancing">
          <button
            type="button"
            className="btn btn-success  m-2"
            onClick={this.handleAllPatient}
          >
            See All Patients
          </button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Health Number</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.Id}</td>
              <td>{this.props.HealthNumber}</td>
              <td>{this.props.Name}</td>
              <td>{this.props.DateOfBirth}</td>
              <td>{this.props.address}</td>
              <td>{this.props.phoneNumber}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Patientlist;
