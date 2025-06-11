package com.TheDevs.Hotel101.dto;

import java.math.BigDecimal;


public class RoomResponse {
    private Long roomNumber;
    private String type;
    private BigDecimal pricePerNight;
    private Integer maxGuests;
    private Integer bedCount;
    private String description;
    private String image_URL;

    public Long getRoomNumber() {
        return roomNumber;
    }

    public String getType() {
        return type;
    }

    public BigDecimal getPricePerNight() {
        return pricePerNight;
    }

    public Integer getMaxGuests() {
        return maxGuests;
    }

    public Integer getBedCount() {
        return bedCount;
    }

    public String getDescription() {
        return description;
    }

    public String getImage_URL() {
        return image_URL;
    }

    // Setters
    public void setRoomNumber(Long roomNumber) {
        this.roomNumber = roomNumber;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setPricePerNight(BigDecimal pricePerNight) {
        this.pricePerNight = pricePerNight;
    }

    public void setMaxGuests(Integer maxGuests) {
        this.maxGuests = maxGuests;
    }

    public void setBedCount(Integer bedCount) {
        this.bedCount = bedCount;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setImage_URL(String image_URL) {
        this.image_URL = image_URL;
    }
}
