routes = [
    {
        path: '/',
        url: './index.html',
    },
    {
        path: '/truck/:id/',
        templateUrl: './pages/truck.html',
        on: {
            pageInit: function (e, page) {
                $$('.save-truck-data').on('click', function(){
                    let formData = app.form.convertToData('#truckForm');
                    alert(JSON.stringify(formData));
                });
            }
        }
    }
];