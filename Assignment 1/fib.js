// Recursive fibonacci function to get any required fibonacci number
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
    // Allows for javascript to be able to see the inputted data from the user in the HTML file
    var num = document.getElementById("n").value;
    // Starts the beginning of a table with "n" and "fib(n)" being at the top of 2 columns
    var opentable = '<table border="1" align="center"> <tr> <th><b>n</b></th><th><b>fib(n)</b></th>';
    // This will be where the generated numbers will be added with <tr> and <td> tags
    var tablebody = '';
    // Defines the end of our generated table
    var closetable = '</table>';

    // If value is not a number send to else
    if (!isNaN(num)) {
        // If less than 0 return error
        if (num < 0) {
            console.log("Cannot compute Fib of a negative integer");
        } else {
            // If input is valid, start adding to table
            for (var i = 0; i < num; i++) {
                // Create new row for each pair of values
                tablebody += '<tr>';
                // Generate current fibonacci number
                fibnum = fibonacci(i);
                for (var j = 0; j < 2; j++) {
                    if (j == 0) {
                        // In column one return which number in the sequence is being returned
                        tablebody += '<td>';
                        tablebody += i;
                        tablebody += '</td>'
                    } else if (j == 1) {
                        // In column two return the fibonacci value that follows the sequence number
                        tablebody += '<td>';
                        tablebody += fibnum;
                        tablebody += '</td>';
                    }
                }
                // Close off the new row with the new values
                tablebody += '<tr>';
            }
            // Import the finished table into the HTML Document
            document.getElementById('output').innerHTML = opentable + tablebody + closetable;
        }
    } else {
        // If the value is not a number return error
        console.log("Invalid Input");
    }
}
