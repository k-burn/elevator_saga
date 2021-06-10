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

            elevator.on("passing_floor", function(floorNum, direction) {
                // check to see if the floor we're passing has been selected
                let pressedFloors = elevator.getPressedFloors();
                if (pressedFloors.includes(floorNum)) {
                    elevator.goToFloor(floorNum, true);
                };

                // check to see if there are any passengers waiting on the floor selected
                // if the direction is the same way we're heading, let them on
                let floor = floors[floorNum];
                floor.on("up_button_pressed", function() {
                    if (elevator.direction == "up") {
                        elevator.goToFloor(floorNum, true);
                    };
                });
                
                floor.on("down_button_pressed", function() {
                    if (elevator.direction == "down") {
                        elevator.goToFloor(floorNum, true);
                    };
                });
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