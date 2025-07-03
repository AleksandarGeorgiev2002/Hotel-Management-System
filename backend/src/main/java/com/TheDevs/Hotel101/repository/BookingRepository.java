package com.TheDevs.Hotel101.repository;

import com.TheDevs.Hotel101.enums.BookingStatus;
//import com.TheDevs.Hotel101.model.Booking;
import com.TheDevs.Hotel101.model.Booking;
import com.TheDevs.Hotel101.model.Room;
import jakarta.persistence.NamedQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("SELECT u.id " +
            "FROM Booking b " +
            "INNER JOIN b.user u " +
            "INNER JOIN b.room r " +
            "WHERE r.id = :roomIdRequested " +
            "AND :dateRequested BETWEEN b.checkInDate AND b.checkOutDate"
    )
    List<Room> getAvailableRoom(
            @Param("roomIdRequested") Long roomIdRequested,
            @Param("dateRequested") LocalDate dateRequested
//            @Param("blockingStatuses") List<BookingStatus> blockingStatuses
    );

    @Query("SELECT b.room.id FROM Booking b " +
            "WHERE NOT (:requestedCheckInDate > b.checkOutDate " +
            "OR :requestedCheckOutDate < b.checkInDate)")
    List<Long> findBookedRoomIds(@Param("requestedCheckInDate") LocalDate requestedCheckInDate,
                                @Param("requestedCheckOutDate") LocalDate requestedCheckOutDate);



//
////SELECT *
////FROM bookings b
////inner join users u on b.user_id = u.id
////inner join rooms r on b.room_id = r.id
////where r.room_number = 101
////and date('2025-07-17') between b.from_date and b.to_date
}
