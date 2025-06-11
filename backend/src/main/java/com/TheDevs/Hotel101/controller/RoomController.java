package com.TheDevs.Hotel101.controller;

import com.TheDevs.Hotel101.dto.RoomResponse;

import com.TheDevs.Hotel101.model.Room;
import com.TheDevs.Hotel101.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping("/rooms")
    public List<Room> getRooms() {
//        if (userRole.equalsIgnoreCase("Guest")) {
        return roomService.getAvailableRooms();
//        } else {
//            return roomService.getAllRooms();
//        }
    }

//    @PatchMapping("/rooms/{roomId}/status")
//    public Room updateRoomStatus(@PathVariable Long roomId, @RequestParam RoomStatus status, @RequestParam String userRole) {
//        if (!"Admin".equalsIgnoreCase(userRole)) {
//            throw new UnauthorizedAccessException("Only Admin users can update room status.");
//        }
//        return roomService.updateRoomStatus(roomId, status);

//        } else {
//            return roomService.getAllRooms();
//        }

    @DeleteMapping("/rooms")
    public ResponseEntity<String> deleteRooms() {
//        if ("Guest".equalsIgnoreCase(userRole)) {
//            return roomService.getAvailableRooms();
//        }
        roomService.deleteAllRooms();
        return ResponseEntity.ok("All rooms have been deleted successfully.");
    }

    @PostMapping("/rooms")
    public ResponseEntity<String> addRooms(@RequestBody List<RoomResponse> rooms) {
        roomService.addRooms(rooms);
        return ResponseEntity.ok("Rooms added successfully.");
    }


}
