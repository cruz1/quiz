(function() {
  var questions = [{
    question: "hver er forseti islands?",
    choices: ["Olafur ragnar grimsson","Friðrik Njálsson","Guðrún Randalín","Jón Gnarr"],
    correctAnswer: 0
  }, {
    question: "hvað er 1+3+2?",
    choices: [1,3,5,6],
    correctAnswer: 3
  }, {
    question: "hvað er 8*9?",
    choices: [72, 123, 521, 12, 62],
    correctAnswer: 0
  }, {
    question: "Hvað er millinafn Friðriks Njálssonar",
    choices: ["Jón","Hans","Hann er með ekkert millinafn","Máni"],
    correctAnswer: 3
  }, {
    question: "hver er Borgarstjóri Reyjkavíkur?",
    choices: ["Olafur ragnar grimsson","Friðrik Njálsson","Dagur B. Eggertsson","Jón Gnarr"],
    correctAnswer: 2
  }];



  var spurningaCounter = 0; //fylgir spurningunum
  var svörFráNotenda = [];//tekur við svörum
  var quiz = $('#quiz'); //finnur quiz div tagið i index skjalinu.

  sýnaNæst();

  $('#næst').on('click', function (e) {//handler fyrir næst takkann
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    velja();

    //bremsa ef ekki er valið
    if (isNaN(svörFráNotenda[spurningaCounter])) {
      alert('Please make a selection!');
    } else {
      spurningaCounter++;
      sýnaNæst();
    }
  });


    //handler fyrir restart takka
    $('#byrja').on('click', function (e) {
    e.preventDefault();

    if(quiz.is('')) {
      return false;
    }
    spurningaCounter = 0;
    svörFráNotenda = [];
    sýnaNæst();
    $('#byrja').hide();
  });



  //býr til div
  function búaTilSpurnElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h1>Spurning ' + (index + 1) + ':</h1>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = búaTilRadio(index);
    qElement.append(radioButtons);

    return qElement;
  }

//búaTilRadio
    function búaTilRadio(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // tekur svar notanda og setur i array
  function velja() {
    svörFráNotenda[spurningaCounter] = +$('input[name="answer"]:checked').val();
  }

  // sýnir næsta element
  function sýnaNæst() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(spurningaCounter < questions.length){
        var nextQuestion = búaTilSpurnElement(spurningaCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(svörFráNotenda[spurningaCounter]))) {
          $('input[value='+svörFráNotenda[spurningaCounter]+']').prop('checked', true);
        }

        if(spurningaCounter === 1){
        } else if(spurningaCounter === 0){

          $('#næst').show();
        }
      }else {
        var stigElem = sýnaSkor();
        quiz.append(stigElem).fadeIn();
        $('#næst').hide();
        $('#byrja').show();
      }
    });
  }

  // Sýnir score.
  function sýnaSkor() {
    var score = $('<p>',{id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < svörFráNotenda.length; i++) {
      if (svörFráNotenda[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    score.append('þú náðir ' + numCorrect + ' spurningum af ' +
                 questions.length + ' réttum');
    return score;
  }
})();
