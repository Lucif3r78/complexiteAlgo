let tabGlobal;

const generTab = function(){

    let tailleN = document.getElementById("tailleN").value;

    if (tailleN === null || tailleN === "" || tailleN === "0") {
        alert("Le tableau ne peut pas avoir une taille nul.");
        return;
    }

    let tab = [];
    while (tailleN!=0){
       tab.push(Math.floor(Math.random() * 10001));
       tailleN = tailleN - 1;
    }

    tabGlobal = tab;

    var divZoneTab = document.getElementById("zoneTab");
    
    const existingTable = divZoneTab.querySelector('table');
    if (existingTable) {
        divZoneTab.removeChild(existingTable);
    }

    const table = document.createElement('table');
    table.className = 'tabGenerer';
    
    const dataRow = table.insertRow(0);

    // Create table cells for the data
    for (let i = 0; i < tab.length; i++) {
        const cell = dataRow.insertCell(i);
        cell.textContent = tab[i];
    }
    
    divZoneTab.appendChild(table);

    console.log(tabGlobal);
}

const generTabSorted = function() {
    let tailleN = document.getElementById("tailleN").value;

    if (tailleN === null || tailleN === "" || tailleN === "0") {
        alert("Le tableau ne peut pas avoir une taille nul.");
        return;
    }

    let tab = [];

    while (tailleN != 0) {
        tab.push(Math.floor(Math.random() * 10001));
        tailleN = tailleN - 1;
    }
    tab.sort((a, b) => a - b);

    tabGlobal = tab;

    var divZoneTab = document.getElementById("zoneTab");

    const existingTable = divZoneTab.querySelector('table');
    if (existingTable) {
        divZoneTab.removeChild(existingTable);
    }

    const table = document.createElement('table');
    table.className = 'tabGenerer';

    const dataRow = table.insertRow(0);

    for (let i = 0; i < tab.length; i++) {
        const cell = dataRow.insertCell(i);
        cell.textContent = tab[i];
    }

    divZoneTab.appendChild(table);
}


const chercheDansTab = function(){
    let numberToSearch = parseInt(document.getElementById("numberToSearch").value);
    let table = document.querySelector('#zoneTab table');
    if (table === null || table === "") {
        alert("Vous devez générer un tableau.");
        return;
    }
    // let rows = table.rows;
    let found = false;

    document.getElementById("zoneTabSearch").innerHTML = "";
    var canvas = document.getElementById("myChart");
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Recherche Naive
    const chercheNaive = function() {
        const startTimeNaive = performance.now();

        for (let i = 0; i < tabGlobal.length; i++) {
            if (tabGlobal[i] === numberToSearch) {
                found = true;
            }
        }

        const endTimeNaive = performance.now();

        if (!found) {
            document.getElementById("zoneTabSearch").innerHTML = "Number not found in the table.";
        }

        const executionTimeNaive = endTimeNaive - startTimeNaive;
        return executionTimeNaive;
    };

    // Recherche Dichotomique
    const chercheDicho = function() {
        const startTime = performance.now();
        const cible = numberToSearch;

        let found = false;
        let low = 0;
        let high = tabGlobal.length - 1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);

            if (tabGlobal[mid] === cible) {
                found = true;
                break;
            } else if (tabGlobal[mid] < cible) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        const endTime = performance.now();

        if (!found) {
            document.getElementById("zoneTabSearch").innerHTML = "Le nombre n'a pas été trouvé dans le tableau.";
        } else {
            const tableCells = table.getElementsByTagName("td");
            for (let i = 0; i < tableCells.length; i++) {
                if (parseInt(tableCells[i].textContent) === numberToSearch) {
                    tableCells[i].classList.add("highlight");
                } else {
                    tableCells[i].classList.remove("highlight"); // Pour supprimer les anciennes mises en évidence
                }
            }
        }

        const tempsExecution = endTime - startTime;
        return tempsExecution;
    };



    // Affichage des résultats (graph)
    const xValues = ["Naïf", "Dichotomie"];
    var barColors = ["#A31621", "#D5B942"];
    var tours = 5000;
    var tabNaif = [];
    var tabDicho = [];
    var totalExecutionTimeNaive = 0;
    var totalExecutionTimeDicho = 0;
    
    while (tours > 0) {
        executionTimeNaive = chercheNaive();
        tabNaif.push(executionTimeNaive);
        totalExecutionTimeNaive += executionTimeNaive;
    
        executionTimeDicho = chercheDicho();
        tabDicho.push(executionTimeDicho);
        totalExecutionTimeDicho += executionTimeDicho;
    
        tours = tours - 1;
    }
    
    // Calculate the average execution time for each method
    const averageExecutionTimeNaive = totalExecutionTimeNaive / tabNaif.length;
    const averageExecutionTimeDicho = totalExecutionTimeDicho / tabDicho.length;
    console.log(totalExecutionTimeDicho);
    const yValues = [averageExecutionTimeNaive, averageExecutionTimeDicho];

    new Chart("myChart", {
        type: "bar",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues,
          }]
        },
        options: {
          legend: {display: false},
          title: {
            display: true,
            text: "Moyenne d'exécution pour 5000 recherches"
          }
        }
    });
}

const bubbleSort = function(){

    // Génération du tableau
    tailleN = 5000
    table = [];
    while (tailleN!=0){
        table.push(Math.floor(Math.random() * 1001));
        tailleN = tailleN - 1;
    }

    const startTime = performance.now();

    for (let compteur = 0; compteur<table.length; compteur++){
        for (let compteur2 = 0; compteur2 < (table.length - compteur - 1); compteur2++) {
            if (table[compteur2] > table[compteur2 + 1]) {
                var temp = table[compteur2]
                table[compteur2] = table[compteur2 + 1]
                table[compteur2 + 1] = temp
            }
        }
    }
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    document.getElementById("zoneTpsRechercheBubble").innerHTML = "<p>Le temps d'exécution est de </p>"+executionTime+" millisecondes.";

    return executionTime;
}

// Tri par fusion
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

const fusionSort = function() {
    // Génération du tableau
    let tailleN = 5000;
    let sortTab = [];
    while (tailleN != 0) {
        sortTab.push(Math.floor(Math.random() * 5001));
        tailleN = tailleN - 1;
    }

    const startTime = performance.now();

    const sortedList = mergeSort(sortTab);

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    // console.log("Sorted List:", sortedList);
    // console.log("Execution Time:", executionTime);
    document.getElementById("zoneTpsRechercheMerge").innerHTML = "<p>Le temps d'exécution est de </p>"+executionTime+" millisecondes.";

    return executionTime;
}

// Tri par insertion
const insertionSort = function() {
    // Génération du tableau
    let tailleN = 5000;
    let tab = [];
    while (tailleN != 0) {
        tab.push(Math.floor(Math.random() * 5001));
        tailleN = tailleN - 1;
    }
    document.getElementById("zoneTpsRechercheInsertion").innerHTML = "";
    const startTime = performance.now();
    for (let i=1; i<tab.length;i++) {
        let key = tab[i];
        let j = i-1;
        while (j >= 0 && tab[j] > key) {
            tab[j+1] = tab[j];
            j--;
        }
        tab[j+1] = key;
    }
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    document.getElementById("zoneTpsRechercheInsertion").innerHTML = "<p>Le temps d'exécution est de </p>"+executionTime+" millisecondes.";
    
    return executionTime;
}

const algoSortX3 = function() {
    var totalExecutionTimeBubble = 0;
    var totalExecutionTimeFusion = 0;
    var totalExecutionTimeInsertion = 0;
    var bubbleTab = [];
    var fusionTab = [];
    var insertionTab = [];
    var tours = 100;

    for (var i = 0 ; i < tours ; i++){
        var executionTimeBubble = bubbleSort();
        totalExecutionTimeBubble += executionTimeBubble;
        bubbleTab.push(executionTimeBubble);

        var executionTimeFusion = fusionSort();
        totalExecutionTimeFusion += executionTimeFusion;
        fusionTab.push(executionTimeFusion);

        var executionTimeInsertion = insertionSort();
        totalExecutionTimeInsertion += executionTimeInsertion;
        insertionTab.push(executionTimeInsertion);
    };
    // Calculate the average execution time for each method
    const avgExecutionTimeBubble = totalExecutionTimeBubble / bubbleTab.length;
    const avgExecutionTimeFusion = totalExecutionTimeFusion / fusionTab.length;
    const avgExecutionTimeInsertion = totalExecutionTimeInsertion / insertionTab.length;

    const xValues = ["Bubble", "Merge", "Insertion"];
    var barColors = ["#A31621", "#D5B942", "#4E8098"];
    var yValues = [avgExecutionTimeBubble, avgExecutionTimeFusion, avgExecutionTimeInsertion];

    new Chart("myChart2", {
        type: "bar",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues,
          }]
        },
        options: {
          legend: {display: false},
          title: {
            display: true,
            text: "Moyenne d'exécution pour 100 recherches"
          }
        }
    });
}