package com.TheDevs.Hotel101.service;

import com.TheDevs.Hotel101.model.Room;
import com.TheDevs.Hotel101.repository.BookingRepository;
import com.TheDevs.Hotel101.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class BookingService {
    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;

    public BookingService(RoomRepository roomRepository, BookingRepository bookingRepository) {
        this.roomRepository = roomRepository;
        this.bookingRepository = bookingRepository;
    }

    public List<Room> getFilteredRooms(LocalDate checkInDate, LocalDate checkOutDate, int adults, int children) {
//        List<Room> availableRooms = roomRepository.getAvailableRooms();
//        availableRooms.stream().filter(room -> bookingRepository.isAvailableRoom(room.getId(), ))

        //TODO: Filtering the available rooms


//        return availableRooms.isEmpty() ? List.of() : availableRooms;


//        List<LocalDate> intervalDates = null;
//        List<Room> filteredRooms = new ArrayList<>();
//        for (int i = 0; i< availableRooms.size(); i++) {
//            Room room = availableRooms.get(i);
//            boolean roomIsBusy = false;
//            for (int j = 0; j < intervalDates.size(); j++) {
//                if (!bookingRepository.getAvailableRoom(room.getId(), intervalDates.get(j)).isEmpty()) {
//                    roomIsBusy = true;
//                    break;
//                }
//            }
//            if (!roomIsBusy && room.getMaxGuests() <= adults+children) {
//                filteredRooms.add(room);
//            }
//        }
        return null;
    }
}
