package com.TheDevs.Hotel101.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, String> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("user", ex.getMessage());
        return errorResponse;
    }

    @ExceptionHandler(EmailNotValidException.class)
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    public Map<String, String> EmailNotValidException(EmailNotValidException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("email", ex.getMessage());
        return errorResponse;
    }

    @ExceptionHandler(PasswordNotValidException.class)
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    public Map<String, String> passwordNotValidException(PasswordNotValidException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("password", ex.getMessage());
        return errorResponse;
    }
}
