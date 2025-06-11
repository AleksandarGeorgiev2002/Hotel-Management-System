package com.TheDevs.Hotel101.dto;

import com.TheDevs.Hotel101.enums.RoomStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class RoomRequest {
    private Long roomNumber;
    private RoomStatus status;
    private String type;
    private BigDecimal pricePerNight;
    private Integer maxGuests;
    private Integer bedCount;
    private String description;
    private String image_URL;
    private LocalDateTime lastCleanedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
