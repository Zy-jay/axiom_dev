import React, { useState } from 'react';
import privacyPolicyPDF from '../../assets/docs/Privacy_Policy.pdf'; // 
import OfferPDF from '../../assets/docs/Offer.pdf'; 
import RiskWarningPDF from '../../assets/docs/Risk_Warning.pdf'; // 
import TermsOfUsePDF from '../../assets/docs/Terms_of_Use.pdf'; // 


function ConfirmModal({ isOpen, onClose, onConfirm }) {

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleConfirm = () => {
        if (isChecked) {
            onConfirm();
            onClose();
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <h2>Подтверждение действия</h2>
                <p>Я соглашаюсь с <br />  <a href={TermsOfUsePDF} target="_blank" rel="noopener noreferrer" style={{cursor:"pointer"}} > <span style={{color:"black", fontWeight:"bold"}}>Условиями использования</span> </a>
                 <br></br> <a href={privacyPolicyPDF} target="_blank" rel="noopener noreferrer" style={{cursor:"pointer"}} > <span style={{color:"black", fontWeight:"bold"}}>Политикой конфиденциальности</span></a>
                  <br></br> <a href={RiskWarningPDF} target="_blank" rel="noopener noreferrer" style={{cursor:"pointer"}} ><span style={{color:"black", fontWeight:"bold"}}>Предупреждением о рисках </span></a>
                  <br></br> <a href={OfferPDF} target="_blank" rel="noopener noreferrer" style={{cursor:"pointer"}} ><span style={{color:"black", fontWeight:"bold"}}>Офертой</span></a>
                  
                  </p>
                <div style={modalStyles.checkboxContainer}>
                    <input
                        type="checkbox"
                        id="terms"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="terms">&nbsp;Соглашаюсь с условиями</label>
                </div>
                <button
                    onClick={handleConfirm}
                    disabled={!isChecked}
                    style={{
                        ...modalStyles.button,
                        backgroundColor: isChecked ? '#4CAF50' : '#ccc',
                        cursor: isChecked ? 'pointer' : 'not-allowed'
                    }}
                >
                    Подтвердить
                </button>
                <button onClick={onClose} style={modalStyles.closeButton}>Отмена</button>
            </div>
        </div>
    );
}

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        width: '400px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        marginBottom: "20%"
    },
    checkboxContainer: {
        marginTop: '20px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center'
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        marginTop: '10px',
    },
    closeButton: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#f44336',
        color: 'white',
        marginTop: '10px',
        marginLeft: '10px',
        cursor: 'pointer'
    }
};

export default ConfirmModal;