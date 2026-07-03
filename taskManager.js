const fs = require("fs");

const FILE = "./task.json";

// Read all tasks
function getTasks() {
    const data = fs.readFileSync(FILE, "utf8").trim();

    if (!data) {
        return [];
    }

    return JSON.parse(data);
}

// Save tasks
function saveTasks(tasks) {
    fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}

// Add task
function addTask(taskName) {
    const tasks = getTasks();

    tasks.push({
        id: tasks.length + 1,
        task: taskName,
        completed: false
    });

    saveTasks(tasks);

    console.log("Task added.");
}

// List tasks
function listTasks() {
    const tasks = getTasks();

    console.table(tasks);
}

// Complete task
function completeTask(id) {
    const tasks = getTasks();

    const task = tasks.find(t => t.id == id);

    if (!task) {
        console.log("Task not found");
        return;
    }

    task.completed = true;

    saveTasks(tasks);

    console.log("Task completed.");
}

// Remove task
function removeTask(id) {
    let tasks = getTasks();

    tasks = tasks.filter(t => t.id != id);

    saveTasks(tasks);

    console.log("Task removed.");
}

// Filter completed
function filterCompleted() {
    const tasks = getTasks();

    console.table(tasks.filter(t => t.completed));
}

module.exports = {
    addTask,
    listTasks,
    completeTask,
    removeTask,
    filterCompleted
};