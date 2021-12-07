import React from 'react';
import './modal.scss';

const Modal = ({content, title, defaultMode, buttonText, buttonClass, buttonIcon}) => {

    const [isOpen, setIsOpen] = React.useState(defaultMode);

    const toggleModal = () => {
        if (isOpen) 
            setIsOpen(false);
        else
            setIsOpen(true);
    }

    return (
        <div>

            <button className={buttonClass} onClick={toggleModal}><i className={"fas fa-" + buttonIcon}></i> {buttonText}</button>
            
            <div className={isOpen ? "modal show-modal" : "modal"}>
                <div className="modal-content">
                    <span className="close-button" onClick={toggleModal}><i className="fas fa-times"></i></span>
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
