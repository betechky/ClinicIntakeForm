import React, { useState, useCallback } from "react";

import Personlist from "./Personlist";

function CompleteList() {
  const [persons, setPersons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPersonHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://localhost:5001/Patients");
      if (!response.ok) {
        throw new error("Something Went wrong");
      }
      const data = await response.json();

      const transformedPersons = data.map((personData) => {
        return {
          id: personData.id,
          name: personData.name,
          healthNumber: personData.healthNumber,
          address: personData.address,
          dateofBirth: personData.dateofBirth,
          phoneNumber: personData.phoneNumber,
        };
      });
      setPersons(transformedPersons);
      console.log(transformedPersons);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  // useEffect(() => {
  //   fetchPersonHandler();
  // }, [fetchPersonHandler]);

  // function addMovieHandler(movie) {
  //   console.log(movie);
  // }
  let content = <p>See all Patients Click the button Above.</p>;

  if (persons.length > 0) {
    content = <Personlist persons={persons} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <div>
        <button onClick={fetchPersonHandler}>List of Patients</button>
      </div>
      <div className="container">
        <div className="row">
          <div className="div-section">
            {
              /* {!isLoading && persons.length > 0 && (
              <Personlist persons={persons} />
            )}
            {!isLoading && persons.length === 0 && !error && (
              <h2>See all Patients Click the button Above.</h2>
            )}
            {!isLoading && error && <h2>{error}</h2>}
            {isLoading && <h1>Loading...</h1>} */

              content
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CompleteList;
