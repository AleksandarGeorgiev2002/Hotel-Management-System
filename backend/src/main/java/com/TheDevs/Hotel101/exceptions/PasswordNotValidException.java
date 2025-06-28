package com.TheDevs.Hotel101.exceptions;

public class PasswordNotValidException extends RuntimeException {
    public PasswordNotValidException() {
        super("Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one special character (!, @, #, $, %, ^, &, *).");
    }
}
