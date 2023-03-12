import React from "react";

const TodoItems = ({
  inputItems,
  setInputItems,
  toggleBtn,
  items,
  addItem,
  removeItem,
  editItem,
  remvAll,
}) => {
  return (
    <>
      <div className="inner-div">
        <figure>
          <img src="./images/todo.png" height="200px"></img>
          <figcaption>Add Your List Here ☑️</figcaption>
        </figure>

        <div className="add-items">
          <input
            type="text"
            placeholder="Add Your Item Here..."
            value={inputItems}
            onChange={(e) => setInputItems(e.target.value)}
          ></input>

          {toggleBtn ? (
            <i className="fa fa-plus add-btn" onClick={addItem}></i> // TOGGLING BY TERNARY OPERATOR
          ) : (
            <i className="far fa-edit add-btn" onClick={addItem}></i>
          )}
        </div>

        <div className="data">
          {items.map((currEle) => {
            return (
              <div className="each-item" key={currEle.id}>
                <h3>{currEle.name}</h3>

                <div className="inner-btns">
                  <i
                    className="far fa-edit"
                    onClick={() => editItem(currEle.id)}
                  ></i>
                  &nbsp;&nbsp;&nbsp;
                  <i
                    className="far fa-trash-alt"
                    onClick={() => removeItem(currEle.id)}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>

        <div className="remv-btn">
          <button onClick={remvAll}>Remove All</button>
        </div>
      </div>
    </>
  );
};

export default TodoItems;
