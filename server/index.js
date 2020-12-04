let app = require('express')();
let cors = require('cors');
app.use(cors());
let http = require('http').Server(app);
let io = require('socket.io')(http);

http.listen(3000,()=>console.log('Server dx listening on port 3000'));
let { combineLatest, fromEvent } = require('rxjs');
let { map, startWith, auditTime } = require('rxjs/operators');

let connected_observables = [];
let main_observable = null;

fromEvent(io,'connection')
    .subscribe(function(client) {

        // Restart the main observable if required
        if(connected_observables.length > 0){
            stopMain();
        }

        let client_obs = fromEvent(client, 'mouse').pipe(
            map((x)=>JSON.parse(x)),
            startWith([50,50,''])
        );
        connected_observables.push(client_obs);

        fromEvent(client, 'disconnect').subscribe(() => {

            let index = connected_observables.indexOf(client_obs);
            if (index > -1) {
                connected_observables.splice(index, 1);
            }


            stopMain();
            if(connected_observables.length > 0){
                startMain();
            }
            console.log('Removed a connection');
        });

        startMain();
        console.log('Added connection');

    });


function startMain() {
    main_observable = combineLatest(connected_observables).pipe(
        auditTime(100)
    ).subscribe((x) => {
        console.log(JSON.stringify(x));
        io.emit('mouse',JSON.stringify(x));
    });
}

function stopMain() {
    main_observable.unsubscribe();
}


