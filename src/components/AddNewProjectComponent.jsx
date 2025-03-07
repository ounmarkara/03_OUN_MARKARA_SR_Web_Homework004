import { Plus } from "lucide-react";
import React, { useState } from "react";

export default function AddNewProjectComponent({ handleSubmitTask }) {
  const [task, setTasks] = useState({});
  const [selectOption, setSelectOption] = useState(null);
  const [error, setError] = useState({});

  function validateForm() {
    let error = {};
    let isvalid = true;

    if (!task.title || task.title.trim().lenght < 2) {
      error.title = "tittle must be required";
      isvalid = false;
    }

    if (selectOption == null) {
      error.progress = "Progress is required!";
      isvalid = false;
    }

    if (!task.date) {
      error.date = "Due date is required!";
      isvalid = false;
    } else {
      const today = new Date().setHours(0, 0, 0, 0);
      const selectedDate = new Date(task.date).setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        error.date = "Due date can not be in the past";
        isvalid = false;
      }
    }
    setError(error);
    return isvalid;
  }

  function userInput(e) {
    const { id, value } = e.target;

    const keyMap = {
      projectName: "title",
      dueDate: "date",
      description: "description",
    };
    const key = keyMap[id] || id;
    setTasks({ ...task, [key]: value });
  }

  // postgress
  function userSelect(e) {
    const { value } = e.target;
    console.log("default value bos select", value);
    setSelectOption(value);
  }

  function userClick() {
    if (!validateForm()) return;
    console.log("After Return");
    const newTask = {
      ...task,
      progress: selectOption,
      id: Date.now(),
    };
    handleSubmitTask(newTask);
  }

  return (
    <div>
      <button
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        className=" text-white bg-custom-sky-blue hover:bg-custom-sky-blue-500 focus:ring-3 focus:outline-none focus:ring-custom-sky-blue-500  font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-custom-sky-blue-500 dark:hover:bg-custom-sky-blue-500  dark:focus:ring-custom-sky-blue-500  flex items-center gap-2"
        type="button"
      >
        <Plus size={22} /> <span className="text-base">New Project</span>
      </button>

      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-2xl shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Project
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="projectName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Project Name
                  </label>
                  <input
                    onChange={(e) => userInput(e)}
                    type="text"
                    id="projectName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Project Name"
                  />
                  <p className="text-red-500">{error.title}</p>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="dueDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Due Date
                  </label>
                  <input
                    onChange={(e) => userInput(e)}
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                  <p className="text-red-500">{error.date}</p>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="progress"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Progress
                  </label>
                  <select
                    value={selectOption}
                    onChange={(e) => userSelect(e)}
                    id="progress"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option>Select Progress</option>
                    <option value="100">100</option>
                    <option value="75">75</option>
                    <option value="50">50</option>
                    <option value="25">25</option>
                  </select>
                  <p className="text-red-500">{error.progress}</p>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Project Description
                  </label>
                  <textarea
                    onChange={(e) => userInput(e)}
                    id="description"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write product description here"
                  ></textarea>
                </div>
              </div>
              <div className="text-right">
                <button
                  onClick={userClick}
                  type="button"
                  className="text-white inline-flex items-center bg-custom-sky-blue hover:bg-custom-sky-blue-500 focus:ring-4 focus:outline-none focus:ring-custom-sky-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-custom-sky-blue-500 dark:hover:bg-custom-sky-blue-500 dark:focus:ring-custom-sky-blue-500"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
