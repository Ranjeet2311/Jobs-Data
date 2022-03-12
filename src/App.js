import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ModalItem from "./components/ModalItem";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
function App() {
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  function fetchData() {
    axios("https://dev.api.recruitment.indigo.si/JobPost").then((response) => {
      // console.log(response.data);
      console.log("Data Request made");
      setData(response.data);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const Columns = [
    {
      dataField: "title",
      text: "Job Post",
      filter: textFilter(),
      headerClasses: "title-column",
    },
    {
      dataField: "openAt",
      text: "Opens At",
      sort: true,
      headerClasses: "openAt-column-header",
      classes: "openAt-column",
    },
    {
      dataField: "closeAt",
      text: "Closes At",
      headerClasses: "closeAt-column-header",
      classes: "closeAt-column",
    },
    {
      dataField: "interviewTypes[1].order",
      text: "# Interviews",
    },
  ];

  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];

  function modalDalaFilter(title) {
    if (/\d/.test(title)) {
      return setModalShow(false);
    } else if (title.length === 0) {
      return setModalShow(false);
    } else {
      setModalShow(true);
      setModalData(() => {
        return data.filter((jData, i) => {
          return jData.title === title;
        });
      });
    }
  }

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      const title = e.target.innerHTML;
      // console.log(title.length);
      // console.log(typeof title);
      modalDalaFilter(title);
    },
  };

  return (
    <div className="App, p-4 ">
      <Button onClick={() => fetchData()} variant="outline-primary">
        Refresh
      </Button>
      <BootstrapTable
        bootstrap4
        pagination={paginationFactory()}
        keyField="id"
        data={data}
        columns={Columns}
        filter={filterFactory()}
        defaultSorted={defaultSorted}
        rowEvents={rowEvents}
        headerClasses="header"
        striped
        hover
        condensed
      />
      <ModalItem
        jobdata={modalData}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default App;
