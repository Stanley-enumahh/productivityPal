import { useEffect, useState } from "react";
import { LuDot } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

export function Todos() {
  const [todoTitle, setTodoTitle] = useState("Today's schedule");
  const [todoArray, setTodoArray] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  });

  const [task, setTask] = useState("yoya");
  const [currentTasks, setCurrentTasks] = useState([]);

  const Bgcolors = [
    "bg-gray-300",
    "bg-blue-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-green-200",
  ];

  useEffect(
    function () {
      localStorage.setItem("todos", JSON.stringify(todoArray));
    },
    [todoArray]
  );

  function getRandomBgColor() {
    return Bgcolors[Math.floor(Math.random() * Bgcolors.length)];
  }

  function getFormattedDate() {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  function handleAddTask() {
    if (!task) return;

    setCurrentTasks((currentTasks) => [...currentTasks, task]);
    setTask("");
  }

  function handleToggleTodo(i) {
    const updatedTodos = [...todoArray];
    updatedTodos[i].completed = !updatedTodos[i].completed;
    setTodoArray(updatedTodos);
  }

  function handleDeleteNote(id) {
    setTodoArray((todoArray) => todoArray.filter((todo) => todo.id !== id));
  }

  function handleAddTodoArray() {
    if (!todoTitle || currentTasks < 1) return;
    const newTodo = {
      todoTitle,
      item: currentTasks,
      date: getFormattedDate(),
      completed: false,
      id: crypto.randomUUID(),
      TodoBgcolor: getRandomBgColor(),
    };
    setTodoArray((todoArray) => [...todoArray, newTodo]);
    setCurrentTasks([]);
    setTodoTitle("");
  }

  return (
    <div className="flex flex-col w-full h-full gap-3">
      <h1 className="font-bold ">Todos</h1>
      <div className="flex flex-row w-full h-full justify-between">
        <div className="w-[70%] overflow-y-scroll flex-wrap flex flex-row gap-4 p-5 bg-white rounded shadow-lg h-[450px]">
          {todoArray.length > 0 ? (
            <ul className=" w-full gap-4 flex flex-row flex-wrap">
              {todoArray.map((todo, i) => (
                <li
                  key={todo.id}
                  className={`${
                    todo.completed && "border-2 border-green-400"
                  }  shadow-lg rounded-lg p-3 w-[150px] h-fit flex flex-col gap-3 ${
                    todo.TodoBgcolor
                  }`}
                >
                  <span className="w-full justify-end flex">
                    <MdDeleteOutline
                      onClick={() => handleDeleteNote(todo.id)}
                      className="text-red-500 cursor-pointer"
                    />
                  </span>
                  <h1 className="font-bold capitalize text-sm">
                    {todo.todoTitle}
                  </h1>
                  <ul className="flex flex-col gap-1 text-xs">
                    {todo.item.map((item, i) => (
                      <li key={i} className="flex flex-row gap-3">
                        <p>{i + 1 + ")"}</p>
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                  <span className="flex justify-between items-center mt-3 flex-row w-full">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(i)}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-800">{todo.date}</p>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex h-full w-full justify-center items-center">
              <p className="text-gray-600 font-bold">🙂 No todos</p>
            </div>
          )}
        </div>
        <div className="w-[25%] flex flex-col gap-5 items-end h-full ">
          <FormAddTodo
            // handleAddTodoTitle={handleAddTodoTitle}
            setTodoTitle={setTodoTitle}
            todoTitle={todoTitle}
            task={task}
            handleAddTask={handleAddTask}
            currentTasks={currentTasks}
            setTask={setTask}
            handleAddTodoArray={handleAddTodoArray}
          />
        </div>
      </div>
    </div>
  );
}

function FormAddTodo({
  handleAddTodoArray,
  setTodoTitle,
  task,
  todoTitle,
  handleAddTask,
  currentTasks,
  setTask,
}) {
  return (
    <div className="flex gap-5 relative flex-col items-center py-5 shadow-lg w-full h-[350px] bg-white rounded">
      <input
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        type="text"
        className="border outline-none border-gray-400 w-[230px] rounded text-xs py-2 px-2"
        placeholder="todo title"
      />
      <span className="flex flex-row justify-between w-[230px]">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
          className="border outline-none border-gray-400 w-[160px] rounded text-xs py-2 px-2"
          placeholder="todo"
        />

        <button
          onClick={handleAddTask}
          className="text-white cursor-pointer bg-blue-600 rounded px-3 text-xs"
        >
          Add
        </button>
      </span>
      <ul className="flex flex-col gap-2 h-[160px] w-[230px] overflow-y-auto">
        {currentTasks.map((task, i) => (
          <li key={i} className="flex flex-row gap-2 items-center">
            <LuDot />
            <p className="capitalize text-sm">{task}</p>
          </li>
        ))}
      </ul>
      {currentTasks < 1 ? (
        ""
      ) : (
        <button
          className="text-white bottom-3 absolute cursor-pointer bg-blue-600 rounded-lg w-[90%] text-sm py-2"
          onClick={handleAddTodoArray}
        >
          + save todo
        </button>
      )}
    </div>
  );
}
