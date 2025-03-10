const fs = require("fs");
const readline = require("readline");

let tasks = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const showMenu = () => {
    console.log("\n--- Menu Gestion de Tâches ---");
    console.log("1. Ajouter une tâche");
    console.log("2. Afficher les tâches");
    console.log("3. Marquer une tâche comme terminée");
    console.log("4. Supprimer une tâche");
    console.log("5. Sauvegarder les tâches");
    console.log("6. Charger les tâches");
    console.log("7. Quitter");
};

const addTask = () => {
    rl.question("Entrez la description de la tâche : ", (description) => {
        const newTask = {
            id: tasks.length + 1,
            description,
            completed: false
        };
        tasks.push(newTask);
        console.log(`Tâche ajoutée : ${description}`);
        main();
    });
};

const displayTasks = () => {
    console.log("\nListe des Tâches :");
    tasks.forEach(task => {
        console.log(`${task.id}. [${task.completed ? "✔" : " "}] ${task.description}`);
    });
    main();
};

const completeTask = () => {
    rl.question("Entrez l'ID de la tâche à marquer comme terminée : ", (taskId) => {
        const task = tasks.find(t => t.id == taskId);
        if (task) {
            task.completed = true;
            console.log(`Tâche ${taskId} marquée comme terminée.`);
        } else {
            console.log("Tâche introuvable.");
        }
        main();
    });
};

const removeTask = () => {
    rl.question("Entrez l'ID de la tâche à supprimer : ", (taskId) => {
        tasks = tasks.filter(t => t.id != taskId);
        console.log(`Tâche ${taskId} supprimée.`);
        main();
    });
};

const saveTasks = () => {
    fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2), (err) => {
        if (err) console.log("Erreur de sauvegarde :", err);
        else console.log("Tâches sauvegardées !");
        main();
    });
};

const loadTasks = () => {
    fs.readFile("tasks.json", "utf8", (err, data) => {
        if (err) {
            console.log("Aucune tâche à charger.");
            tasks = [];
        } else {
            tasks = JSON.parse(data);
            console.log("Tâches chargées !");
        }
        main();
    });
};

const main = () => {
    showMenu();
    rl.question("\nChoisissez une option : ", (choice) => {
        switch (choice) {
            case "1":
                addTask();
                break;
            case "2":
                displayTasks();
                break;
            case "3":
                completeTask();
                break;
            case "4":
                removeTask();
                break;
            case "5":
                saveTasks();
                break;
            case "6":
                loadTasks();
                break;
            case "7":
                console.log("Au revoir !");
                rl.close();
                break;
            default:
                console.log("Option invalide. Veuillez choisir une option valide.");
                main();
                break;
        }
    });
};

loadTasks();
