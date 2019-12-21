const url = 'http://localhost:3000/api/users';
const logout = () => {
    $.ajax({
        url: url + '/logout',
        method: 'get',
        beforeSend: (req) => {
            req.setRequestHeader('Authorization', localStorage.getItem('token'));
        }
    }).done((response) => {
        if (response.logout) {
            window.location = '/';
            localStorage.clear();
        } else
            $('body').show();
    });
}

const auth = () => {
    $.ajax({
        url: url + '/check',
        method: 'POST',
        beforeSend: (req) => {
            req.setRequestHeader('Authorization', localStorage.getItem('token'));
        }
    }).done((response) => {
        if (!response.valid)
            window.location = '/login';
        else
            $('body').show();
    });
}

$(() => {
    auth();
    $('.logout-btn').click(e => {
        console.log('clicked');
        e.preventDefault();
        logout();
    })
})