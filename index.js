function toast(msg, color) {
    const toast = document.querySelector('#toast');
    toast.classList.remove('bg-primary', 'bg-danger');
    toast.classList.add(color);
    document.querySelector('.toast-body').innerText = msg;
    new bootstrap.Toast(toast).show();
}

function createCallback() {
    const url = document.querySelector('#url').value;
    const slug = document.querySelector('#slug').value;
    const originStatus = document.querySelector('#create').style.display;

    document.querySelector('#create').style.display = 'none';
    document.querySelector('#create-disabled').style.display = originStatus;
    axios({
        method: 'post',
        url: '/api/create',
        data: { url, slug },
    }).then((resp) => {
        toast(resp.data.msg ?? 'ok', 'bg-success');
        document.querySelector('#output').value = window.location.origin + '/' + resp.data.slug;
    }).catch((err) => {
        toast(err.response.data.msg ?? 'err', 'bg-danger');
    }).finally(() => {
        document.querySelector('#create-disabled').style.display = 'none';
        document.querySelector('#create').style.display = originStatus;
    });
}

document.querySelector('#output').value = window.location + 'short';
document.querySelector('#create-disabled').style.display = 'none';

const clipboard = new ClipboardJS('#copy');
clipboard.on('success', function (e) {
    //console.log('SUCCESS', e.text, e.trigger);
    toast('Copied.', 'bg-info')
    e.clearSelection();
});
clipboard.on('error', function (e) {
    //console.log('FAILED', e.trigger);
});