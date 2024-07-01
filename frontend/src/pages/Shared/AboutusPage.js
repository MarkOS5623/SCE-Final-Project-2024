import React from 'react';
import imageSrc from '../../assests/1496042374449-0.jpg'; // Corrected path to your image file
import '../AboutUs.css'; // Import your CSS file for styling
import CardContainer from '../../components/cardContainer';
function AboutUS() {
  return (
    
    <CardContainer style={{ marginTop: '5px', textAlign: 'left' }}>
    <main> 
    <div className="App">
      <header>
        <img src={imageSrc} className="App-logo" alt="logo" />
      </header>
     
        <h2 style={{ color: 'white' }}>About SCE</h2>
        <p style={{ fontSize: '1.5em' }} >Shamoon College of Engineering (SCE) is Israel's largest college dedicated to engineering the future.</p>
        
        <div className="about-us-container">
          <div style={{ padding: '50px ' }} className="section about-sce">

            <p>Combining world-class academic excellence with a unique approach to education and social responsibility, SCE is much more than a college; it is a source of inspiration and cultivation which encourages forward-thinking and facilitates significant achievements. "Engineering the future" is both our promise and our mission, which propels our students forward and leads them to set an example of excellence amongst their peers and within their communities. With two campuses located in southern Israel, a continuously growing body of over 6,000 students, six different engineering tracks and new faculty of design and architecture, SCE is, and will always be, a pioneering academic powerhouse.</p>
            <p>At SCE, engineering goes way beyond the academic framework; it is a way of thinking, analyzing and solving fundamental questions that design the way people live their lives. Driven by a vision of outstanding education and social responsibility, SCE is committed to the pursuit of excellence, innovation, and promoting all communities.</p>
            <a style={{color: 'rgba(0, 0, 0)'}} href="https://en.sce.ac.il/sce/about/strategic_plan_for_sce_%E2%80%93_shamoon_college_of_engineering" target="_blank" rel="noopener noreferrer">Strategic Plan for SCE - Shamoon College of Engineering</a>
          </div>
          <div className="section sce-video">
            <h2 style={{ color: 'white' }}>SCE Video</h2>
            <iframe width="847" height="476" src="https://www.youtube.com/embed/0mY9g9nhYt8" title="SCE Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>    
        </div>
        <p>created by: Itai Damri and Mark Grinblat</p>
      
    </div>
    </main>
    </CardContainer>
  );
}

export default AboutUS;
