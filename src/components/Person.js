import React from "react";

import classes from "./Person.module.css";

const Person = (props) => {
  return (
    <li className={classes.person}>
      <h2>
        {props.name}
        <span>{props.id}</span>
      </h2>
      <h3>{props.healthNumber}</h3>
      {/* <p>{props.dateofBirth}</p> */}
      <p>{props.address}</p>
      <p>{props.phoneNumber}</p>
    </li>
  );
};

export default Person;
