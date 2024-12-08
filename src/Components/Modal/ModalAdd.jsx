import React, {useEffect, useLayoutEffect, useState} from 'react';
import Modal from 'react-modal';
import styles  from "./ModalAdd.module.css"
import customFetch from "../../store/actions/customFetch";
import Sheet from "../Sheet/Sheet";
import {NotificationManager} from "react-notifications";
import 'react-notifications/lib/notifications.css';

export default  function ModalAdd(Promise) {
    useEffect(() => {
        Modal.setAppElement('#root'); // Укажите ваш корневой элемент
    }, []);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };
    const [data, setData] = useState({});
    const [loading,setLoading]=useState(false)

    useLayoutEffect(() => {
        if (loading === true) {
            const fetchData = async () => {
                if( Promise.name==="Sheet") {
                    const requestOptions = {
                        method: 'POST',
                        body: JSON.stringify({
                            status: data.status,
                            name: data.name,
                            description: data.description,
                            company: localStorage.getItem("company_id")
                        })
                    };
                    customFetch(`http://localhost:3001/api/v1/sheets`, requestOptions, true)
                        .then(()=> {

                            customFetch(`http://localhost:3001/api/v1/sheets/company/${localStorage.getItem("company_id")}`, {method: 'GET',}, true)
                                .then(data => {
                                    setData({})
                                    Promise.setData(data)
                                })
                                .catch(error => console.log("Error receiving data:", error));
                        })
                        .catch(error => {
                            NotificationManager.warning(error, "Невозможно сохранить данные", 3000, true);
                            console.log("POST data sheets error", error)
                        });
                }
                if(Promise.name=="Task"){
                    console.log(localStorage.getItem("sheet_id"))
                    const requestOptions = {
                        method: 'POST',
                        body: JSON.stringify({
                            status: data.status,
                            name: data.name,
                            description: data.description,
                            sheet: localStorage.getItem("sheet_id"),
                            estimated_date:data.estimated_date
                        })
                    };
                    customFetch(`http://localhost:3001/api/v1/tasks`, requestOptions, true)
                        .then(() => {

                            customFetch(`http://localhost:3001/api/v1/tasks/sheet/${localStorage.getItem("sheet_id")}`, {method: 'GET',}, true)
                                .then(data => {
                                    setData({})
                                    Promise.setData(data)
                                })
                                .catch(error => console.log("Error receiving data:", error));
                        })
                        .catch(error => {
                            NotificationManager.warning(error.message, "Невозможно сохранить данные");
                            console.log(error.message)
                            console.log("POST data sheets error", error)
                        });
                }
            }
            fetchData();
            setLoading(false)
        }
    },[loading]);



    return (
        <div>
            <button className={styles.openButten} onClick={openModal}>Add {Promise.name}</button>
            <Modal className={styles.modalTask} isOpen={modalIsOpen} onRequestClose={closeModal}>
                <div className={styles.modalBody}>
                    <h3 className={styles.modalText}> {Promise.name} name </h3>
                    <input className={styles.modalInput} maxLength={10}  onChange={(e)=>{
                        setData(prevState => ({
                            ...prevState,
                            name: e.target.value
                        }))
                    }}
                           type="text"  value={data.name}/>
                    <h3 className={styles.modalText}> Description</h3>
                    <textarea
                        className={styles.modalDescripsion}
                        value={data.description}
                        onChange={(e)=>{
                            setData(prevState => ({
                                ...prevState,
                                description: e.target.value
                            }))
                        }}
                        rows={5}
                    />
                    {Promise.name==="Task"?
                        <div className={styles.modalDate}>
                    <h3 className={styles.modalText}> Estimated_date</h3>
                    <input className={styles.modalInputDate}   onChange={(e)=>{
                        setData(prevState => ({
                            ...prevState,
                            estimated_date: e.target.value
                        }))
                    }}
                           type="date"  value={data.estimated_date}/>
                        </div>:<div></div>}
                    <h3 className={styles.modalText}> Status </h3>
                    <select className={styles.modalStatus} onChange={(e)=>{
                        setData(prevState => ({
                            ...prevState,
                            status: e.target.value
                        }))}}
                            value={data.status}>
                        <option className={styles.modalStatus} value="Todo">Todo</option>
                        <option  className={styles.modalStatus}value="Done">Done</option>

                        <option className={styles.modalStatus} value="In Review">In Review</option>
                        <option  className={styles.modalStatus} value="In Progress">In Progress</option>
                    </select>
                    <div className={styles.modalButtons}>
                    <button className={styles.modalButton} onClick={()=>{
                        setLoading(true);
                        // setData({})
                        closeModal()}
                    }>Add</button>
                    <button
                        className={styles.modalButton}
                        onClick={()=>{
                            setData({})
                            closeModal()}
                        }>Close
                    </button>
                    </div>
                </div>
            </Modal>
        </div>

    );
};
