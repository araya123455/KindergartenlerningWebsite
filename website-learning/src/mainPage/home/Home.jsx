import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Img,
  Link,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import "../../assets/css/home.css";
import "../../assets/css/index.css";
// import "../../assets/css/home.css"
// import { Videos } from "../../component/videos";

// import Contact from "./Contact";
// import Personnel from "./Personnel";
// import SchoolHistory from "./SchoolHistory";
// // import "../../assets/css/mainpage.css";
//import { FaBeer } from 'react-icons/fa'

const MidCompsArray = [
  {
    id: 1,
    flx: "row",
    leftImage: "activity1.jpg",
    RightSideHeading: (
      <h2 className="font-mail con-cen">
        ส่งเสริมพัฒนาการด้านร่างกาย ของเด็กอนุบาล
      </h2>
    ),
    RightSideText: (
      <h5 className="con-cover con-cen">
        การเคลื่อนไหวอยู่กับที่ การเคลื่อนไหวเคลื่อนที่
        การเคลื่อนไหวพร้อมวัสดุอุปกรณ์
        การเคลื่อนไหวที่ใช้การประสานสัมพันธ์ของการใช้กล้ามเนื้อมัดใหญ่ในการขว้าง
        การจับ การโยน การเตะ
      </h5>
    ),
    RightCommenter: (
      <h2 className="font-mail con-cen">
        การใช้กล้ามเนื้อเล็ก การใช้กล้ามเนื้อใหญ่
      </h2>
    ),
    RightSideCommenterStatus: (
      <h5 className="con-cover con-cen">
        การเล่นเครื่องเล่นสัมผัสและการสร้างจากแท่งไม้ บล็อก
        การเขียนภาพและการเล่นกับสีการปั้น การประดิษฐ์สิ่งต่างๆด้วย
        เศษวัสดุการหยิบจับ การใช้กรรไกร การฉีก การตัด การปะ และการร้อยวัสดุ{" "}
      </h5>
    ),
    // logo2: "logo_school.jpg",
  },
  {
    id: 2,
    flx: "row-reverse",
    leftImage: "activity2.jpg",
    RightSideHeading: (
      <h2 className="font-mail con-cen">ส่งเสริมพัฒนาการด้านอารมณ์ จิตใจ</h2>
    ),
    RightSideText: (
      <h5 className="con-cover con-cen">
        ให้เด็กได้แสดงออกทางอารมณ์และความรู้สึกของตนเองที่เหมาะสมกับวัย
        ตระหนักถึงลักษณะพิเศษเฉพาะที่เป็นอัตลักษณ์ ความเป็นตัวของตัวเอง
        มีความสุข ร่าเริงแจ่มใส การเห็นอกเห็นใจผู้อื่นได้พัฒนาคุณธรรม จริยธรรม
        สุนทรียภาพ ความรู้สึกที่ดีต่อตนเอง
        และความเชื่อมั่นในตนเองขณะปฏิบัติกิจกรรม สุนทรียภาพ ดนตรี การเล่น
        คุณธรรม จริยธรรม การแสดงออกทางอารมณ์
        การมีอัตลักษณ์เฉพาะตนและเชื่อว่าตนเองมีความสามารถ การเห็นอกเห็นใจผู้อื่น
      </h5>
    ),
    // logo2: "logo_school.jpg",
  },
  {
    id: 3,
    flx: "row",
    leftImage: "activity3.jpg",
    RightSideHeading: (
      <h2 className="font-mail con-cen">ส่งเสริมพัฒนาการด้านสังคม</h2>
    ),
    RightSideText: (
      <h5 className="con-cover con-cen">
        การปฏิบัติกิจวัตรประจำวัน การดูแลรักษาธรรมชาติและสิ่งแวดล้อม
        การปฏิบัติตามวัฒนธรรมท้องถิ่นที่อาศัยและความเป็นไทย การมีปฏิสัมพันธ์
        มีวินัย มีสวนร่วม และบทบาทสมาชิกของสังคม การเล่นแบบร่วมมือร่วมใจ
        การแก้ปัญหาความขัดแย้ง การยอมรับในความเหมือนและความแตกต่างระหว่างบุคคล
      </h5>
    ),
    // logo2: "logo_school.jpg",
  },
];
const MidComps = (props) => {
  const {
    flx,
    leftImage,
    rightImage,
    logo,
    RightSideHeading,
    RightSideText,
    RightSideComment,
    RightCommenter,
    RightSideCommenterStatus,
    logo2,
  } = props;
  return (
    <div flexDirection={{ base: flx }} py={20} textAlign="center">
      <br />
      <Container margin="auto">
        <center>
          <Img
            src={leftImage}
            alt="image"
            width="300"
            height="300"
            border-radius="25px"
          />
        </center>
      </Container>
      <br />
      <Container>
        <Stack p={4}>
          <Heading fontFamily="cursive" textAlign="center" size="lg" mb={4}>
            {RightSideHeading}
          </Heading>
          <Text fontFamily="cursive" textAlign="center" fontSize="xl" mb={6}>
            {RightSideText}
          </Text>
          <hr style={{ margin: "2rem 0rem" }} />
          <Text fontFamily="cursive">{RightSideComment}</Text>
          <Container p={0} mt={4}>
            <Heading
              fontFamily="cursive"
              textAlign="center"
              fontSize="lg"
              mb={2}
            >
              {RightCommenter}
            </Heading>
            <Text textAlign="center" fontFamily="cursive">
              {RightSideCommenterStatus}
            </Text>
          </Container>
        </Stack>
      </Container>
    </div>
  );
};

const FooterVStack = (props) => {
  return (
    <Box align="left">
      <Box py={"5"}>
        <Heading fontFamily="cursive" textAlign="center" fontSize={"md"}>
          {props.Heading}
        </Heading>
      </Box>
      <Stack py="2" spacing={8}>
        {props.Links.map((el) => (
          <Link key={el}>
            <Heading fontFamily="cursive" textAlign="center" fontSize={"sm"}>
              {el}
            </Heading>
          </Link>
        ))}
      </Stack>
    </Box>
  );
};
export const Home = () => {
  return (
    <Box id="home">
      <div px={"5rem"} flexDirection={{ base: "column", md: "column" }}>
        <div id="clouds">
          <div className="cloud x1"></div>
          <div className="cloud x2"></div>
          <div className="cloud x3"></div>
          <div className="cloud x4"></div>
          <div className="cloud x5"></div>
          <div className="cloud x6"></div>
          <div className="cloud x7"></div>
        </div>
        <Flex
          bg="rgb(240,240,244)"
          //   backgroundImage = "catoon.jpg"
          flexDirection={{ base: "column", md: "row" }}
          className="con-cover con-hc con-hm"
        >
          <Container p="10" align="center">
            <VStack p="10" textAlign="center">
              <Heading textAlign={"center"}>
                <h1>ส่งเสริมการเรียนรู้ระดับชั้นปฐมวัย</h1>
              </Heading>
              <Spacer />
              {/* <Text lineHeight={2} text-align="center" fontFamily="cursive" fontSize="5xl" noOfLines={"4"}>
              Early childhood education is a holistic development of children from birth to 6 years of age on the
               basis of nurture and promotion of learning processes that respond to nature and the 
               age-appropriate development of each child to their full potential. under the social 
               and cultural context where children live with love and generosity and everyone's 
               understanding To build a foundation of quality of life for children to develop into 
               complete human beings, creating value for themselves, families,
                society and the nation.<br></br>
              </Text> */}
              <Text
                lineHeight={2}
                text-align="center"
                fontSize="5xl"
                noOfLines={"4"}
              >
                <h5 className="con-h">
                  การศึกษาปฐมวัยเป็นการพัฒนาเด็กตั้งแต่แรกเกิดถึง ๖
                  ปีบริบูรณ์อย่างเป็นองค์รวม
                  บนพื้นฐานการอบรมเลี้ยงดูและการส่งเสริมกระบวนการเรียนรู้ที่สนองต่อธรรมชาติและพัฒนาการตามวัยของเด็กแต่ละคนให้เต็มตามศักยภาพ
                  ภายใต้บริบทสังคมและวัฒนธรรมที่เด็กอาศัยอยู่ ด้วยความรัก
                  ความเอื้ออาทร
                  และความเข้าใจของทุกคนเพื่อสร้างรากฐานคุณภาพชีวิตให้เด็กพัฒนาไปสู่ความเป็นมนุษย์ที่สมบูรณ์เกิดคุณค่าต่อตนเอง
                  ครอบครัว สังคมและประเทศชาติ
                </h5>
              </Text>
            </VStack>
            {/* <Button ml='12' h={'16'} size='lg' px='1rem' borderRadius='50' colorScheme='blue' bg='blue.600'><NavLink to='/signup'>Sign up free</NavLink></Button> */}
          </Container>
          <Container>
            <Box p="4">
              <Button
                m="0"
                p="0"
                color="blue"
                borderRadius="50%"
                bg="white"
                top={"15rem"}
              >
                {/* <AlertDialogExample
                  src={
                    "https://storage.googleapis.com/lumen5-site-images/website-assets/product-tour-header.mp4"
                  }
                /> */}
              </Button>
              {/* <Img src="logo_school.jpg" /> */}
            </Box>
          </Container>
        </Flex>
        {MidCompsArray.map((el) => (
          <MidComps
            key={el.id}
            flx={el.flx}
            leftImage={el.leftImage}
            logo={el.logo}
            RightSideHeading={el.RightSideHeading}
            RightSideText={el.RightSideText}
            RightSideComment={el.RightSideComment}
            RightCommenter={el.RightCommenter}
            RightSideCommenterStatus={el.RightSideCommenterStatus}
            logo2={el.logo2}
          />
        ))}

        <Flex
          gap={"0"}
          margin="auto"
          w="100%"
          justifyContent={"space-evenly"}
          wrap={"wrap"}
          fontFamily="cursive"
        ></Flex>
      </div>
    </Box>
  );
};
// const Home = () => {
//   return (
//     <div className="p-5 text-center bg-image rounded-5 shadow"
//       style={{
//         backgroundImage: "url(/klongsip_pic.jpg)",
//         height: "10rem",
//         marginTop: "0rem",
//         marginBottom: "01rem",
//       }}
//     >
//       <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
//         <div className="d-flex justify-content-center align-items-center h-100">
//           <div className="text-white">
//             <h1 className="display-4">Surao Klong Sip School <FaBeer></FaBeer> </h1>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
export default Home;
