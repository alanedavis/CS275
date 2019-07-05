function fibonacci(num) {
    if (num == 0) {
        return 0
    } else if (num == 1) {
        return 1
    } else {
        for (i = 0; i < num; i++) {
            return (fibonacci(num - 1) + fibonacci(num - 2))
        }
    }
}

function output() {
    var txtField = document.getElementById("n").value;
    var num = Number(txtField);
    var arr = {};
    var table = document.createElement("table");
    var col = [];
    var tr = table.insertRow(-1);
    var th = document.createElement("th");
    var divContainer = document.getElementById("tablePrint");
    var tabCell = tr.insertCell(-1);

    if (!isNaN(num)) {
        if (num < 0) {
            console.log("Cannot compute Fib of a negative integer");
        } else {
            for (var i = 0; i < num; i++) {
                arr[i.toString()] = fibonacci(i);
            }

            for (var i = 0; i < arr.length; i++) {
                for (var value in arr[i]) {
                    if (col.indexOf(value) === -1) {
                    col.push(value);
                    }
                }
            }

            for (var i = 0; i < col.length; i++) {
                th.innerHTML = col[i];
                tr.appendChild(th);
            }

            for (var i = 0; i < arr.length; i++) {
                
                tr = table.insertRow(-1);

                for (var j = 0; j < col.length; j++) {
                    tabCell.innerHTML = arr[i][col[j]];
                }
            }

            divContainer.innerHTML = "";
            divContainer.appendChild(table);
            console.log(arr);
        }
    } else {
        console.log("Invalid Input");
    }
    return arr
}
