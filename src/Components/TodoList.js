import React, { useEffect, useState } from "react";
import "./todo.css";
import TodoItems from "./TodoItems";

// FOR GETTING THE DATA FROM LOCAL STORAGE

let gettingItems = () => {
  const lists = localStorage.getItem("Akky's ToDo"); // getItem IS METHOD HERE
  if (lists) {
    return JSON.parse(lists); // here we convert the string "value" to "array" by "parse" method of JSON
  } else {
    return [];
  }
};

const TodoList = () => {
  let [inputItems, setInputItems] = useState(""); // THIS IS FOR GETTING INPUT VALUE
  let [items, setItems] = useState(gettingItems()); // THIS IS FOR STORING VALUES IN ARRAY
  let [toggleBtn, setToggleBtn] = useState(true); // THIS IS FOR TOGGLE THE ADD AND EDIT BUTTON
  let [editedItem, setEditedItem] = useState(null); // FOR KNOWING ON WHICH EDIT BUTTON WE CLICK AND UPDATE THE DATA

  // ADING BUTTON
  let addItem = () => {
    if (!inputItems) {
      alert("Please Input Some List!!");
    } else if (inputItems && !toggleBtn) {
      // IF SOME INPUT IN BOX AND TOGGLE IS FLASE TEHN UPDATE THE VALUE
      setItems(
        items.map((elem) => {
          if (elem.id === editedItem) {
            return { ...elem, name: inputItems };
          }
          return elem;
        })
      );
      setToggleBtn(true);
      setInputItems("");
      setEditedItem(null);
    } else {
      // ELSE ADD A ITEM IN NEW ARRAY
      const allInputdata = {
        id: new Date().getTime().toString(),
        name: inputItems,
      };
      setItems([...items, allInputdata]);
    }

    setInputItems("");
  };

  // FOR DELETING THE ITEMS
  let removeItem = (id) => {
    const updatedItem = items.filter((elem) => {
      return id !== elem.id;
    });

    setItems(updatedItem);
  };

  // FOR EDIT BUTTON WE CLICK ON IT AND GET THE ID AND ITS VALUE TO THE INPUT BOX FOR UPDATION
  let editItem = (id) => {
    let editedValue = items.find((elem) => {
      return elem.id === id;
    });

    setToggleBtn(false);
    setInputItems(editedValue.name); // GETING THE EDIT CLICKED BUTTON NAME VALUE TO THE INPUT BOX
    setEditedItem(id);
  };

  // FOR REMOVING ALL THE ITEMS IN ONE CLICK
  let remvAll = () => {
    setItems([]);
  };

  // FOR SET THE LOCAL STROGE BY useEffect()
  useEffect(() => {
    // here we pass "key","value" (items are in array so we convert it to strings coz "value" are in string)
    localStorage.setItem("Akky's ToDo", JSON.stringify(items)); // setItem IS METHOD HERE
  }, [items]);

  return (
    <>
      <div className="container">
        <div className="main-div">
          <center>
            <h1 className="txt">TODO LIST</h1>
          </center>
          <TodoItems
            inputItems={inputItems}
            setInputItems={setInputItems}
            toggleBtn={toggleBtn}
            items={items}
            addItem={addItem}
            removeItem={removeItem}
            editItem={editItem}
            remvAll={remvAll}
          />
        </div>
      </div>
    </>
  );
};

export default TodoList;
