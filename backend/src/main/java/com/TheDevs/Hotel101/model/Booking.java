package com.TheDevs.Hotel101.model;

import com.TheDevs.Hotel101.enums.BookingStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    @NotNull(message = "Check-in date is required")
    private LocalDate checkInDate;

    @Column(nullable = false)
    @NotNull(message = "Check-out date is required")
    private LocalDate checkOutDate;
//
//    @Column(nullable = true)
//    private Integer numberOfAdults;
//
//    @Column(nullable = true)
//    private Integer numberOfChildren;
//
//    @Column(nullable = true)
//    private BigDecimal totalPrice;
//
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = true)
//    private BookingStatus status;
//
//    @Column(nullable = true, unique = true)
//    private String confirmationCode;
//
//    // New field for confirmation code expiry
//    @Column
//    private LocalDateTime confirmationCodeExpiresAt;
//
//    @Column(nullable = true)
//    private LocalDateTime createdAt;
//
//    @Column(nullable = true)
//    private LocalDateTime updatedAt;
//
//    @PrePersist
//    protected void onCreate() {
//        validateDates();
//        createdAt = LocalDateTime.now();
//        updatedAt = LocalDateTime.now();
//    }
//
//    @PreUpdate
//    protected void onUpdate() {
//        validateDates();
//        updatedAt = LocalDateTime.now();
//    }
//
//    protected void validateDates() {
//        if (checkInDate != null && checkOutDate != null) {
//            if (checkOutDate.isBefore(checkInDate)) {
//                throw new IllegalArgumentException("Check-out date cannot be before check-in date");
//            }
//            if (checkInDate.isBefore(LocalDate.now())) {
//                throw new IllegalArgumentException("Check-in date cannot be in the past");
//            }
//        }
//    }
//
//    // --- Constructors, Getters, and Setters will go here ---
//
//    public Booking() {
//    }
//
//    // Add getter and setter for confirmationCodeExpiresAt
//    public LocalDateTime getConfirmationCodeExpiresAt() {
//        return confirmationCodeExpiresAt;
//    }
//
//    public void setConfirmationCodeExpiresAt(LocalDateTime confirmationCodeExpiresAt) {
//        this.confirmationCodeExpiresAt = confirmationCodeExpiresAt;
//    }
//
    // (Other getters/setters as before)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Room getRoom() { return room; }
    public void setRoom(Room room) { this.room = room; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public LocalDate getCheckInDate() { return checkInDate; }
    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }
    public LocalDate getCheckOutDate() { return checkOutDate; }
    public void setCheckOutDate(LocalDate checkOutDate) { this.checkOutDate = checkOutDate; }
//    public Integer getNumberOfAdults() { return numberOfAdults; }
//    public void setNumberOfAdults(Integer numberOfAdults) { this.numberOfAdults = numberOfAdults; }
//    public Integer getNumberOfChildren() { return numberOfChildren; }
//    public void setNumberOfChildren(Integer numberOfChildren) { this.numberOfChildren = numberOfChildren; }
//    public BigDecimal getTotalPrice() { return totalPrice; }
//    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }
//    public BookingStatus getStatus() { return status; }
//    public void setStatus(BookingStatus status) { this.status = status; }
//    public String getConfirmationCode() { return confirmationCode; }
//    public void setConfirmationCode(String confirmationCode) { this.confirmationCode = confirmationCode; }
//    public LocalDateTime getCreatedAt() { return createdAt; }
//    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
//    public LocalDateTime getUpdatedAt() { return updatedAt; }
//    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}