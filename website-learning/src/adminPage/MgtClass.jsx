import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  showclass,
  insertclass,
  editclass,
  deleteclass,
  showstudent,
  showclasstime,
  showkinroom,
  getDataAll,
  searchclasstime,
  showteacher,
} from "../slice/DataSlice";
import { searchstuclass } from "../slice/searchSlice";

function MgtClass() {
  const dispatch = useDispatch();
  const [classroomTimetableData, setClassroomTimetableData] = useState([]);
  const [showstu, setshowstu] = useState([]);
  const [showkinder, setShowKinder] = useState([]);
  const [showyear, setShowYear] = useState([]);
  const [showSearch, setshowsearch] = useState([]);
  const [teacherNamesMap, setTeacherNamesMap] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [insert, setInsert] = useState({
    kinder_id: "",
    yearterm_id: "",
    stu_id: "",
    crt_id: "",
  });
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({
    class_id: "",
    kinder_id: "",
    yearterm_id: "",
    stu_id: "",
    crt_id: "",
  });

  const [filteredData, setFilteredData] = useState([]);
  const [Todisplay, setTodisplay] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Adjust as needed

  const loadData = () => {
    dispatch(showclass())
      .then((result) => {
        setTodisplay(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadstudent = () => {
    dispatch(showstudent())
      .then((result) => {
        setshowstu(result.payload);
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
  // load teacher
  const loadTeacher = () => {
    dispatch(showteacher())
      .then((result) => {
        // Convert the teacher data to a map of { tch_id: teacherName }
        const teacherMap = result.payload.reduce((map, teacher) => {
          const teacherName = `${teacher.prefix} ${teacher.tch_Fname} ${teacher.tch_Lname}`;
          map[teacher.tch_id] = teacherName;
          return map;
        }, {});
        setTeacherNamesMap(teacherMap); // Save the teacher names map
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadTeacherID = () => {
    dispatch(showteacher())
      .then((result) => {
        dispatch(showclasstime())
          .then((timetableResult) => {
            // console.log(timetableResult.payload); // Add this line to check the content of timetableResult.payload
            setClassroomTimetableData(timetableResult.payload);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // load search classtime
  const loadSearch = () => {
    dispatch(searchclasstime())
      .then((result) => {
        setshowsearch(result.payload);
        // console.log(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const clas = showSearch.find((cla) => cla)

  const handleInsert = (e) => {
    const { name, value } = e.target;
    setInsert((prevInsert) => ({
      ...prevInsert,
      [name]: value,
    }));

    if (name === "kinder_id") {
      const [selectedKinderId, selectedYeartermId, selectclassId] =
        value.split(" ");
      setInsert((prevInsert) => ({
        ...prevInsert,
        kinder_id: selectedKinderId,
        yearterm_id: selectedYeartermId,
        crt_id: selectclassId,
      }));
    }
  };

  const onInsert = () => {
    const { kinder_id, yearterm_id, stu_id, crt_id } = insert;
    if (!kinder_id || !yearterm_id || !stu_id || !crt_id) {
      alert("กรุณาป้อนข้อมูลให้ครบก่อนบันทึก!!");
      return;
    }

    const body = {
      kinder_id,
      yearterm_id,
      stu_id,
      crt_id,
    };

    dispatch(insertclass(body))
      .then(() => {
        setShowAdd(false);
        setInsert({
          kinder_id: "",
          yearterm_id: "",
          stu_id: "",
          crt_id: "",
        });
        loadData();
        closeEditModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "kinder_id") {
      const [selectedKinderId, selectedYeartermId, selectclassId] =
        value.split(" ");
      setEditData((prevData) => ({
        ...prevData,
        kinder_id: selectedKinderId,
        yearterm_id: selectedYeartermId,
        crt_id: selectclassId,
      }));
    }
  };

  const handleFilter = () => {
    if (!selectedFilter) {
      loadData();
      // console.error("Please select a filter value.");
      return;
    }

    // Split the selected option value to get kinder_id and yearterm_id
    const [selectedKinderId, selectedYeartermId] = selectedFilter.split(" ");

    // Convert the IDs to integers (if needed)
    const selectedKinderIdInt = parseInt(selectedKinderId, 10);
    const selectedYeartermIdInt = parseInt(selectedYeartermId, 10);

    if (isNaN(selectedKinderIdInt)) {
      console.error("Invalid kinder_id");
      return;
    }
    if (isNaN(selectedYeartermIdInt)) {
      console.error("Invalid yearterm_id");
      return;
    }

    // Dispatch the action to fetch filtered data based on selected filters
    dispatch(
      searchstuclass({
        kinder_id: selectedKinderIdInt,
        yearterm_id: selectedYeartermIdInt,
      })
    )
      .then((result) => {
        setFilteredData(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onEdit = () => {
    const { class_id, kinder_id, yearterm_id, stu_id, crt_id } = editData;

    const body = {
      id: class_id,
      body: {
        kinder_id,
        yearterm_id,
        stu_id,
        crt_id,
      },
    };

    dispatch(editclass(body))
      .then(() => {
        setShowEdit(false);
        setEditData({
          class_id: "",
          kinder_id: "",
          yearterm_id: "",
          stu_id: "",
          crt_id: "",
        });
        loadData();
        closeEditModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteclass(id))
        .then(() => {
          loadData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const openAddModal = () => {
    setShowAdd(true);
  };

  const closeAddModal = () => {
    setShowAdd(false);
  };

  const openEditModal = (data) => {
    setEditData(data);
    setShowEdit(true);
  };

  const closeEditModal = () => {
    setShowEdit(false);
  };

  // Filter out students that have already been added to the table
  const getAvailableStudents = () => {
    const addedStudentIds = Todisplay.map((data) => data.stu_id);
    return showstu.filter((stu) => !addedStudentIds.includes(stu.stu_id));
  };

  useEffect(() => {
    // Load all the data and store it in both state variables
    loadData();
    loadstudent();
    loadKinder();
    loadYearTerm();
    loadSearch();
    loadTeacherID();
    loadTeacher();
    // Fetch the original data for filtering (remove this part from here)
  }, []);

  // Update Todisplay whenever filteredData changes
  useEffect(() => {
    setTodisplay(filteredData.length > 0 ? filteredData : Todisplay);
    // console.log(filteredData);
  }, [filteredData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when the rows per page changes
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="filter_kinder_id">
          <Form.Label>Filter by Kinder/YearTerm</Form.Label>
          <Form.Control
            as="select"
            className="input-line"
            name="filter_yearterm_id"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="">Show All Room/Level</option>
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
                  key={data.kinder_id}
                  value={`${data.kinder_id} ${data.yearterm_id}`}
                >
                  {kinderName} - {termYearName}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Button className="button" variant="primary" onClick={handleFilter}>
          Apply Filter
        </Button>
      </Form>
      <Button className="button" variant="primary" onClick={openAddModal}>
        ADD
      </Button>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className="TableHead">
            <TableRow>
              <TableCell>
                <p className="headerC">ชั้น/ห้อง</p>
              </TableCell>
              <TableCell>
                <p className="headerC">เทอม/ปี</p>
              </TableCell>
              <TableCell>
                <p className="headerC">ชื่อ-นามสกุล</p>
              </TableCell>
              <TableCell>
                <p className="headerC">เลขประจำตัว</p>
              </TableCell>
              <TableCell>
                <p className="headerC">ครูผู้สอน</p>
              </TableCell>
              <TableCell>
                <p className="headerC">Actions</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Todisplay?.slice(startIndex, endIndex)?.map((data, index) => {
              const { class_id, kinder_id, yearterm_id, stu_id } = data;

              const student = showstu.find((stu) => stu.stu_id === stu_id);
              const studentFName = student ? student.stu_Fname : "";
              const studentLName = student ? student.stu_Lname : "";
              const studentprefix = student ? student.prefix : "";
              const studentsn = student ? student.stu_sn : "";
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

              const teacherIds = classroomTimetableData
                .filter((entry) => entry.kinder_id === kinder_id)
                .map((entry) => entry.tch_id);
              const teacherNames = teacherIds.map((tch_id) => {
                return teacherNamesMap[tch_id] || "";
              });

              return (
                <TableRow key={class_id}>
                  <TableCell>
                    {kinderLevel}/{kinderRoom}
                  </TableCell>
                  <TableCell>
                    {term}/{year}
                  </TableCell>
                  <TableCell>
                    {studentprefix} {studentFName} {studentLName}
                  </TableCell>
                  <TableCell>{studentsn}</TableCell>
                  <TableCell>{teacherNames.join(", ")}</TableCell>
                  <TableCell>
                    <Button
                      variant="btn btn-secondary"
                      onClick={() => openEditModal(data)}
                    >
                      EDIT
                    </Button>
                    <Button
                      className="buttonD"
                      variant="btn btn-danger"
                      onClick={() => onDelete(class_id)}
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]} // You can adjust these options
          component="div"
          count={Todisplay.length} // Total number of rows
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      {/* Insert Data */}
      <Modal show={showAdd} onHide={closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>INSERT DATA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="kinder_id">
              <Form.Label>ชั้น/ห้อง - เทอม/ปี</Form.Label>
              <Form.Control
                as="select"
                className="input-line"
                name="kinder_id" // Add the name attribute
                onChange={handleInsert} // Attach onChange directly to Form.Control
                value={`${insert.kinder_id} ${insert.yearterm_id} ${insert.crt_id}`}
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
                      key={data.kinder_id}
                      value={`${data.kinder_id} ${data.yearterm_id} ${data.crt_id}`}
                    >
                      {kinderName} - {termYearName}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="stu_id">
              <Form.Label>นักเรียน</Form.Label>
              <Form.Control
                as="select"
                className="input-line"
                name="stu_id"
                onChange={handleInsert}
                value={insert.stu_id}
              >
                <option value="">Choose student</option>
                {getAvailableStudents().map((stu) => (
                  <option key={stu.stu_id} value={stu.stu_id}>
                    {stu.stu_Fname} {stu.stu_Lname}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddModal}>
            Close
          </Button>
          <Button variant="btn btn-outline-secondary" onClick={onInsert}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Data */}
      <Modal show={showEdit} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>EDIT DATA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="edit_kinder_id">
              <Form.Label>ชั้น/ห้อง - เทอม/ปี</Form.Label>
              <Form.Control
                as="select"
                className="input-line"
                name="kinder_id"
                onChange={handleEdit}
                value={`${editData.kinder_id} ${editData.yearterm_id} ${editData.crt_id}`}
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
                      key={data.kinder_id}
                      value={`${data.kinder_id} ${data.yearterm_id} ${data.crt_id}`}
                    >
                      {kinderName} - {termYearName}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="edit_stu_id">
              <Form.Label>นักเรียน</Form.Label>
              <Form.Control
                as="select"
                className="input-line"
                name="stu_id"
                onChange={handleEdit}
                value={editData.stu_id}
              >
                <option value="">Choose Teacher</option>
                {showstu.map((stu) => (
                  <option key={stu.stu_id} value={stu.stu_id}>
                    {stu.stu_Fname} {stu.stu_Lname}
                  </option>
                ))}
              </Form.Control>
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
          <Button variant="btn btn-outline-secondary" onClick={onEdit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MgtClass;
