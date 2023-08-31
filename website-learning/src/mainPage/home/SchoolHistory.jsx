import React from "react";
import "../../assets/css/Navbar.css";
import autoAnimate from '@formkit/auto-animate'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../../assets/css/index.css";

const SchoolHistory = () => {
  return ( 
    <div className="d-flex justify-content-around">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="pic_school.jpg" />
        <Card.Body>
          <Card.Title>Director</Card.Title>
          <Card.Text>
            Miss...
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="pic_school.jpg" />
        <Card.Body>
          <Card.Title text-align="center" fontFamily="cursive">teacher</Card.Title>
          <Card.Text text-align="center" fontFamily="cursive">
            Miss...
          </Card.Text>  
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="pic_school.jpg" />
        <Card.Body>
          <Card.Title>teacher</Card.Title>
          <Card.Text>
          Miss...
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="pic_school.jpg" />
        <Card.Body>
          <Card.Title>teacher</Card.Title>
          <Card.Text>
          Miss...
          </Card.Text>
        </Card.Body>
      </Card>
      
    </div>
  );
}
export default SchoolHistory;