var checking = false;
var password = undefined;

window.addEventListener('message', function(event){
    if (event.data.type == "open") {
        if (event.data.data != undefined) {
            password = event.data.data;
            $('body').removeClass('hidden').addClass('block');
        }
    }
})

// setInterval(() => {
//     console.log(password);
// }, 1000);

function numpad(pad) {
    if (pad == 'clear') {
        if (checking == false) {
            $('#passwordInput').val('');
        }
    } else if (pad == 'enter') {
        if ($('#passwordInput').val().length == 4) {
            checking = true
            $('#status').removeClass('bg-red-900').addClass('bg-yellow-500');
            $('#status').text('CHECKING...');
            if (password != 'setpass') {
                setTimeout(() => {
                    if ($('#passwordInput').val() == password) {
                        $('#status').removeClass('bg-yellow-500').addClass('bg-green-500');
                        $('#status').text('APPROVED');
                        setTimeout(() => {
                            $('body').removeClass('block').addClass('hidden');
                            $.post('https://deniz-keypad/close');
                            $.post('https://deniz-keypad/get-callback', JSON.stringify({
                                status: true,
                                inputPass: $('#passwordInput').val(),
                            }));
                            defaultValue();
                            checking = false
                            password = undefined;
                        }, 2000);
                    } else {
                        $('#status').removeClass('bg-yellow-500').addClass('bg-red-900');
                        $('#status').text('ACCESS DENIED');
                        setTimeout(() => {
                            defaultValue();
                            checking = false
                        }, 2000);
                    }
                }, 2000);
            } else {
                setTimeout(() => {
                        $('#status').removeClass('bg-yellow-500').addClass('bg-green-500');
                        $('#status').text('APPROVED');
                        setTimeout(() => {
                            $('body').removeClass('block').addClass('hidden');
                            $.post('https://deniz-keypad/close');
                            $.post('https://deniz-keypad/get-callback', JSON.stringify({
                                status: true,
                                inputPass: $('#passwordInput').val(),
                            }));
                            defaultValue();
                            checking = false
                            password = undefined;
                        }, 2000);
                }, 2000);
            }
        }
    } else {
        if (checking == false) {
            let oldvalue = $('#passwordInput').val();
            if (oldvalue.length < 4) {
                $('#passwordInput').val(oldvalue+''+pad);
            }
        }
    }
}

function defaultValue() {
    $('#status').removeClass('bg-green-500').addClass('bg-red-900');
    $('#status').text('WAITING');
    $('#passwordInput').val('');
}

$(document).on('keyup',function(evt) {
    if (evt.keyCode == 27) {
        $('body').removeClass('block').addClass('hidden');
        console.log('lmao loser');
        $.post('https://deniz-keypad/close');
        $.post('https://deniz-keypad/get-callback', JSON.stringify({
            status: false,
        }));
        defaultValue()
    }
});

// setInterval(() => {
//     let length = $('#passwordInput').val().length;
//     if (length < 4) {
//         $('#status').removeClass('bg-green-500').addClass('bg-red-900');
//         $('#status').text('WAITING');
//     } else if (length == 4) {
//         $('#status').removeClass('bg-red-900').addClass('bg-green-500');
//         $('#status').text('READY');
//     }
// }, 100);