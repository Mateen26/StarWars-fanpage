import React from 'react';
import Navbar from './../Navbar';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./custom.css"

const Home = (props) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: false
  };
  return (
    <>
      <Navbar />
      <section className='home-heading' >
        <h2> ALL OF YOUR STAR WARS FAVORITES NOW STREAMING ON DISNEY+</h2>
      </section>
      <div className='slider-container'>
      <Slider {...settings}>
        <div>
            <img src={process.env.PUBLIC_URL + '/Images/starwars1.jpg'} alt="Image 1" />
        </div>
        <div>
          <img src={process.env.PUBLIC_URL + '/Images/starwars2.jpg'} alt="Image 2" />
        </div>
        <div>
          <img src={process.env.PUBLIC_URL + '/Images/starwars3.png'} alt="Image 3" />
        </div>
        <div>
          <img src={process.env.PUBLIC_URL + '/Images/starwars4.jpg'} alt="Image 3" />
        </div>
      </Slider>
      </div>
      <div className='peraGraph'>
        <h1> Star Wars is an American epic space opera multimedia franchise created by 
          George Lucas, which began with the eponymous 1977 film and quickly became 
          a worldwide pop culture phenomenon. The franchise has been expanded into 
          various films and other media, including television series, video games,
           novels, comic books, theme park attractions, and themed areas, comprising
            an all-encompassing fictional universe. Star Wars is one of the
             highest-grossing media franchises of all time.</h1>
      </div>
    </>
  );
};

export default Home;
