import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button, FormLabel } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import "../assets/css/test.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  showtest,
  showtestde,
  inserttestde,
  edittestde,
  deletetestde,
} from "../slice/TeacherSlice";
import {
  showclass,
  showkinroom,
  getDataAll,
  searchclasstime,
} from "../slice/DataSlice";
import { getFromLocalStorage } from "../LocalStorage/localstorage";

function AddClassTest() {
  var testdetail_name;
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
  const [showkinder, setShowKinder] = useState([]);
  const [showTest, setShowTest] = useState([]);
  const [showyear, setShowYear] = useState([]);
  const [showClass, setShowClass] = useState([]);
  const [showSearch, setshowsearch] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const testId = getFromLocalStorage("teaTest_id");
  const [insert, setinsert] = useState({
    test_id: "",
    test_status: "",
    kinder_id: "",
    yearterm_id: "",
  });
  const [showEdit, setshowEdit] = useState(false);
  const [datamodal, setDatamodal] = useState([]);
  const [update, setupdate] = useState({
    test_id: "",
    test_status: "",
    kinder_id: "",
    yearterm_id: "",
  });
  const testid = showTest.find((tes) => tes.test_id === testId);
  const testname = testid ? testid.test_detail : "";

  const loadData = () => {
    dispatch(showtestde())
      .then((result) => {
        // Filter the data to show only the rows with the specific test_id
        const filteredData = result.payload.filter(
          (data) => data.test_id === testId
        );
        setshowdata(filteredData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadTest = () => {
    dispatch(showtest())
      .then((result) => {
        setShowTest(result.payload);
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
  const handleInsert = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setinsert({
      ...insert,
      [name]: value === "Open" ? 1 : value === "Close" ? 0 : value,
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
      test_id: testId,
      test_status: insert.test_status,
      kinder_id: insert.kinder_id,
      yearterm_id: insert.yearterm_id,
    };

    dispatch(inserttestde(body))
      .then((result) => {
        setShowAdd(false);
        setShowAdd({
          test_id: "",
          test_status: "",
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
      [name]: value === "Open" ? 1 : value === "Close" ? 0 : value,
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
      id: datamodal.testDe_id,
      body: {
        test_status:
          update.test_status === ""
            ? datamodal.test_status
            : update.test_status,
        kinder_id:
          update.kinder_id === "" ? datamodal.kinder_id : update.kinder_id,
        yearterm_id:
          update.yearterm_id === ""
            ? datamodal.yearterm_id
            : update.yearterm_id,
      },
    };

    dispatch(edittestde(body))
      .then((result) => {
        setshowEdit(false);
        setupdate({
          test_id: "",
          test_status: "",
          kinder_id: "",
          yearterm_id: "",
        });
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onDelete = (id) => {
    dispatch(deletetestde(id))
      .then((result) => {
        if (result.payload && result.payload.error) {
          console.log(result.payload.error);
        } else {
          loadData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
    loadClass();
    loadKinder();
    loadYearTerm();
    loadTest();
    loadSearch();
  }, []);

  return (
    <div>
      <button className="btn-back" role="button">
        <Link to={"/test/CreateTest"} className="back-font">
          <svg
            viewBox="0 0 96 96"
            height="24px"
            id="Layer_1"
            version="1.2"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z"
              fill="#ffffff"
            />
          </svg>
          ย้อนกลับ
        </Link>
      </button>
      <div>
        <h2 className="h2">ประกาศแบบทดสอบไปยังห้องเรียน</h2>
        <h2 className="h2">{testname}</h2>
      </div>
      <div>
        <Button className="button" variant="primary" onClick={AddShow}>
          ADD
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className="TableHead">
            <TableRow>
              <TableCell>
                <p className="headerC">สถานะ</p>
              </TableCell>
              <TableCell>
                <p className="headerC">ชั้น/ห้อง</p>
              </TableCell>
              <TableCell>
                <p className="headerC">ปี/เทอม</p>
              </TableCell>
              <TableCell>
                <p className="headerC">Confix</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showdata.map((data) => {
              const {
                testDe_id,
                test_id,
                test_status,
                kinder_id,
                yearterm_id,
              } = data;
              const testid = showTest.find((tes) => tes.test_id === testId);
              const testname = testid ? testid.test_detail : "";
              testdetail_name = testname;
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
              if (test_status === "0") {
                sta = "Close";
              } else if (test_status === "1") {
                sta = "Open";
              }
              return (
                //*********************************
                <TableRow key={testDe_id}>
                  <TableCell>
                    <p>{sta}</p>
                  </TableCell>
                  <TableCell>
                    <p>
                      {kinderLevel}/{kinderRoom}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p>
                      {term}/{year}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="btn btn-secondary"
                      onClick={() => EditShow(data)}
                    >
                      EDIT
                    </Button>
                    <Button
                      className="buttonD"
                      variant="btn btn-danger"
                      onClick={() => onDelete(testDe_id)}
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Insert Data */}
      <Modal show={showAdd} onHide={AddClose}>
        <Modal.Header closeButton>
          <Modal.Title>INSERT DATA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>สถานะ</Form.Label>
              <Form.Control
                as="select"
                className="input-line"
                name="test_status"
                onChange={(e) => handleInsert(e)}
              >
                <option value="">Choose status</option>
                <option value="Open">Open</option>
                <option value="Close">Close</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="kinder_id">
              <Form.Label>ชั้น/ห้อง - เทอม/ปี</Form.Label>
              <Form.Control
                as="select"
                className="input-line"
                name="kinder_id"
                onChange={handleInsert}
                value={`${insert.kinder_id} ${insert.yearterm_id}`}
              >
                <option value="">Choose Room/Level</option>
                {showSearch.map((data) => {
                  const kinder = showkinder.find(
                    (kin) => kin?.kinder_id === data?.kinder_id
                  );
                  const kinderName = kinder
                    ? `${kinder?.kinde_level}/${kinder?.Kinder_room}`
                    : "";

                  const yearTerm = showyear.find(
                    (term) => term?.yearTerm_id === data?.yearterm_id
                  );
                  const termYearName = yearTerm
                    ? `${yearTerm?.term}/${yearTerm?.year}`
                    : "";

                  return (
                    <option
                      key={data.kinder_id}
                      value={`${data.kinder_id} ${data.yearterm_id}`}
                    >
                      {kinderName} - {termYearName}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={AddClose}>
            Close
          </Button>
          <Button variant="btn btn-outline-secondary" onClick={onInsert}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Edit Data */}
      <Modal show={showEdit} onHide={EditClose}>
        <Modal.Header closeButton>
          <Modal.Title>EDIT DATA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>สถานะ</Form.Label>
              <Form.Control
                as="select"
                className="input-line"
                placeholder={datamodal.test_status}
                onChange={(e) => handleChange(e)}
                name={"test_status"}
              >
                <option value="">Choose status</option>
                <option value="Open">Open</option>
                <option value="Close">Close</option>
              </Form.Control>
            </Form.Group>
            -
            <Form.Group className="mb-3" controlId="edit_kinder_id">
              <Form.Label>ชั้น/ห้อง - เทอม/ปี</Form.Label>
              <Form.Control
                as="select"
                className="input-line"
                name="kinder_id"
                onChange={handleChange}
                value={`${update.kinder_id} ${update.yearterm_id}`}
              >
                <option value="">Choose Room/Level</option>
                {showSearch.map((data) => {
                  const kinder = showkinder.find(
                    (kin) => kin.kinder_id === data.kinder_id
                  );
                  const kinderName = kinder
                    ? `${kinder.kinde_level}/${kinder.Kinder_room}`
                    : "";

                  const yearTerm = showyear.find(
                    (term) => term.yearTerm_id === data.yearterm_id
                  );
                  const termYearName = yearTerm
                    ? `${yearTerm.term}/${yearTerm.year}`
                    : "";

                  return (
                    <option
                      key={data.id}
                      value={`${data.kinder_id} ${data.yearterm_id}`}
                    >
                      {kinderName} - {termYearName}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={EditClose}>
            Close
          </Button>
          <Button variant="btn btn-outline-secondary" onClick={onSave}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Outlet />
    </div>
  );
}

export default AddClassTest;
