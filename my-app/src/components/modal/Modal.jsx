import React, { useState } from 'react';
import './Modal.css'
import Timer from '../timer/Timer';

const Modal = ({ showModal, closeModal, content }) => {
  
  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-body">
              <Timer/>
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
