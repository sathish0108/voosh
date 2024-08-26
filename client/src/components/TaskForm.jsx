// src/components/TaskForm.jsx
import React, { useState, useEffect } from "react";
import instance from "../service";

function TaskForm({ setReload, reload, onAdd, onEdit, editingTaskId }) {
  const [content, setContent] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    if (editingTaskId) {
      const currentTask = editingTaskId && JSON.parse(localStorage.getItem(editingTaskId));
      setContent(currentTask ? currentTask.content : "");
    } else {
      setContent("");
    }
  }, [editingTaskId]);

  const handleSubmit = (event) => {
    // event.preventDefault();
    // if (editingTaskId) {
    //   onEdit(editingTaskId, content);
    // } else {
    //   const columnId = "column-1"; // Change this based on where you want to add the task
    //   onAdd(content, columnId);
    // }
    // setContent("");

    const headers = {
      "Content-Type": "application/json",
      auth: localStorage.getItem("token"),
    };

    const data = {
      title: content,
      description: description,
    };
    instance
      .post("/api/task", data, { headers })
      .then((res) => {
        console.log(res);
        setReload(!reload);
      })
      .catch((err) => {});
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter task content"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter task description"
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
