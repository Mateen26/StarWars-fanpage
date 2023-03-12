import axios from 'axios';
import React, { useEffect } from 'react';
import Navbar from './../Navbar';
import { useState } from 'react';


const People = (props) => {

  const [people, setPeople] = useState([]);


  useEffect(() => {
    loadData()
  }, []);

  const loadData = () => {
    
    try {
      axios.get('https://swapi.dev/api/people')
        .then(response => {
          setPeople(response.data.results);
        })
        .catch(error => {
          console.log(error);
        })

    } catch (error) {
      console.log('error: ', error);
      
    }
  }


  return (
    <>
      <Navbar />
      <section className="hero-section">
        <h1> People</h1>
      </section>
    </>
  );
};

export default People;
