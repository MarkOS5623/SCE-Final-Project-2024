import React from 'react';
import CardContainer from '../../components/cardContainer';
import '../ContactUs.css'; 
import imageSrc1 from '../../assets/linkedin.png';
import imageSrc2 from '../../assets/facebook.png'; 
import imageSrc3 from '../../assets/instagram.png'; 
import imageSrc from '../../assets/youtube.png'; 
function ContactUs() {
  return (
    <CardContainer style={{ marginTop: '5px', textAlign: 'left' }}>
      <div className="container">
        <header>
        <h1 >We will be happy to assist you, and respond to any questions or comments you may have.</h1>
          <p>Main Contact</p>
          <p>Please feel free to contact us, and we will get back to you as soon as possible.</p>
        </header>
        <main className="contact-main">
          <div className="campus-info">
            <div className="beer-sheva-campus">
              <h2>Be'er Sheva Campus</h2>
              <p>56 Bialik St.</p>
              <p>Be'er Sheva 8410802</p>
              <p>Tel: 1-800-207-777</p>
              <p>Fax: 08-6475777</p>
              <a href="mailto:info@sce.ac.il">Info@sce.ac.il</a>
              <p>Fax for CEO's Office: 08-6475695</p>
            </div>
            <div className="ashdod-campus">
              <h2>Ashdod Campus</h2>
              <p>84 Jabotinsky St.</p>
              <p>Ashdod 77245</p>
              <p>Tel: 1-800-207-777</p>
              <p>Fax: 08-8519192</p>
              <a href="mailto:info@sce.ac.il">Info@sce.ac.il</a>
              <p>Fax for CEO's Office: 08-6475695</p>
            </div>
          </div>
        </main>
        <footer>
          <div className="social-media">
            <a href="https://www.linkedin.com/school/-sce/?originalSubdomain=il" target="_blank" rel="noopener noreferrer">
              <img src={imageSrc1} alt="LinkedIn Icon" className="social-media-icon" style={{ marginRight: '10px' }} />
            </a>
            <a href="https://www.youtube.com/channel/UCCWmVlEKNocDKONunCfB38Q/videos" target="_blank" rel="noopener noreferrer">
              <img src={imageSrc} alt="YouTube Icon" className="social-media-icon" style={{ marginRight: '10px' }} />
            </a>
            <a href="https://www.facebook.com/sceenglish/" target="_blank" rel="noopener noreferrer">
              <img src={imageSrc2} alt="Facebook Icon" className="social-media-icon" style={{ marginRight: '10px' }} />
            </a>
            <a href="https://www.instagram.com/?next=https%3A%2F%2Fwww.instagram.com%2Fsce.academy%2F&is_from_rle" target="_blank" rel="noopener noreferrer">
              <img src={imageSrc3} alt="Instagram Icon" className="social-media-icon" />
            </a>
          </div>
        </footer>
      </div>
    </CardContainer>
  );
}

export default ContactUs;
