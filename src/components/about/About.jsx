import React from 'react'
import './About.css'
import Plx from "react-plx";


const headingdata = [
    {
      start: "self",
      duration: "100vh",
      properties: [
        {
          startValue: 0,
          endValue: -400,
          property: "translateY",
        },
      ],
    },
  ];


  const headingdata2 = [
    {
      start: "self",
      duration: "70vh",
      properties: [
        {
          startValue: -160,
          endValue: 0,
          property: "translateY",
        },
      ],
    },
  ];


  

  const parlexdiv = [
    {
      start: "self",
      duration: "100vh",
      properties: [
        {
            startValue: 0,
            endValue: 1000,
            property: "translateY",
        },
      ],
    },
  ];

function About() {
  return (
    <>
    <div className='about'>
      <div className="left-abt">
            <Plx className='h-2' parallaxData={headingdata}>
                <h2>Desert</h2>
            </Plx>   
            <img src='./img1.jpg' alt="" />
      </div>
      <div className="right-abt">
        <Plx className='h-2-2' parallaxData={headingdata2}>
            <h2>About</h2>
        </Plx>   
            <p className='p-1'>
                Magic Camps combine a flavour of the Bedouin traditional way of life with the comfort of luxury accommodation plus commitment to sustainability. Our desert camps are equipped with exquisite and inviting interiors, including private bathrooms equipped with showers.
            </p>
            <h4>Imagine what would be the perfect stay for you: </h4>
            <p className='p-2'>
            Spend a few days in your private camp in a location of your choice in Dubai, Abu Dhabi or Oman ? Escape for a night or two at our eco-conscious fixed camp in Oman’s Wahiba Sands Desert ? Or celebrate an event with a magical dinner under the stars? Whatever it is, we will make it come true !
            </p>
      </div>
    </div>
    


    {/* <Plx className="parlexdiv" parallaxData={parlexdiv}>
        <img src="https://assets-global.website-files.com/5f858c8d952706d07e333d4b/60306d4fe689ff56605c654e_MAD_293.jpg" alt="" />
    </Plx> */}


    
    </>
  )
}

export default About
