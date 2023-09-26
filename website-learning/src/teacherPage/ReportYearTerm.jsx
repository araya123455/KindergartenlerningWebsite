import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import {
    showclass,
    showstudent,
    showclasstime,
    showkinroom,
    getDataAll,
   
  } from "../slice/DataSlice";

function ReportYearTerm() {
    const dispatch = useDispatch();
    const [showstu, setshowstu] = useState([]);
    const [showkinder, setShowKinder] = useState([]);
    const [showyear, setShowYear] = useState([]);
    const [showAdd, setShowAdd] = useState(false);

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

      const handleFilter = () => {
        if (!selectedFilter) {
          loadData();
          return;
        }
        const [selectedKinderId, selectedYeartermId] = selectedFilter.split(" ");
    
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
      const getAvailableStudents = () => {
        const addedStudentIds = Todisplay.map((data) => data.stu_id);
        return showstu.filter((stu) => !addedStudentIds.includes(stu.stu_id));
      };
    
      useEffect(() => {
        loadData();
        loadstudent();
        loadKinder();
        loadYearTerm();
      }, []);

      useEffect(() => {
        setTodisplay(filteredData.length > 0 ? filteredData : Todisplay);
        // console.log(filteredData);
      }, [filteredData]);

  return (
    <div>Select Kinder/ YearTerm
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
    </div>
    
  )
}

export default ReportYearTerm