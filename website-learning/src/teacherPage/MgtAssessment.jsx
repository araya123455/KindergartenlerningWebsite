import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button, FormLabel } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import {
  showassessment,
  insertassessment,
  editassessment,
  deleteassessment,
}from "../slice/DataSlice";
import { 
    showclass,
    showkinroom,
    getDataAll,
    searchclasstime,
  } from "../slice/DataSlice";

function MgtAssessment(props) {
  var assessmentdetail_name;
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
  const [showAssessment, setShowassessment] = useState([]);
  const [showkinder, setShowKinder] = useState([]);
  const [showyear, setShowYear] = useState([]);
  const [showClass, setShowClass] = useState([]);
  const [showSearch, setshowsearch] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  //const insert assessment
  const [insert, setinsert] = useState({
    asses_id: "",
    assess_name: "",
    full_score: "",
    kinder_id: "",
    yearterm_id: "",
  });
  //const edit assessment
  const [showEdit, setshowEdit] = useState(false);
  const [datamodal, setDatamodal] = useState([]);
  const [update, setupdate] = useState({
    asses_id: "",
    assess_name: "",
    full_score: "",
    kinder_id: "",
    yearterm_id: "",
  });
  const assesid = showAssessment.find((ass) => ass.asses_id === props.data);
  const assessname = assesid ? assesid.assess_detail : "";

  // const loadData = () => {
  //   dispatch(showassessment())
  //     .then((result) => {
  //       console.log(result);
  //       const filteredData = result.payload.filter(
  //         (data) => data.asses_id === props.data
  //       );
  //       setshowdata(filteredData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const onClickId = (id) => {
  //   console.log("id: ", id);
  //   props.set(props.data * id);
  // };

  const loadAssessment = () => {
    dispatch(showassessment())
      .then((result) => {
        setShowassessment(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadKinder = () => {
    dispatch(showkinroom())
      .then((result) => {
        setShowKinder(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadYearTerm = () => {
    dispatch(getDataAll())
      .then((result) => {
        setShowYear(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadSearch = () => {
    dispatch(searchclasstime())
      .then((result) => {
        setshowsearch(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadClass = () => {
    dispatch(showclass())
      .then((result) => {
        setShowClass(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const AddClose = () => {
    setShowAdd(false);
    loadData();
  };
  const AddShow = () => {
    setShowAdd(true);
    loadData();
  };
//---------------insert-------------
  const handleInsert = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setinsert({
      ...insert,
      [name]: value === "enhance" ? 1 : value === "movement" ? 2 :  value === "activities" ? 3 :value === "art" ? 4 :value === "outdoor" ? 5 :value,
    });
    if (name === "kinder_id") {
      const [selectedKinderId, selectedYeartermId] = value.split(" ");
      setinsert((prevInsert) => ({
        ...prevInsert,
        kinder_id: selectedKinderId,
        yearterm_id: selectedYeartermId,
      }));
    }
  };

  const onInsert = () => {
    let body = {
      asses_id: props.data,
      assess_name: insert.assess_name,
      full_score: insert.full_score,
      kinder_id: insert.kinder_id,
      yearterm_id: insert.yearterm_id,
    };

    dispatch(insertassessment(body))
      .then((result) => {
        setShowAdd(false);
        setShowAdd({
          asses_id: "",
          assess_name: "",
          full_score: "",
          kinder_id: "",
          yearterm_id: "",
        });
        loadData();
        AddClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const EditClose = () => {
    setshowEdit(false);
  };
  const EditShow = (data) => {
    setDatamodal(data);
    setshowEdit(true);
  };
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setupdate({
      ...update,
      [name]: value === "enhance" ? 1 : value === "movement" ? 2 :  value === "activities" ? 3 :value === "art" ? 4 :value === "outdoor" ? 5 :value,
    });

    if (name === "kinder_id") {
      const [selectedKinderId, selectedYeartermId] = value.split(" ");
      setupdate((prevUpdate) => ({
        ...prevUpdate,
        kinder_id: selectedKinderId,
        yearterm_id: selectedYeartermId,
      }));
    }
  };
  const onSave = () => {
    let body = {
      id: datamodal.assesMent_id,
      body: {
        assessment_names:
          update.assessment_names === ""
            ? datamodal.assessment_names   
            : update.assessment_names,
        kinder_id:
          update.kinder_id === "" ? datamodal.kinder_id : update.kinder_id,
        yearterm_id:
          update.yearterm_id === ""
            ? datamodal.yearterm_id
            : update.yearterm_id,
      },
    };

    dispatch(editassessment(body))
      .then((result) => {
        setshowEdit(false);
        setupdate({
          asses_id: "",
          assess_name: "",
          full_score: "",
          kinder_id: "",
          yearterm_id: "",
        });
        loadAssessment();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onDelete = (id) => {
    dispatch(deleteassessment(id))
      .then((result) => {
        if (result.payload && result.payload.error) {
          console.log(result.payload.error);
        } else {
          loadAssessment();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // loadData();
    
    loadClass();
    loadKinder();
    loadYearTerm();
    loadAssessment();
    loadSearch();
  }, []);
  
  return (
    <div>
      <div>
        <h1>Add Assessment</h1>
      </div>
      {/* <Link to={"/StudentAssessment"} onClick={() => onClickId(0)}>
        <svg
          baseProfile="tiny"
          height="24px"
          id="Layer_1"
          version="1.2"
          viewBox="0 0 24 24"
          width="24px"
          //   xml:space="preserve"
          //   xmlns="http://www.w3.org/2000/svg"
          //   xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g>
            <path d="M19.164,19.547c-1.641-2.5-3.669-3.285-6.164-3.484v1.437c0,0.534-0.208,1.036-0.586,1.414   c-0.756,0.756-2.077,0.751-2.823,0.005l-6.293-6.207C3.107,12.523,3,12.268,3,11.999s0.107-0.524,0.298-0.712l6.288-6.203   c0.754-0.755,2.073-0.756,2.829,0.001C12.792,5.463,13,5.965,13,6.499v1.704c4.619,0.933,8,4.997,8,9.796v1   c0,0.442-0.29,0.832-0.714,0.958c-0.095,0.027-0.19,0.042-0.286,0.042C19.669,19.999,19.354,19.834,19.164,19.547z M12.023,14.011   c2.207,0.056,4.638,0.394,6.758,2.121c-0.768-3.216-3.477-5.702-6.893-6.08C11.384,9.996,11,10,11,10V6.503l-5.576,5.496l5.576,5.5   V14C11,14,11.738,14.01,12.023,14.011z" />
          </g>
        </svg>
      </Link> */}
      {/* <div>
        <h2>{assessname}</h2>
      </div> */}
      <div>
        <Button className="button" variant="primary" onClick={AddShow}>
          ADD
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ชื่อแบบประเมิน</th>
            <th>คะแนนเต็ม</th>
            <th>ชั้น/ห้อง</th>
            <th>ปี/เทอม</th>
            <th>Confix</th>
          </tr>
        </thead>
        <tbody>
          {}
          {showAssessment?.map((data) => {
            console.log("");
            const {asses_id, assess_name, full_score, kinder_id, yearterm_id } =
              data;
           
            const kinder = showkinder.find(
              (kin) => kin.kinder_id === kinder_id
            );
            const kinderLevel = kinder ? kinder.kinde_level : "";
            const kinderRoom = kinder ? kinder.Kinder_room : "";

            const yearTerm = showyear.find(
              (term) => term.yearTerm_id === yearterm_id
            );
            const year = yearTerm ? yearTerm.year : "";
            const term = yearTerm ? yearTerm.term : "";
            var sta;
           
            return ( //*********************************
              <tr key={asses_id}>
                <td>{assess_name}</td>
                <td>{full_score}</td>
                <td>
                  {kinderLevel}/{kinderRoom}
                </td>
                <td>
                  {term}/{year}
                </td>
                <td>
                  <Button
                    variant="btn btn-secondary"
                    onClick={() => EditShow(data)}
                  >
                    EDIT
                  </Button>
                  <Button
                    className="buttonD"
                    variant="btn btn-danger"
                    onClick={() => onDelete(asses_id)}
                  >
                    DELETE
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
     
      <Outlet />
    </div>
  )
}

export default MgtAssessment