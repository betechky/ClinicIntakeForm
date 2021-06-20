import React from "react";
import Doctor from "./doctor";

const Doctors = (props) => {
  return (
    <select
      name="doctors"
      id="doctors"
      onChange={(event) => props.onCurrentDoctor(event)}
    >
      {props.doctors.map((d) => {
        return <Doctor key={d.id} doctor={d}></Doctor>;
      })}
    </select>
  );
};

export default Doctors;
