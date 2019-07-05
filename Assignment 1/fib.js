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

    if (!isNaN(num)) {
        if (num < 0) {
            console.log("Cannot compute Fib of a negative integer");
        } else {
            for (var i = 0; i < num; i++) {
                arr[i.toString()] = fibonacci(i);
            }
            console.log(arr);
        }
    } else {
        console.log("Invalid Input");
    }
    return arr
}
