import React, { useState,useEffect } from 'react';
import "./style.css";

const getLocalData=()=>{
    const lists=localStorage.getItem("myTodoList");
    if(lists){
        return JSON.parse(lists)
    }
    else{
        return [];
    }
};

const Todo=()=> {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalData());
    const [editItem,setEditItem]=useState('');
    const [toggleButton,setToggleButton]=useState(false);

    // Add items functionS
    const addItems = () => {
        if (!inputData) {
            alert("Please fill the text");
        }
        else if(inputData && toggleButton){
            setItems(
                items.map((curElement)=>
                {
                    if(curElement.id===editItem){
                        return {...curElement,name:inputData};
                    }
                    return curElement;
                })
            )
            setInputData("");
            setEditItem();
            setToggleButton(false);
        }

        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            };
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    };
    // edit items
    const editItems=(index)=>{
    const item_todo_edit=items.find((curElement)=>{
        return curElement.id === index;
    })
    setInputData(item_todo_edit.name);
    setEditItem(index);
    setToggleButton(true);
    }


    // how to delete items section
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElement) => {
      return curElement.id !== index;
    });
    setItems(updatedItems);
  };

    // Remove all items
    const removeAll = () => {
        setItems([]);
    };

    useEffect(() => {
        localStorage.setItem("myTodoList", JSON.stringify(items));
    }, [items]);

    return (
        <>
            <div className="main-div">
                <div className='child-div'>
                    <figure>
                        <img src="./images/todo.svg" alt="logo" />
                        <figcaption>Add your list 😁</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text"
                            placeholder='✍️ Add Items'
                            className='form-control'
                            value={inputData}
                            onChange={(event) => setInputData(event.target.value)} />
                            {
                                toggleButton ? <i className="far fa-edit add-btn" onClick={addItems}></i> :
                                <i className="fa fa-plus add-btn" onClick={addItems}></i>
                            }
                        
                    </div>

                    {/* Show the Items */}
                    <div className='showItems'>
                        {items.map((curElement) => {
                            return (
                                <div className="eachItem" key={curElement.id}>
                                    <h3>{curElement.name}</h3>
                                    <div className='todo-btn'>
                                        <i className='far fa-edit add-btn' 
                                        onClick={()=> editItems(curElement.id)}>
                                            
                                        </i>
                                        <i className='far fa-trash-alt add-btn'
                                            onClick={() => deleteItem(curElement.id)}>
                                            </i>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text='Remove All'
                            onClick={removeAll}>
                            <span>CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

};

export default Todo;

