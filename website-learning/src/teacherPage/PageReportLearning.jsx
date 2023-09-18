import React from 'react'
import { saveToLocalStorage } from "../LocalStorage/localstorage";

class PageReportLearning extends React.Component {
    handlePrint = () => {
      window.print();
    };
  
    render() {
      return (
        <div>
          <button onClick={this.handlePrint}>Print Report</button>
          <h4>รายงานประเมินพัฒนาการ 5 ด้าน</h4>
          <h5>ภาคเรียนที่ 1  ปีการศึกษา 2565 ชั้นอนุบาลปีที่ 2</h5>
          <h5>โรงเรียนสุเหร่าคลองสิบ สำนักงานเขตหนองจอก กรุงเทพมหานคร</h5>
          <h5>ชื่อ-สกุล        เลขประจำตัว         </h5>
        </div>
      );
    }
  }

export default PageReportLearning