import { Suspense, useEffect, useState } from 'react'
import { ImFileEmpty } from 'react-icons/im'
import { useTodos } from '../../context/todoContext'
import { TodoCard } from '../../components/todo/TodoCard'
import { Outlet } from 'react-router-dom'
import Loader from '../../components/ui/Loader'

function TodoPage() {
  const { todos, getUserTodos, setTodos, updateTodo } = useTodos();
  const [isDate, setIsDate] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState([]);

  const handleToggleDate = () => {
    setIsDate(!isDate);
  };

  const handleTogglePending = () => {
    if (isCompleted) setIsCompleted(!isCompleted);

    setIsPending(!isPending);
  };

  const handleToggleCompleted = () => {
    if (isPending) setIsPending(!isPending);

    setIsCompleted(!isCompleted);
  };

  useEffect(() => {
    getUserTodos();
    return () => setTodos([]);
  }, []);



  useEffect(() => {
    const filterTodos = () => {
      let filtered = todos;
      if (isDate) {
        filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
      }
      if (isPending) {
        filtered = filtered.filter((todo) => !todo.completed);
      }
      if (isCompleted) {
        filtered = filtered.filter((todo) => todo.completed);
      }
      setFilteredTodos(filtered);
    };

    filterTodos();
  }, [todos, isDate, isPending, isCompleted]);


  function handleToggleAllCompleted({ target }) {
    const isChecked = target.checked;
    const updatePromises = todos.map((todo) =>
      updateTodo(todo._id, {
        ...todo,
        completed: isChecked,
      })
    );

    Promise.all(updatePromises)
      .then(() => {
        return getUserTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <section className="bg-zinc-800  pt-3 pb-2 md:p-5 rounded-lg mb-4">
        <div className='flex justify-evenly px-2 items-center align-middle md:gap-6'>
          <label htmlFor="toggleRecent" className="md:gap-0 gap-2 flex md:flex-row flex-col items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" id="toggleRecent" className="sr-only"
                checked={isDate}
                onChange={handleToggleDate}
              />
              <div className="block bg-[#202020] w-12 h-6 rounded-full"></div>
              <div className="dot absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full transition"></div>
            </div>
            <div className="ml-3 text-gray-700 font-medium ">
              Date
            </div>
          </label >
          <label htmlFor="togglePending" className="md:gap-0 gap-2 flex md:flex-row flex-col items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" id="togglePending" className="sr-only"
                checked={isPending}
                onChange={handleTogglePending}
              />
              <div className="block bg-[#202020] w-12 h-6 rounded-full"></div>
              <div className="dot absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full transition"></div>
            </div>
            <div className="ml-3 text-gray-700 font-medium ">
              Pending
            </div>
          </label>
          <label htmlFor="toggleCompleted" className="md:gap-0 gap-2 flex md:flex-row flex-col items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" id="toggleCompleted" className="sr-only"
                checked={isCompleted}
                onChange={handleToggleCompleted}
              />
              <div className="block bg-[#202020] w-12 h-6 rounded-full"></div>
              <div className="dot absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full transition"></div>
            </div>
            <div className="ml-3 text-gray-700 font-medium ">
              Completed
            </div>
          </label>
          <label htmlFor="toggleAll"
            className="flex md:flex-row flex-col md:gap-0 gap-2 items-center cursor-pointer border-l-2 border-gray-700 pl-5 ml-5">
            <div className="relative">
              <input type="checkbox" id="toggleAll" className="sr-only"
                checked={todos.length > 0 && todos.map((todo) => todo.completed).every((completed) => completed)}
                onChange={handleToggleAllCompleted}
              />
              <div className="block bg-[#202020] w-12 h-6 rounded-full"></div>
              <div className="dot absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full transition"></div>
            </div>
            <div className="md:ml-3 text-gray-700 font-medium ">
              All
            </div>
          </label>
        </div >
      </section >
      <Suspense fallback={<Loader />} >
        <Outlet />
      </Suspense >
      <div className="pb-6" >
        {filteredTodos.length > 0
          ? <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-4">
            {filteredTodos.map((todo) => (
              <TodoCard todo={todo} key={todo._id} />
            ))}
          </div>
          : <div className="flex justify-center items-center">
            <div>
              <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
              <h1 className="font-bold text-xl">
                No tasks yet, please add a new task
              </h1>
            </div>
          </div>}
      </div >


    </>
  )
}

export default TodoPage
