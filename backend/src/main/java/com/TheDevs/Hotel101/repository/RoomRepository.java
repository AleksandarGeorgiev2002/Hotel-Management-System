package com.TheDevs.Hotel101.repository;

import com.TheDevs.Hotel101.enums.RoomStatus;
import com.TheDevs.Hotel101.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;
@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findByStatus(RoomStatus status);

    List<Room> findAllByStatus(RoomStatus status);
}
