/**
 * Тестовое приложение "TruckViewer" на Framework7
 */
let $$ = Dom7;

function createValidator(schema) {
    let ajv = new Ajv({allErrors: true});
    return ajv.compile(schema);
}

function refreshTrucksList() {

    Framework7.request.get('http://rsprm.ru/test/trucks', function (data) {

        let truckValidator = createValidator({
            "title": "Truck",
            "description": "Validate truck object",
            "type": "object",
            "properties": {
                "id": {
                    "description": "truck id",
                    "type": "string"
                },
                "nameTruck": {
                    "description": "truck name",
                    "type": "string"
                },
                "price": {
                    "description": "truck price",
                    "type": "string"
                }
            },
            "required": [ "id", "nameTruck", "price" ]
        });

        let trucksArray = JSON.parse(data);

        let listTemplate = $$('#listTemplate').html();
        let compiledTemplate = Template7.compile(listTemplate);
        let htmlStr = compiledTemplate({trucks: trucksArray.filter(truckValidator)});
        $$('.page-content').append(htmlStr);

    });
}

let app = new Framework7({
    root: '#app',
    id: 'ru.rsprm',
    routes: routes,
    on: {
        init: function () {
            refreshTrucksList();
        }
    },
    name: 'TruckViewer',
    version: '1.0.0',
    theme: 'auto'
});

let mainView = app.views.create('.view-main');


