import React, { useState, useEffect } from "react";
import "../../assets/css/Navbar.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../assets/css/index.css";
import "../../assets/css/mainpage.css";
import Carousel from "react-bootstrap/Carousel";

const SchoolHistory = () => {
<<<<<<< HEAD
  return ( 
    <div></div>
=======
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Define the carousel items with titles, text, and image paths
  const carouselItems = [
    {
      title: "โรงเรียนสุเหร่าคลองสิบ",
      text: "",
      image: "231020_4.jpg",
    },
    {
      title: "ประวัติโรงเรียน",
      text: "โรงเรียนสุเหร่าคลองสิบก่อตั้งเมื่อวันที่ ๒๘ ตุลาคม ๒๔๘๐โดยใช้ชื่อว่า โรงเรียนประชาบาล ตำบลคลองสิบ(สอง) อิสลามอนุกูลโดยมีนายหะยีฟีน ซัดเราะมาน และนายหะยีการีม ลาวังเป็นหัวหน้าร่วมด้วยพี่น้องชาวคลองสิบ โรงเรียนมีพื้นที่ ๕ ไร่ ต่อมา พ.ศ.๒๔๙๔ ได้งบประมาณจากทางราชการ ได้รื้อถอนจากของเดิมและปลูกสร้างใหม่ รูปแบบคล้าย ป.๑ ข. มีมุขกลางใต้ถุนสูง",
      image: "231019_2.jpg",
    },
    {
      title: "คำขวัญประจำโรงเรียน",
      text: "มุ่งศึกษา พัฒนาตน ฝึกฝนวินัย ใฝ่คุณธรรม",
      image: "231019_1.jpg",
    },
    {
      title: "ปรัชญาของโรงเรียน",
      text: "คุณธรรมและความรู้ นำไปสู่ความเจริญ",
      image: "231019_3.jpg",
    },
  ];

  // Automatic slide transition
  useEffect(() => {
    const interval = setInterval(() => {
      if (index < carouselItems.length - 1) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }, 5000); // Change image every 5 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [index, carouselItems.length]);

  return (
    <div className="d-flex justify-content-around his-space" id="schoolHistory">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={null} // Disable automatic slide transition
      >
        {carouselItems.map((item, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100"
              src={item.image}
              alt={`Slide ${idx}`}
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
            <Carousel.Caption className="carousel-caption">
              <h3 className="font-mail title-h">{item.title}</h3>
              <p className="title-p">{item.text}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
>>>>>>> devv_araya
  );
};

export default SchoolHistory;
