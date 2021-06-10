{
    init: function(elevators, floors) {
        var elevator = elevators[0]; // Let's use the first elevator

        // Whenever the elevator is idle (has no more queued destinations) ...
        elevator.on("idle", function() {
            /*
            when idle, go to bottom floor
            seems like most people come from bottom floor in my experience
            */
            elevator.goToFloor(0);
        });
        
        // when floor button pressed, add floor to destination queue
        elevator.on("floor_button_pressed", function(floorNum) {
            elevator.goToFloor(floorNum, true);
            elevator.destinationQueue = elevator.destinationQueue.sort(); 
            elevator.checkDestinationQueue(); 
        });
         
        // when floor requests an elevator, send elevator to that floor
        for (var f = 0; f < floors.length; f++) {
            var floor = floors[f];
            floor.on("up_button_pressed down_button_pressed", function() {
                elevator.goToFloor(floor.floorNum());
            });
        };
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
