var today = new Date();
var displayedYear = today.getFullYear();
var displayedMonth = today.getMonth();
var tableDatas = document.querySelectorAll("#calendar tbody td");
var leftButton = document.querySelector("button#leftButton");
var rightButton = document.querySelector("button#rightButton");
var displayYearMonth = document.createElement('div');
document.body.appendChild(displayYearMonth);
leftButton.addEventListener("click", function () {
    displayedMonth--;
    if (displayedMonth < 0) {
        displayedMonth = 11;
        displayedYear--;
    }
    fillTable();
});
rightButton.addEventListener("click", function () {
    displayedMonth++;
    if (displayedMonth > 11) {
        displayedMonth = 0;
        displayedYear++;
    }
    fillTable();
});
fillTable();
var tableTdCounter;
var currentFirstDay;
var currentFirstWeekday;
function fillTable() {
    tableTdCounter = 0;
    currentFirstDay = new Date(displayedYear, displayedMonth, 1);
    currentFirstWeekday = (currentFirstDay.getDay() + 6) % 7;
    displayYearMonth.textContent = "".concat(displayedYear, "-").concat(displayedMonth + 1);
    var daysInMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();
    tableDatas.forEach(function (td) {
        var dayNumber = tableTdCounter - currentFirstWeekday + 1;
        td.textContent = "";
        if (dayNumber >= 1 && dayNumber <= daysInMonth) {
            td.textContent = "".concat(dayNumber);
            var div = document.createElement('div');
            div.id = "plan-container";
            var newInput = document.createElement('input');
            newInput.id = "".concat(displayedYear, "-").concat(displayedMonth + 1, "-").concat(dayNumber);
            td.appendChild(newInput);
        }
        tableTdCounter++;
        var input = td.querySelector("input");
        if (input) {
            input.addEventListener("input", function () {
                var date = input.id;
                var text = input.value;
                savePlan(date, text);
            });
        }
    });
    fetchPlans();
}
function savePlan(date, text) {
    var _a;
    fetch("https://naptar-backend.onrender.com/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify((_a = {}, _a[date] = text, _a))
    });
}
function fetchPlans() {
    fetch('https://naptar-backend.onrender.com/plans') //GET
        .then(function (response) { return response.json(); })
        .then(function (plans) {
        Object.entries(plans).forEach(function (_a) {
            var date = _a[0], text = _a[1];
            var input = document.getElementById(date);
            if (input) {
                input.value = text;
            }
        });
    });
}
