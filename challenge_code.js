{
    init: function(elevators, floors) {
        var elevator = elevators[0]; // Let's use the first elevator

        // Whenever the elevator is idle (has no more queued destinations) ...
        elevator.on("idle", function() {
            // when idle, go to center floor
            elevator.goToFloor(1);
        });
        
        // when floor button pressed, go to requested floor
        elevator.on("floor_button_pressed", function(floorNum) {
            elevator.goToFloor(floorNum)
        });
        
        // when floor requests an elevator, send elevator to that floor
        for (let f = 0; f < floors.length; f++) {
            let floor = floors[f];
            floor.on("up_button_pressed", function() {
                elevator.goToFloor(floor.floorNum());
            });
            floor.on("down_button_pressed", function() {
                elevator.goToFloor(floor.floorNum());
            });
        }
        
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
