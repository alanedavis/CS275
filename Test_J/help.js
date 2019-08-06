function offerExpires() {
  var weekFromToday, day, date, month, year, dayNames, monthNames;
  var expiryMsg = 'Offer expires next ';
  var today = new Date();
  

  weekFromToday =new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  day = dayNames [weekFromToday.getDay()];
  date= weekFromToday.getDate();
  month= monthNames[weekFromToday.getMonth()];
  year= weekFromToday .getFullYear();

  expiryMsg += day + ' ' + '(' + date + ' ' + month + ' ' + year +')';
  
  $('#output').html(expiryMsg);
}

function forloop() {
  var scores = [24, 32, 17];
  var arrayLength = scores.length;
  var roundNumber = 0;
  var msg = '';
  var i;

  for (i = 0; i < arrayLength; i++) {
    roundNumber = (i + 1);
    msg += 'Round ' + roundNumber + ': ';
    msg += scores[i] + '<br></br>';
  }

  $('#output').html(msg);
}

function forloop2() {
  var scores = [24, 32, 17];
  var msg = '';

  for (var i = 0; i < scores.length; i++) {
    msg += 'Round ' + (i + 1) + ': ';
    msg += scores[i] + '<br></br>';
  }

  $('#output').html(msg);
}

function forloop3() {
  var n = 2;
  var msg = '';

  for (var i = 1; n < 100; i++) {
    n = n * i;
    msg += n + '<br />';
  }

  $('#output').html(msg);
}

function whileloop() {
  var i = 1;
  var msg = '';

  while (i < 10) {
    msg += i + ' x 5 = ' + (i * 5) + '<br></br>';
    i++;
  }

  $('#output').html(msg);
}

function whileloop2() {
  var i = 1;
  var msg = '';

  do {
    msg += i + ' x 5 = ' + (i * 5) + '<br></br>';
    i++;
  } while (i < 1);

  $('#output').html(msg);
}

function whileloop3() {
  var n = 2;
  var msg = '';

  while (n < 100) {
    n = n * i;
    msg += n + '<br />';
    i++;
  }

  $('#output').html(msg);
}