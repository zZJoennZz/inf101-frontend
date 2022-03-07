import React from 'react';
import './modal.scss';

const Modal = ({content, title, defaultMode, onClickToggle}) => {
    return (
        <div>
            <div className={defaultMode ? "modal show-modal" : "modal"}>
                <div className="modal-content">
                    <span className="close-button" onClick={onClickToggle}><i className="fas fa-times"></i></span>
                    <div className="modal-title">
                        {title}
                    </div>
                    <div className="modal-inner-content">
                        {content}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Modal;
