/**
 * Тестовое приложение "TruckViewer" на Framework7
 */
let $$ = Dom7;

function createValidator(schema) {
    let ajv = new Ajv({allErrors: true});
    return ajv.compile(schema);
}
let app = new Framework7({
    root: '#app',
    id: 'ru.rsprm',
    routes: [
        {
            path: '/',
            url: './index.html',
        },
        {
            name: 'catalog',
            path: '/catalog/',
            componentUrl: './pages/catalog.html',
        },
        {
            path: '/truck/:id/',
            componentUrl: './pages/truck.html',
            on: {
                pageInit: function (e, page) {
                    $$('.save-truck-data').on('click', function () {
                        let formDataObj = app.form.convertToData('#truckForm');
                        app.request({
                            url: 'http://rsprm.ru/test/truck/'.concat(page.route.params.id),
                            async: false,
                            method: 'PATCH',
                            data: JSON.stringify(formDataObj),
                            contentType: 'application/json',
                            crossDomain: true,
                            processData: false
                        });

                        app.router.navigate({ name: 'catalog' });
                    });
                }
            }
        }
    ],
    on: {
        init: function () {

        }
    },
    data: function () {
        return {
            trucks: undefined
        }
    },
    name: 'TruckViewer',
    version: '1.0.0',
    theme: 'auto'
});

var catalogView = app.views.create('#view-catalog', {
    url: '/catalog/'
});