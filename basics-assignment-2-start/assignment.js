const task3Element = document.getElementById('task-3');


ShowAlert();
ShowAlert2("Zuza");

task3Element.addEventListener('click', ShowAlert);


let result = CombineNames("Adrian", "Zuza", "Koty");

alert(result);

function ShowAlert2(name) {
    alert(name);
}

function ShowAlert() {
    alert("Text to show");
}

function CombineNames(name1, name2, name3) {
    return name1 + name2 + name3;
}