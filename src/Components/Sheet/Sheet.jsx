import  styles from "./Sheet.module.css"
import ModalAdd from "../Modal/ModalAdd";
import React, {useEffect, useLayoutEffect, useState} from "react";
import customFetch from "../../store/actions/customFetch";
import ModalUpdate from "../Modal/ModalUpdate";


export default function Sheet(props) {



    const boardList=["Todo","In Progress","In Review","Done"]
    const [data,setData]=useState([])//данные тикитов по темам
    const [currentItem,setCurrentItem]=useState({})// выьранный элемент стикер



    const [dataCompany,setDataCompany]=useState([])//список компаний
    const [workCompany,setWorkCompany]=useState()//выбраная компания


    const [loading,setLoading]=useState(false)//тригер загрузки
    const [delet,setDelet]=useState(false)




useEffect(() => {
    dataCompany.map(item=>{
        if (item.name===localStorage.getItem("company_name")){
            localStorage.setItem("company_id",item.id)
        }
    })
    customFetch(`http://localhost:3001/api/v1/sheets/company/${localStorage.getItem("company_id")}`, {
        method: 'GET'},true )
        .then( data => setData( data))
        .then(()=>
                customFetch(`http://localhost:3001/api/v1/companies/user/${localStorage.getItem("user_id")}`, {method: 'GET'},true )
                .then( data => setDataCompany( data))
                .catch(error => console.log("Error receiving data:",error.message)))
        .catch(error => console.log("Error receiving data:",error.message));
}, [ workCompany]);


useLayoutEffect(() => {
    if( loading===true) {
        const patchData = async () => {
            const requestOptions  = {
                method: 'PATCH',
                body: JSON.stringify({
                    status: currentItem.status,
                })
            };
            customFetch(`http://localhost:3001/api/v1/sheets/status/${currentItem.id}`, requestOptions,true)
                .then(response =>{
                    customFetch(`http://localhost:3001/api/v1/sheets/company/${localStorage.getItem("company_id")}`,{
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
            customFetch(`http://localhost:3001/api/v1/sheets/${currentItem.id}`, requestOptions,true)
                .then(response =>{
                    customFetch(`http://localhost:3001/api/v1/sheets/company/${localStorage.getItem("company_id")}`,{
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
    <div id="sheet" className={styles.workSpace}>
        <div className={styles.ToolBar}>
            <div className={styles.Filter}><p className={styles.FilterText}> filter company </p>
                <select className={styles.FilterSelect} onChange={(e)=>{
                    localStorage.setItem("company_name",e.target.value)
                    setWorkCompany(e.target.value)
                }}
                        value={workCompany}>
                    {!Array.isArray(dataCompany) && dataCompany.length > 0?()=>{return}: dataCompany?.map(item=>{
                        return(
                            <option  className={styles.FilterSelect} value={item.name}>{item.name}</option>
                        )
                    })}
                </select>
            </div>
            <div className={styles.Tool}>
                <ModalAdd  setData={setData} name="Sheet"  />
                <button id="delete" className={styles.FilterButton}
                        onDrop={(e)=>dropHandler(e,null,data)}
                        onDragEnd={(e)=>dragEndHandler(e)}
                        onDragOver={(e)=>dragOverHandler(e)}
                        onDragLeave={(e)=>dragLeaveHandler(e)}>
                    Delete Sheets</button>
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
                                <ModalUpdate name="Sheet" setData={ setData} card={card}/>
                            </div>
                                <div className={styles.description}>{card.description}</div>
                            <div className={styles.dataInfo}>
                                <div className={styles.dataUpdate}>Date Update: {card.updated_at.slice(0, 10)}</div>
                                <div className={styles.dataCreate}>Date Create: {card.created_at.slice(0, 10)}</div>
                            </div>

                        </div>)
                    }
                })}
        </div>
        )}

        </div>
 </div>
);
}

