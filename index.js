PetiteVue.createApp({
    count: 0,
    toastData: PetiteVue.reactive({
        msg: ''
    }),
    data: PetiteVue.reactive({
        url: '',
        slug: '',
        output: window.location.origin + '/short',
        display: true
    }),
    toast(msg, color) {
        const toast = document.querySelector('#toast');
        this.toastData.msg = msg;
        toast.classList.remove('bg-primary', 'bg-danger');
        toast.classList.add(color);
        new bootstrap.Toast(toast).show();
    },
    createCallback() {
        this.data.display = false;
        const data = {
            url: this.data.url,
            slug: this.data.slug,
        }
        axios({
            method: 'post',
            url: '/api/create',
            data: data
        }).then((resp) => {
            this.toast(resp.data.msg ?? 'ok', 'bg-success');
            this.data.output = window.location.origin + '/' + resp.data.slug;
        }).catch((err) => {
            this.toast(err.response.data.msg ?? 'err', 'bg-danger');
        }).finally(() => {
            this.data.display = true;
        });
    },
    mounted() {
        const clipboard = new ClipboardJS('#copy');
        clipboard.on('success', (e) => {
            this.toast('Copied.', 'bg-info');
            e.clearSelection();
        });
    }
}).mount('#app');
