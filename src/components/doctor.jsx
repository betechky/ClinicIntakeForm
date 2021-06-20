import React from "react";

const Doctor = (props) => {
  return <option value={props.doctor.id}>{props.doctor.name}</option>;
};

export default Doctor;
