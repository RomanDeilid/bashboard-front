import React, {useEffect, useLayoutEffect, useState} from 'react';
import Modal from 'react-modal';
import styles  from "./ModalAdd.module.css"
import customFetch from "../../store/actions/customFetch";
import iconOpen from "../public/icons8-menu.svg";

export default  function ModalUpdate(Promise) {

    useEffect(() => {
    Modal.setAppElement('#root'); // Укажите ваш корневой элемент
}, []);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(Promise.card);
    const [update,setUpdate]=useState(false)
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {

        setCurrentItem(Promise.card);
        setModalIsOpen(false);

    };




    useLayoutEffect(() => {
        if (update === true) {
            const updateData = async () => {
                if (Promise.name === "Sheet") {
                    const requestOptions = {
                        method: 'PUT',
                        body: JSON.stringify({
                            status: currentItem.status,
                            name: currentItem.name,
                            description: currentItem.description,
                        })
                    };
                    customFetch(`http://localhost:3001/api/v1/sheets/${currentItem.id}`, requestOptions, true)
                        .then(() => {
                            customFetch(`http://localhost:3001/api/v1/sheets/company/${localStorage.getItem("company_id")}`, {method: 'GET',}, true)
                                .then(data => {
                                    Promise.setData(data)
                                    setCurrentItem(currentItem)
                                    closeModal()

                                })
                                .catch(error => console.log("Error receiving data:", error.message));
                        })
                        .catch(error => console.log("PUT error data:", error.message));
                }
                if (Promise.name == "Task") {
                    const requestOptions = {
                        method: 'PUT',
                        body: JSON.stringify({
                            status: currentItem.status,
                            name: currentItem.name,
                            description: currentItem.description,
                            estimated_date: currentItem.estimated_date
                        })
                    };
                    customFetch(`http://localhost:3001/api/v1/tasks/${currentItem.id}`, requestOptions, true)
                        .then(() => {
                            customFetch(`http://localhost:3001/api/v1/tasks/sheet/${localStorage.getItem("sheet_id")}`, {method: 'GET',}, true)
                                .then(data => {
                                    Promise.setData(data)
                                    setCurrentItem(currentItem)
                                    closeModal()

                                })
                                .catch(error => console.log("Error receiving data:", error.message));
                        })
                        .catch(error => console.log("PUT error data:", error.message));
                }
            }
        updateData();
        setUpdate(false)
    }
        },[update]);



    return (
        <div>
            <img className={styles.openUpdateButten}  src={iconOpen} onClick={openModal}></img>
            <Modal className={styles.modalTask} isOpen={modalIsOpen} onRequestClose={closeModal}>
                <div className={styles.modalBody}>
                    <h3 className={styles.modalText}> {Promise.name} name </h3>
                    <input className={styles.modalInput} maxLength={10} onChange={(e)=>{
                        setCurrentItem(prevState => ({
                            ...prevState,
                            name: e.target.value
                        }))
                    }}
                           type="text"  value={currentItem.name}/>
                    <h3 className={styles.modalText}> Description</h3>
                    <textarea
                        className={styles.modalDescripsion}
                        value={currentItem.description}
                        onChange={(e)=>{
                            setCurrentItem(prevState => ({
                                ...prevState,
                                description: e.target.value
                            }))
                        }}
                        rows={5}
                    />
                    {Promise.name==="Task"?
                        <div className={styles.modalDate} >
                            <h3 className={styles.modalText}> Estimated_date</h3>
                            <input className={styles.modalInputDate}    onChange={(e)=>{
                                setCurrentItem(prevState => ({
                                    ...prevState,
                                    estimated_date: e.target.value
                                }))
                            }}
                                   type="date"  value={currentItem.estimated_date}/>
                        </div>:<div></div>}
                    <h3 className={styles.modalText}> Status </h3>
                    <select className={styles.modalStatus} onChange={(e)=>{
                        setCurrentItem(prevState => ({
                            ...prevState,
                            status: e.target.value
                        }))}}
                            value={currentItem.status}>
                        <option className={styles.modalStatus} value="Todo">Todo</option>
                        <option  className={styles.modalStatus}value="Done">Done</option>

                        <option className={styles.modalStatus} value="In Review">In Review</option>
                        <option  className={styles.modalStatus} value="In Progress">In Progress</option>
                    </select>
                    <div className={styles.modalButtons}>
                        <button className={styles.modalButton} onClick={()=>{
                            setUpdate(true);
                            }
                        }>Save</button>
                        <button
                            className={styles.modalButton}
                            onClick={()=>{

                                closeModal()

                            }
                            }>Close
                        </button>
                    </div>
                </div>
            </Modal>
        </div>

    );
};