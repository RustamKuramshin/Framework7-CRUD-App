/**
 * Тестовое приложение "TruckViewer" на Framework7
 */
let $$ = Dom7;

function createValidator(schema) {
    let ajv = new Ajv({allErrors: true});
    return ajv.compile(schema);
}

function getTrucksList() {

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
                },
                "comment": {
                    "description": "comment",
                    "type": "string"
                }
            },
            "required": [ "id", "nameTruck", "price", "comment" ]
        });

        let trucksArray = JSON.parse(data);

        app.data.trucks = trucksArray.filter(truckValidator);

        var catalogView = app.views.create('#view-catalog', {
            url: '/catalog/'
        });

    });
}

let app = new Framework7({
    root: '#app',
    id: 'ru.rsprm',
    routes: routes,
    on: {
        init: function () {
            getTrucksList();
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