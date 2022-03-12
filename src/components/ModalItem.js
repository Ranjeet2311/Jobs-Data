import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ModalItem(props) {
  const { jobdata } = props;

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {jobdata &&
          jobdata.map((info, i) => {
            return (
              <div key={i}>
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    <h1>Job Post</h1>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="d-flex  flex-wrap w-100">
                    <p className="ms-4 me-4 text-start">Title: {info.title}</p>
                    <p className="ms-4 me-4 text-start">
                      Opens At: {info.openAt}
                    </p>
                    <p className="ms-4 me-4 text-start">
                      Closes At: {info.closeAt}
                    </p>
                    <p className="ms-4 me-4 text-start">
                      # Interviews: {info.interviewTypes[1].order}{" "}
                    </p>
                  </div>
                  <p className="w-100">
                    <span>Description </span>
                    {info.description}
                  </p>
                  <p className="w-100">
                    <span>Notes </span>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo
                    odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                    risus, porta ac consectetur ac, vestibulum at eros.
                  </p>
                </Modal.Body>
              </div>
            );
          })}

        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalItem;
