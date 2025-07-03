package com.TheDevs.Hotel101.controller;

import com.TheDevs.Hotel101.model.Room;
import com.TheDevs.Hotel101.service.BookingService;
import com.TheDevs.Hotel101.service.RoomService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService, RoomService roomService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/bookings")
    public List<Room> getBookings(){
        return null;
    }
}
