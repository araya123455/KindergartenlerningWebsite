import React from "react";
import "../../assets/css/index.css";
// import "../../assets/css/mainpage.css";
// import {Box,Button,Container,Flex,Heading,Img,Link,Spacer,Stack,Text,VStack} from "@chakra-ui/react";
// import { NavLink } from "react-router-dom"

// const FooterArray = [
//   {
//     Heading: "CONTACT",
//     Links: [
//       "Suroa Klongsip School",
//       "Email : Suraoklongsib@gmail.com ",
//       "Phone: 02 988 6307",
//       "Facebook : โรงเรียนสุเหร่าคลองสิบ"
//     ],
//   },
// ];
// export const Contact = () => {
//   return (
//   <Box p={'5'} bg='rgb(36,40,47)' width={'100%'} >
//   <Flex gap='5rem' spacing={'5rem'} py='4rem' color={'white'}  >
//       <Box align='right' width={'45%'}  >
//           <Box align='left' width={'50%'}  >
//               <Box py={'5'}>
//                   <Img w={'120px'} src="https://storage.googleapis.com/lumen5-site-images/L5-logo/L5-logo-white.png" />
//               </Box>
//               <Text textAlign={'left'}>Lumen5 combines powerful A.I. with a simple drag-and-drop interface to help you create professional video content in minutes.</Text>
//           </Box>
//       </Box>
//       <Flex justifyContent={'space-evenly'} width={'100%'} >
//           {
//               FooterArray.map((el) => {
//                   return <FooterVStack Heading={el.Heading}/>
//               })
//           }
//       </Flex>
//   </Flex>
// </Box>
//   );
// }
// const LeftSide = () => {
//   return (
//     <div>
//       <iframe
//          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495706.5915491233!2d100.33179773570721!3d13.916409034339141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d7062b406cd4b%3A0x52611c444d5c2491!2sSurao%20Khlong%20Sip%20School!5e0!3m2!1sen!2sth!4v1688481799395!5m2!1sen!2sth"
//          width="670"
//          height="450"
//         style={{ border: "0" }}
//         allowfullscreen=""
//         loading="lazy"
//       ></iframe>
//     </div>
//   );
// };
// const RightSide = () => {
//   return (
//     <div className="right">
//       <h2>Contact Us</h2>
//       <p>Address: 18 หมู่ 8 Khlong Sip, Nong Chok, Bangkok 10530</p>
//       <p>Phone: 02 988 6307</p>
//     </div>
//   );
// };
const Contact = () => {
  return (
    
    <div
      className=" p-3 mb-8 shadow-5-strong rounded-0"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-7">
          {/* <div className="vertical"> */}
            <h4>Contact Us</h4>
            <h5 className="el el-align-center, text-muted">office hours</h5>
            <h6 className="text-muted">Closed : Saturday and Sunday </h6>
            <h6 className="text-muted">office hours : Monday - Friday </h6>
            <h6 className="text-muted">Time : 8PM - 4AM</h6>
            <h6 className="text-muted">Email : Suraoklongsib@gmail.com</h6>
            <h6 className="text-muted">Phone : 02 988 6307</h6>           
              <p>"You can contact us only during business hours."</p>
          </div>
          
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495706.5915491233!2d100.33179773570721!3d13.916409034339141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d7062b406cd4b%3A0x52611c444d5c2491!2sSurao%20Khlong%20Sip%20School!5e0!3m2!1sen!2sth!4v1688481799395!5m2!1sen!2sth"
            width="300"
            height="300"
            // style={{ border: "3" }}
            // allowfullscreen=""
            // loading="lazy"
          ></iframe>
        </div>
      </div>
    // </div>
  );
};

export default Contact;
