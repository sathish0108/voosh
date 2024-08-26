import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import TaskForm from "./TaskForm";
import instance from "../service";
import { Header } from "./Header";

let initialData = {
  columns: {
    "column-1": { id: "column-1", title: "To Do", taskIds: ["task-1", "task-2"] },
    "column-2": { id: "column-2", title: "In Progress", taskIds: [] },
    "column-3": { id: "column-3", title: "Done", taskIds: [] },
  },
  tasks: {
    "task-1": { id: "task-1", content: "Task 1" },
    "task-2": { id: "task-2", content: "Task 2" },
    "task-3": { id: "task-3", content: "Task 3" },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};
const Home = () => {
  const [data, setData] = useState(initialData);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [edit, setEdit] = useState(false);
  const [reload, setReload] = useState(false);
  console.log(edit);

  // Edit State Management
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const headers = {
    "Content-Type": "application/json",
    auth: localStorage.getItem("token"),
  };
  useEffect(() => {
    FetchData();
  }, [edit, reload]);

  const handleEdit = () => {
    // event.preventDefault();
    const data = {
      title: title,
      description: description,
    };

    instance
      .put(`/api/task/${editingTaskId}`, data, { headers })
      .then((res) => {
        console.log(res);
        setEdit(false);
      })
      .catch((error) => {
        console.log(err);

        // if (error.response) {
        //   if (error.response.data == "Unable to login") {
        //   }
        // }
      });
  };

  const FetchData = () => {
    instance
      .get("/api/task", { headers })
      .then((res) => {
        let resData = res.data;
        let obj = {};
        let array = [];
        resData.map((val, i) => {
          obj[`task-${i + 1}`] = val;
          array.push(`task-${i + 1}`);
          val["id"] = `task-${i + 1}`;
        });
        data.tasks = obj;
        data.columns["column-1"].taskIds = array;
        setData({
          ...data,
          columns: {
            ...data.columns,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   // Filter tasks based on search query
  //   const filteredTasks = React.useMemo(() => {
  //     if (!searchQuery) return data.tasks;
  //     const lowercasedQuery = searchQuery.toLowerCase();
  //     return Object.values(data.tasks).filter((task) => task.title.toLowerCase().includes(lowercasedQuery));
  //   }, [searchQuery, data.tasks]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      });
      //   return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };

  const handleAddTask = (taskContent, columnId) => {
    const newTaskId = `task-${Date.now()}`;
    const newTask = { id: newTaskId, content: taskContent };

    setData({
      ...data,
      tasks: {
        ...data.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...data.columns,
        [columnId]: {
          ...data.columns[columnId],
          taskIds: [...data.columns[columnId].taskIds, newTaskId],
        },
      },
    });
  };

  const handleEditTask = (taskId, newContent) => {
    setData({
      ...data,
      tasks: {
        ...data.tasks,
        [taskId]: {
          ...data.tasks[taskId],
          content: newContent,
        },
      },
    });
    setEditingTaskId(null);
  };

  const handleDeleteTask = (taskId) => {
    console.log(taskId);
    instance
      .delete(`/api/task/${taskId}`, { headers })
      .then((res) => {
        console.log(res);
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Header />

      {edit && (
        <form className="editForm">
          <div className="editbutton">
            <input type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)} />
            <button onClick={() => handleEdit()}>Save</button>
          </div>
        </form>
      )}
      <div className="search">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>

      {data && (
        <div className="app">
          <DragDropContext onDragEnd={onDragEnd}>
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

              return (
                <>
                  <Droppable key={column.id} droppableId={column.id}>
                    {(provided) => (
                      <div className="container" ref={provided.innerRef} {...provided.droppableProps}>
                        <Column
                          column={column}
                          tasks={tasks}
                          searchQuery={searchQuery}
                          data={data}
                          setEdit={setEdit}
                          onEdit={setEditingTaskId}
                          onDelete={handleDeleteTask}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </>
              );
            })}
          </DragDropContext>

          <TaskForm
            setReload={setReload}
            reload={reload}
            onAdd={handleAddTask}
            onEdit={handleEditTask}
            editingTaskId={editingTaskId}
          />
        </div>
      )}
    </>
  );
};

export default Home;
