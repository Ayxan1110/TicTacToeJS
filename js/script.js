let count = 0;
let xScore = 0;
let oScore = 0;
let tieScore = 0;

let clickedCells = []
const cells = [
    {place: 1, isClicked: false},
    {place: 2, isClicked: false},
    {place: 3, isClicked: false},
    {place: 4, isClicked: false},
    {place: 5, isClicked: false},
    {place: 6, isClicked: false},
    {place: 7, isClicked: false},
    {place: 8, isClicked: false},
    {place: 9, isClicked: false},
]
const winningOrders = [
    [1,2,3, "b-1-r"],
    [1,4,7, "b-1-c"],
    [1,5,9, "b-l-d"],
    [3,6,9, "b-3-c"],
    [3,5,7, "b-r-d"],
    [7,8,9, "b-3-r"],
    [4,5,6, "b-2-r"],
    [2,5,8, "b-2-c"],
]

$(document).ready(function(){
    $.each(cells, function (key, index){
        $(`<div onclick="cellClicked(${index.place})" class="cell ${index.place}"></div>`).appendTo(".board")
    });
});
function cellClicked(elem){
    if($(`.${elem}`).is(':empty')){
        clickedCells.push(elem);
        if(count == 0){
            $(`.${elem}`).append(`<div>X</div>`);
            $(`.${elem}`).addClass("x");
            count++;
        }
        else{
            $(`.${elem}`).append("<div>O</div>");
            $(`.${elem}`).addClass("o");
            count--;
        }
        if(clickedCells.length == 9){
            tieScore++;
            $(".tie-score").html(tieScore);
            clearBoard()
            return true;
        }
        $.each(winningOrders, function(key, order){
            if(clickedCells.length > 2 && order.slice(0,3).sort().every(i => clickedCells.includes(i))){
                if(order.slice(0,3).every(i => $(`.${i}`).text() === "X")){
                    lineChecker(winningOrders[key])
                    xScore++
                    $(".x-score").html(xScore)
                    clearBoard(winningOrders[key]);
                }
                if(order.slice(0,3).every(i => $(`.${i}`).text() === "O")){
                    lineChecker(winningOrders[key])
                    oScore++
                    $(".o-score").html(oScore)
                    clearBoard(winningOrders[key]);
                }
            }
        })
    }
} 

function clearBoard(className) { 
    $(".cell").addClass("unclickable")
    setTimeout(function() {
        resetSettings(className)
    }, 2500); 
}

function resetSettings(className) {
    clickedCells = [];
    $(".board").empty();
    $.each(cells, function(key, index) {
        $(`<div onclick="cellClicked(${index.place})" class="cell ${index.place}"></div>`).appendTo(".board");
    });
    $(".cell").removeClass("unclickable")
    $(".board").removeClass(className)
}

function reset() { 
    resetSettings();
    $(".x-score").html(0)
    $(".o-score").html(0)
    $(".tie-score").html(0)
}

function lineChecker(className) { 
    $(".board").addClass(className)
}