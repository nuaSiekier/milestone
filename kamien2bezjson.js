window.onload = function () {
    //Tworzymy zmienne
    var taskName = document.getElementById('taskTittle');
    var taskDesc = document.getElementById('taskDescribe');
    var taskStatus = document.getElementById('taskStatus');
    var tbodyEl = document.getElementById('tbodyID');
    var indexButton;
    var arr = [];
    var addBtn = document.getElementById('addButton');
    //Odpalamy zdarzenie
    addBtn.addEventListener('click', addTask);
    //Definijemy funkcje
    function addTask() {
        //przypisujemy tymczasowe obiekty do tabeli
        var newTask = {
            name: taskName.value,
            description: taskDesc.value,
            status: taskStatus.value
        };
        //dodajemy nowe zadanie do tabeli
        arr.push(newTask);
        //wyswietlamy dodane zadanie
        showData(arr);
        taskName.value = '';
        taskDesc.value = '';
        taskStatus.value = '';
    }

    function showData(arr) {
        //czyścimy tablice po przejsciu petli
        tbodyEl.innerHTML = '';
        for (var i = 0; i < arr.length; i++) {
            //tworzymy nowy wiersz
            var myRows = document.createElement('tr');
            var tdEditButton = document.createElement('td');
            var tdDeleteButton = document.createElement('td');
            var editButton = document.createElement('button');
            var deleteButton = document.createElement('button');
            //tworzymy nowa komorke, ktora pobiera dane z inputow
            creatTd(arr[i].name, myRows);
            creatTd(arr[i].description, myRows);
            creatTd(arr[i].status, myRows);

            //dodajemy przyciski
            tdEditButton.appendChild(editButton);
            tdDeleteButton.appendChild(deleteButton);
            myRows.appendChild(tdEditButton);
            myRows.appendChild(tdDeleteButton);

            //dodajemy do tbody
            tbodyEl.appendChild(myRows);

            //definiujemy przyciski
            editButton.innerText = 'Edit';
            editButton.setAttribute('data-id-button', i);
            editButton.addEventListener('click', editItem);

            deleteButton.innerText = 'Delete';
            deleteButton.setAttribute('data-id-button', i);
            deleteButton.addEventListener('click', deleteItem);
        }

        function creatTd(value, row) {
            //tworzymy komórki
            var cell = document.createElement('td');
            cell.innerText = value;
            row.appendChild(cell);
            return cell;
        }
    }
    function deleteItem(e) {
        var indexButton = e.target.getAttribute('data-id-button');
        arr.splice(indexButton, 1);
        showData(arr);
    }

    function editItem(e) {
        indexButton = e.target.getAttribute('data-id-button');
        var newEditValue = getTaskDetails(indexButton);
        fillInputs(newEditValue);
        addBtn.removeEventListener('click', addTask);
        addBtn.addEventListener('click', editConfirm);
    }

    function fillInputs(task) {
        taskName.value = task.name;
        taskDesc.value = task.description;
        taskStatus.value = task.status;
    }
    function getTaskDetails(index) {
        return arr[index];
    }

    function editConfirm() {
        var editedTask = {
            name: taskName.value,
            description: taskDesc.value,
            status: taskStatus.value
        };
        arr[indexButton] = editedTask;
        showData(arr);
        //wychodzi z ''editmode''
        addBtn.removeEventListener('click', editConfirm);
        addBtn.addEventListener('click', addTask);

        taskName.value = '';
        taskDesc.value = '';
        taskStatus.value = '';

    }
    //precyzujemy wyszukiwanie
    var filterButton = document.getElementById('searchButton');
    var filterInput = document.getElementById('searchTask');
    filterButton.addEventListener('click', searchItem);

    function searchItem() {
        var tempArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (
                arr[i].name == filterInput.value ||
                arr[i].description == filterInput.value ||
                arr[i].status == filterInput.value
            ) {
                //jesli prawda to pushuj
                tempArr.push(arr[i]);
            }
        }
        showData(tempArr);
    }
}