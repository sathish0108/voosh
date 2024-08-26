// src/components/Column.jsx
import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

function Column({ searchQuery, column, tasks, data, onEdit, onDelete, setEdit }) {
  console.log(searchQuery, "");

  useEffect(() => {}, [data]);

  return (
    <>
      <div style={{ margin: "8px", borderRadius: "4px", width: "200px" }}>
        <h3 style={{ padding: "8px" }}>{column.title}</h3>
        {data && (
          <Droppable droppableId={column.id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} style={{ padding: "8px", minHeight: "100px" }}>
                {tasks
                  .filter((value) => (searchQuery ? value?.title?.includes(searchQuery) : value))
                  .map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          //   onPointerOver={() => console.log(task, "col")}
                          style={{
                            userSelect: "none",
                            padding: "16px",
                            width: "60%",
                            margin: "0 0 8px 0",
                            minHeight: "50px",
                            backgroundColor: "rgb(255 218 247)",
                            borderRadius: "10px",
                            color: "#333",
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div className="avatar"></div>
                          <div className="title">{task.title}</div>
                          <div className="desc">{task.description}</div>
                          <div className="date">{task.createdAt}</div>
                          <button
                            onClick={() => {
                              onEdit(task._id);
                              setEdit(true);
                            }}
                          >
                            Edit
                          </button>
                          <button onClick={() => onDelete(task._id)}>Delete</button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </div>
    </>
  );
}

export default Column;
