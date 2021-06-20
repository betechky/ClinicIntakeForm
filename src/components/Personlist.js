import React from "react";

import Person from "./Person";
import classes from "./PersonList.module.css";

const PersonList = (props) => {
  return (
    <ul className={classes["person-list"]}>
      {props.persons.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          healthNumber={person.healthNumber}
          address={person.address}
          dateofBirth={person.dateofBirth}
          phoneNumber={person.phoneNumber}
        />
      ))}
    </ul>
  );
};

export default PersonList;
