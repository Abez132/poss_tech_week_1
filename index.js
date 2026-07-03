const {
    addTask,
    listTasks,
    completeTask,
    removeTask,
    filterCompleted
} = require("./taskmanager");

const args = process.argv.slice(2);

// First argument
const command = args[0];

switch (command) {

    case "add":
        addTask(args[1]);
        break;

    case "list":
        listTasks();
        break;

    case "complete":
        completeTask(args[1]);
        break;

    case "remove":
        removeTask(args[1]);
        break;

    case "--filter":
        if (args[1] === "completed") {
            filterCompleted();
        }
        break;

    default:
        console.log(`
Commands:

node index.js add "Task"
node index.js list
node index.js complete 1
node index.js remove 1
node index.js --filter completed
`);
}