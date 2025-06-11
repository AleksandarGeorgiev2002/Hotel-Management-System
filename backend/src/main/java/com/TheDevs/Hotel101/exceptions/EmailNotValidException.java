package com.TheDevs.Hotel101.exceptions;

public class EmailNotValidException extends RuntimeException{
    public EmailNotValidException() {
        super("Email is not valid!");
    }
}
