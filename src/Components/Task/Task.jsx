import  styles from "./Task.module.css"
import ModalAdd from "../Modal/ModalAdd";
import React, {useEffect, useLayoutEffect, useState} from "react";
import customFetch from "../../store/actions/customFetch";
import ModalUpdate from "../Modal/ModalUpdate";
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import NotificationContainer from "react-notifications/lib/NotificationContainer";
export default function Task(props) {



    const boardList=["Todo","In Progress","In Review","Done"]
    const [data,setData]=useState([])//данные тикитов
    const [dataSheet,setDataSheet]=useState([])//список тем
    const [workSheet,setWorkSheet]=useState()//выбраная тема
    const [currentItem,setCurrentItem]=useState({})// выьранный элемент стикер

    const [loading,setLoading]=useState(false)//тригер загрузки
    const [delet,setDelet]=useState(false)




useEffect(() => {
    dataSheet.map(item=>{
        if (item.name===localStorage.getItem("sheet_name")){
            localStorage.setItem("sheet_id",item.id)
        }
    })

    customFetch(`http://localhost:3001/api/v1/tasks/sheet/${localStorage.getItem("sheet_id")}`, {
        method: 'GET'},true )
        .then( data => setData(data))
        .then(()=>
            customFetch(`http://localhost:3001/api/v1/sheets/company/${localStorage.getItem("company_id")}`, {
            method: 'GET'},true )
            .then( data => setDataSheet( data))
            .catch(error => console.log("Error receiving data:",error.message)))
        .catch(error => console.log("Error receiving data:",error.message));
}, [ workSheet]);

useLayoutEffect(() => {
    if( loading===true) {
        const patchData = async () => {
            const requestOptions  = {
                method: 'PATCH',
                body: JSON.stringify({
                    status: currentItem.status,
                })
            };
            customFetch(`http://localhost:3001/api/v1/tasks/status/${currentItem.id}`, requestOptions,true)
                .then(response =>{
                    customFetch(`http://localhost:3001/api/v1/tasks/sheet/${localStorage.getItem("sheet_id")}`,{
                        method: 'GET'},true )
                        .then(data => {
                            setData(data)
                            setLoading(false)
                        })
                        .catch(error => console.log("Error receiving data:", error.message));
                })
                .catch(error => console.log("patch data error:", error.message));
        }
        patchData();
    }
    if( delet===true) {
        const deletData = async () => {
            const requestOptions  = {
                method: 'DELETE',
            };
            customFetch(`http://localhost:3001/api/v1/tasks/${currentItem.id}`, requestOptions,true)
                .then(response =>{
                    customFetch(`http://localhost:3001/api/v1/tasks/sheet/${localStorage.getItem("sheet_id")}`,{
                        method: 'GET'},true )
                        .then(data => {
                            setData(data)
                            setDelet(false)
                        })
                        .catch(error => console.log("Error receiving data:", error.message));
                })
                .catch(error => console.log("delet data error:", error.message));
        }
        deletData();
    }
}, [loading,delet]);

function dragStartHandler(e,item,board) {
    setCurrentItem(item)
    e.dataTransfer.dropEffect = "move";
    e.target.classList.add(styles.selectedCard)
}

function dragEndHandler(e) {
    e.target.classList.remove(styles.selectedCard)
}

function dragOverHandler(e) {
    e.preventDefault()
    if (e.target.classList.contains(styles.workArea)) {
        e.target.classList.add(styles.allowedArea)
    }
    if(e.target.classList.contains(styles.FilterButton)){
        e.target.classList.add(styles.allowedButton);
    }
}

function dragLeaveHandler(e) {
    e.preventDefault()
    if (e.target.classList.contains(styles.workArea)) {
        e.target.classList.remove(styles.allowedArea)
    }
    if(e.target.classList.contains(styles.FilterButton)){
        e.target.classList.remove(styles.allowedButton);
    }
}

function dropHandler(e) {
    e.preventDefault()
    const futureItemStatus=e.currentTarget.getAttribute('id')
    let elem =  document.getElementById(futureItemStatus);
    elem.classList.remove(styles.allowedArea)
    elem.classList.remove(styles.allowedButton)
    if( elem.id==="delete"){
    setDelet(true)
    }
    else {
        setCurrentItem(prevState => ({
            ...prevState,
            status: futureItemStatus
        }))
        setLoading(true)
    }
}

return (
    <div id="task" className={styles.workSpace}>
        <div className={styles.ToolBar}>
            <div className={styles.Filter}><p className={styles.FilterText}> filter sheets </p>
                <select className={styles.FilterSelect} onChange={(e)=>{
                    localStorage.setItem("sheet_name",e.target.value)
                    setWorkSheet(e.target.value)

                }}
                        value={workSheet}>
                    {!Array.isArray(dataSheet) && dataSheet.length > 0?()=>{return}: dataSheet?.map(item=>{
                        return(
                            <option id={item.id} className={styles.FilterSelect} value={item.name}>{item.name}</option>
                        )
                    })}
                </select>
            </div>
            <div className={styles.Tool}>
                <ModalAdd  setData={setData} name="Task" />
                <button id="delete" className={styles.FilterButton}
                        onDrop={(e)=>dropHandler(e,null,data)}
                        onDragEnd={(e)=>dragEndHandler(e)}
                        onDragOver={(e)=>dragOverHandler(e)}
                        onDragLeave={(e)=>dragLeaveHandler(e)}>
                    Delete Task</button>
            </div>

        </div>
        <div className={styles.workSheet}>
        {boardList?.map(board=>

            <div id={board} className={styles.workArea}
                   onDrop={(e)=>dropHandler(e,null,data)}
                  onDragEnd={(e)=>dragEndHandler(e)}
                  onDragOver={(e)=>dragOverHandler(e)}
                  onDragLeave={(e)=>dragLeaveHandler(e)}>

            <p className={styles.status} >{board} </p>
                {data &&!Array.isArray(data)&& data.length > 0?()=>{return} :data?.map(card=> {
                    if (board.toUpperCase() === card.status.toUpperCase()) {
                        return(
                            <div className={styles.wrapper} draggable={true}
                             onDragStart={(e) => dragStartHandler(e, card, data)}>
                            <div className={styles.headerTask}>

                                <div className={styles.headerName}>{card.name}</div>
                                <ModalUpdate setData={ setData} card={card} name="Task" />
                            </div>
                                <div className={styles.description}>{card.description}</div>
                            <div className={styles.dataInfo}>
                                <div className={styles.dataUpdate}>Date Update: {card.updated_at.slice(0, 10)}</div>
                                <div className={styles.dataCreate}>Date Create: {card.created_at.slice(0, 10)}</div>
                            </div>
                                <div className={styles.dataInfo}>
                                    <div className={styles.dataCreate}>Estimated Date: {card.estimated_date.slice(0, 10)}</div>
                                </div>

                        </div>)
                    }
                })}
        </div>
        )}
            <NotificationContainer />
        </div>

 </div>
);
}

