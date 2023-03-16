import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = (props) => {
  const images = [
    { src: '/Images/starwars1.jpg', alt: 'starwars-1' },
    { src: '/Images/starwars2.jpg', alt: 'starwars-2' },
    { src: '/Images/starwars3.png', alt: 'starwars-3' },
    { src: '/Images/starwars4.jpg', alt: 'starwars-4' },
  ];
  const seriesImages = [
    { src: '/Images/slider/badBatch.jpg', alt: 'badBatch' },
    { src: '/Images/slider/bobaFect.jpg', alt: 'bobaFect' },
    { src: '/Images/slider/obiwan.jpg', alt: 'obiwan' },
    { src: '/Images/slider/starWarsAndir.jpg', alt: 'starWarsAndir' },
    { src: '/Images/slider/theMadelorien.jpg', alt: 'theMadelorien' },
  ];

  const peopleImages = [
    { src: '/Images/slider/bobaFet.jpg', alt: 'bobaFet' },
    { src: '/Images/slider/girl.jpg', alt: 'girl' },
    { src: '/Images/slider/two.jpg', alt: 'two' },
    { src: '/Images/slider/vader.png', alt: 'vader' },
    { src: '/Images/slider/yoda.jpg', alt: 'yoda' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: false,
    Responsive:true
  };

  const seriesSettings = {
    autoplay:true,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  const peopleSettings = {
    infinite: true,
    speed: 1800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 800,


  };
  return (
    <>
      <section className='home-heading' >
        <h2> ALL OF YOUR STAR WARS FAVORITES NOW STREAMING ON DISNEY+</h2>
      </section>
      <div className='slider-container'>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={process.env.PUBLIC_URL + image.src} alt={image.alt} />
            </div>
          ))}
        </Slider>
      </div>

      <div className='slider-container-below'>
        <div>
          <h2>Latest Series</h2>
          <Slider {...seriesSettings}>
            {seriesImages.map((image, index) => (
              <div key={index}>
                <img src={process.env.PUBLIC_URL + image.src} alt={image.alt} />
              </div>
            ))}
          </Slider>
        </div>

        <div>
          <h2>Popular Characters</h2>
          <Slider {...peopleSettings}>
            {peopleImages.map((image, index) => (
              <div key={index}>
                <img src={process.env.PUBLIC_URL + image.src} alt={image.alt} />
              </div>
            ))}
          </Slider>
        </div>
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
