import React, { useState, useEffect } from 'react';
import './Modal.css'
import Timer from '../timer/Timer';

const Modal = ({ showModal, closeModal, content }) => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showModal]);


  if (seconds <= 0) {
    closeModal();
  }

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className='modal-content' >
            <div className="modal-body">
              <Timer showModal={showModal} seconds={seconds} setSeconds={setSeconds} />
              {content}
            <button className="close-button" onClick={closeModal}>
              Skip
            </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
