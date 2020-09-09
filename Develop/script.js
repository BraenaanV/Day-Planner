var workDay = [{
    id: "0",
    hour: "09",
    time: "09",
    meridiem: "am",
    textContent: "",},
{
    id: "2",
    hour: "10",
    time: "10",
    meridiem: "am",
    textContent: ""
},
{
    id: "3",
    hour: "11",
    time: "11",
    meridiem: "am",
    textContent: ""
},
{
    id: "4",
    hour: "12",
    time: "12",
    meridiem: "pm",
    textContent: ""
},
{
    id: "5",
    hour: "01",
    time: "13",
    meridiem: "pm",
    textContent: ""
},
{
    id: "6",
    hour: "02",
    time: "1409",
    meridiem: "pm",
    textContent: ""
},
{
    id: "7",
    hour: "03",
    time: "15",
    meridiem: "pm",
    textContent: ""
},
{
    id: "8",
    hour: "04",
    time: "16",
    meridiem: "pm",
    textContent: ""
},
{
    id: "0",
    hour: "05",
    time: "17",
    meridiem: "pm",
    textContent: ""
}


]


function headerTime() {
    var headerTime = moment().format("dddd, MMMM Do");
    $("#currentDay.lead").text(headerTime);
};

function saveText() {
    localStorage.setItem("workDay", JSON.stringify(workDay));
}


function displayText() {
    workDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.textContent);
    })
}


function initialize() {
    var storedDay = JSON.parse(localStorage.getItem("workDay"));

    if (storedDay) {
        workDay = storedDay;
    }

    saveText();
    displayText();
}


workDay.forEach(function(thisHour) {
  
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);


    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });


    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})

initialize();
headerTime();


$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    workDay[saveIndex].textContent = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveText();
    displayText();
})