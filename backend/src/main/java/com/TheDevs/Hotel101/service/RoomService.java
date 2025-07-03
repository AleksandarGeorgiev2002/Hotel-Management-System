package com.TheDevs.Hotel101.service;

import com.TheDevs.Hotel101.dto.RoomResponse;
import com.TheDevs.Hotel101.enums.RoomStatus;
import com.TheDevs.Hotel101.model.Room;
import com.TheDevs.Hotel101.repository.BookingRepository;
import com.TheDevs.Hotel101.repository.RoomRepository;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;

    public RoomService(RoomRepository roomRepository, BookingRepository bookingRepository) {
        this.roomRepository = roomRepository;
        this.bookingRepository = bookingRepository;
    }

    public List<Room> getAvailableRooms() {
        List<Room> availableRooms = roomRepository.findAllByStatus(RoomStatus.AVAILABLE);
        return availableRooms.isEmpty() ? List.of() : availableRooms;
    }

    public List<Room> getFilteredRooms(LocalDate checkIn, LocalDate checkOut, int adults, int children){
        List<Room> availableRooms = getAvailableRooms();

        List<Long> bookedRoomIds = bookingRepository.findBookedRoomIds(checkIn, checkOut);

        int totalGuests = adults + children;

        return availableRooms.stream()
                .filter(room -> !bookedRoomIds.contains(room.getId()))
                .filter(room -> room.getMaxGuests() >= totalGuests)
                .toList();
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }


    public Optional<Room> findRoomByStatus() {
        return roomRepository.findByStatus(RoomStatus.AVAILABLE);
    }

    public void deleteAllRooms() {
        roomRepository.deleteAll();
    }

    public void addRooms(List<RoomResponse> roomResponses) {
        List<Room> rooms = roomResponses.stream().map(roomResponse -> {
            Room room = new Room();
            room.setRoomNumber(roomResponse.getRoomNumber());
            room.setType(roomResponse.getType());
            room.setPricePerNight(roomResponse.getPricePerNight());
            room.setMaxGuests(roomResponse.getMaxGuests());
            room.setBedCount(roomResponse.getBedCount());
            room.setDescription(roomResponse.getDescription());
            room.setImage_URL(roomResponse.getImage_URL());
            room.setStatus(RoomStatus.AVAILABLE); // Default status
            room.setLastCleanedAt(LocalDateTime.now());
            room.setCreatedAt(LocalDateTime.now());
            room.setUpdatedAt(LocalDateTime.now());
            return room;
        }).toList();
        roomRepository.saveAll(rooms);
    }

//    public Room updateRoomStatus(Long roomId, RoomStatus status, String userRole) throws UnauthorizedAccessException {
//        if ("Admin".equalsIgnoreCase(userRole)){
//            Room room = roomRepository.findById(roomId)
//                    .orElseThrow(()-> new IllegalArgumentException("Room with ID: " + roomId + " not found"));
//            room.setStatus(status);
//            room.setUpdatedAt(LocalDateTime.now());
//            return roomRepository.save(room);
//        }
//        return
//    }
}
