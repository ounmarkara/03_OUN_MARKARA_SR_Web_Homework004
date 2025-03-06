import { EllipsisVertical } from "lucide-react";
import React from "react";

export default function CardComponent({ tasks }) {
  // Function to get color based on progress
  function getProgressColor(progress) {
    if (progress < 25) return "text-red-500";
    if (progress < 50) return "text-yellow-500";
    if (progress < 75) return "text-blue-500";
    return "text-green-500";
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Function to get background color for progress bar

  function getProgressBarColor(progress) {
    if (progress < 25) return "bg-red-500";
    if (progress < 50) return "bg-yellow-500";
    if (progress < 75) return "bg-blue-500";
    return "bg-green-500";
  }

  return (
    <>
      {tasks.map((task) => {
        const progressBarColor = getProgressBarColor(Number(task.progress));
        const progressTextColor = getProgressColor(Number(task.progress));
        const formattedDate = formatDate(task.date);

        return (
          <div
            key={task.id}
            className="w-full p-6 bg-white rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex justify-between mb-5">
              {/* date */}
              <p className={`${progressTextColor} font-medium`}>
                {formattedDate === "Invalid date" ? "No date" : formattedDate}
              </p>
              <EllipsisVertical size={20} color="#374957" />
            </div>

            <h5 className="capitalize mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {task.title}
            </h5>
            <p className="line-clamp-2 mb-3 font-normal text-justify text-gray-400 dark:text-gray-400">
              {task.description}
            </p>

            {/* progress bar */}
            <div className="w-full flex justify-between font-medium mb-1">
              <p>Progress</p>
              <p>{task.progress}%</p>
            </div>
            <div className="relative mb-5 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className={`h-2.5 rounded-full ${progressBarColor}`}
                style={{ width: `${task.progress}%` }}
              ></div>
            </div>

            {/* deadline */}
            <div className="flex justify-end">
              <p className="font-medium bg-light-gray py-1.5 px-4 rounded-lg max-w-28 text-center">
                1 day left
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
