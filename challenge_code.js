{
    init: function(elevators, floors) {
        
        function activateElevator(elevator) {
            elevator.on("idle", function() {
                //when idle, go to bottom floor
                //seems like most people come from bottom floor in my experience
                elevator.goToFloor(0);
            });

            elevator.on("floor_button_pressed", function(floorNum) {
                elevator.goToFloor(floorNum)
            });

            elevator.on("passing_floor", function(floorNum, direction) {
                // check to see if the floor we're passing has been selected
                let pressedFloors = elevator.getPressedFloors();
                if (pressedFloors.includes(floorNum)) {
                    elevator.goToFloor(floorNum, true);
                };

                // if elevator is nearly full, don't stop at passing floor
                if (elevator.loadFactor >= .8) return;
            
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

                // dedupe destinationQueue when passing
                let elevatorDestinations = elevator.destinationQueue;
                elevator.destinationQueue = elevatorDestinations.filter((item,index) => {
                    return elevatorDestinations.indexOf(item) == index;
                });
                elevator.checkDestinationQueue();
            });

            elevator.on("stopped_at_floor", function(floorNum) {
                // dedupe destinationQueue when stopped
                let elevatorDestinations = elevator.destinationQueue;
                elevator.destinationQueue = elevatorDestinations.filter((item,index) => {
                    return elevatorDestinations.indexOf(item) == index;
                });
                elevator.checkDestinationQueue();
            })
            
        };

        function receiveSignalsFromFloors(floor) {
            // when floor requests an elevator, send a random elevator to that floor
            let elevator = elevators[Math.floor(Math.random()*elevators.length)];
            floor.on("up_button_pressed down_button_pressed", function() {
                elevator.goToFloor(floor.floorNum());
            });
        }
        
        elevators.forEach(activateElevator);
        floors.forEach(receiveSignalsFromFloors);

    },
        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}