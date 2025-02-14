$('input:text').on('focus', function () {
    $('.' + this.className.split(' ')[0]).removeClass('error');
    $('.' + this.className.split(' ')[0] + '-placeholder').removeClass('error-placeholder');
    $('.error-text-' + this.className.split(' ')[0]).hide();
    $('.' + this.className + '-placeholder').addClass('placeholder-focus');
}).on('blur', function () {
    $('.' + this.className + '-placeholder').removeClass('placeholder-focus');
});

$('input:radio').on('click', function () {
    $('.' + this.id).addClass('radio-selected');
    $('.error-text-radio').hide();
    if (this.id === 'Repayment') {
        $('.Interest').removeClass('radio-selected');
    } else {
        $('.Repayment').removeClass('radio-selected');
    }
});

$('.btn-calculate').click(function () {
    if (checkComplete()) {
        calculateResult();
        changeUI();
    } else {
        error();
    }
});

function checkComplete() {
    var variables = ['amount', 'years', 'rate'];
    var checked = true;
    for (var i = 0; i < variables.length; i++) {
        if ($('.' + variables[i]).val() === '') {
            error(variables[i], false);
            checked = false;
        } else if (isNaN($('.' + variables[i]).val())) {
            error(variables[i], true);
            checked = false;
        }
    }
    if ($('input[name=Mortgage]:checked').length === 0) {
        error('radio', false);
        checked = false;
    }
    return checked;
}

function calculateResult() {
    var amount = $('.amount').val();
    var rate = $('.rate').val();
    var years = $('.years').val();
    var result = amount*rate;
    
    var total = result*12*years;
    $('.result').text('$' + parseFloat(result.toLocaleString("pt-BR")));
    $('.total').text('$' + parseFloat(total.toLocaleString("pt-BR")));
}

function changeUI() {
    $('.right-card').css({'text-align': 'left', 'justify-content': 'start'});
    $('.right-card-title').text('Your results');
    $('.p-text ').text(' Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.');
    $('.empty-img').hide();
    $('.result-card').show();
}

function error(field, nan) {
    $('.' + field).addClass('error');
    $('.' + field + '-placeholder').addClass('error-placeholder');
    $('.error-text-' + field).show();
    if (nan) {
        $('.error-text-' + field).text('This field must be a number');
    } else {
        $('.error-text-' + field).text('This field is required');
    }
}