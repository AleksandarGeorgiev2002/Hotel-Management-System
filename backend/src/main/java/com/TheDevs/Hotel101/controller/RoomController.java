package com.TheDevs.Hotel101.controller;

import com.TheDevs.Hotel101.dto.RoomResponse;
import com.TheDevs.Hotel101.model.Room;
import com.TheDevs.Hotel101.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping
    public ResponseEntity<List<Room>> getRooms() {
        return ResponseEntity.ok(roomService.getAvailableRooms());
    }

    @GetMapping("/filtered")
    public ResponseEntity<List<Room>> getFilteredRooms(
            @RequestParam LocalDate checkInDate,
            @RequestParam LocalDate checkOutDate,
            @RequestParam int adults,
            @RequestParam int children) {
        return ResponseEntity.ok(roomService.getFilteredRooms(checkInDate, checkOutDate, adults, children));
    }

    @DeleteMapping
    public ResponseEntity<String> deleteRooms() {
        roomService.deleteAllRooms();
        return ResponseEntity.ok("All rooms have been deleted successfully.");
    }

    @PostMapping
    public ResponseEntity<String> addRooms(@RequestBody List<RoomResponse> rooms) {
        roomService.addRooms(rooms);
        return ResponseEntity.ok("Rooms added successfully.");
    }
}
