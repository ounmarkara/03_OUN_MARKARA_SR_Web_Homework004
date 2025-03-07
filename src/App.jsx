import { useState } from "react";
import "./App.css";
import AddNewProjectComponent from "./components/AddNewProjectComponent";
import AssignmentsComponent from "./components/AssignmentsComponent";
import CardComponent from "./components/CardComponent";
import DashboardComponent from "./components/DashboardComponent";
import LearningMaterialsComponent from "./components/LearningMaterialsComponent";
import SidebarComponent from "./components/SidebarComponent";
import TopNavbarComponent from "./components/TopNavbarComponent";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  function handleSubmitTask(value) {
    const newTask = {
      ...value,
      id: tasks.length + 1,
      date: value.date || new Date().toISOString().split("T")[0],
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    filterTasks(updatedTasks, "");
  }

  function handleSearch(query) {
    filterTasks(tasks, query);
  }

  function filterTasks(taskList, query) {
    if (!query) {
      setFilteredTasks(taskList);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = taskList.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerQuery) ||
        task.description.toLowerCase().includes(lowerQuery)
    );
    setFilteredTasks(filtered);
  }

  return (
    <main className="overflow-hidden h-screen bg-neutral-100">
      <section className="w-full flex gap-5">
        <SidebarComponent />
        <div className="flex flex-col gap-5 w-full mt-1">
          <TopNavbarComponent onSearch={handleSearch} />
          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-y-5 flex-1">
              <DashboardComponent />
              <div className="flex flex-row justify-between">
                <AssignmentsComponent />
                <AddNewProjectComponent handleSubmitTask={handleSubmitTask} />
              </div>
              <div className="grid grid-cols-3 gap-4 overflow-auto h-100">
                <CardComponent tasks={filteredTasks} />
              </div>
            </div>
            <div className="w-[23%]">
              <LearningMaterialsComponent />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
