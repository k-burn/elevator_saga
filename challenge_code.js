{
    init: function(elevators, floors) {
        
        function activateElevator(elevator) {
            // Whenever the elevator is idle (has no more queued destinations) ...
            elevator.on("idle", function() {
                 /*
                when idle, go to bottom floor
                seems like most people come from bottom floor in my experience
                */
                elevator.goToFloor(0);
            });

            // when floor button pressed, go to requested floor
            elevator.on("floor_button_pressed", function(floorNum) {
                elevator.goToFloor(floorNum)
            });
            
            // when floor requests an elevator, send elevator to that floor
            for (let f = 0; f < floors.length; f++) {
                let floor = floors[f];
                floor.on("up_button_pressed down_button_pressed", function() {
                    elevator.goToFloor(floor.floorNum());
                });
            }
        };
        
        elevators.forEach(activateElevator);

    },
        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
