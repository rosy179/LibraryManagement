package com.library_web.library.dto;

import com.library_web.library.dto.BorrowedBookRequest;
import java.util.List;

public class BorrowCardRequest {
    private Long userId;
    private List<BorrowedBookRequest> borrowedBooks;
    private String borrowDate;
    private String status;
    private String dueDate;

    // Getters và setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public List<BorrowedBookRequest> getBorrowedBooks() { return borrowedBooks; }
    public void setBorrowedBooks(List<BorrowedBookRequest> borrowedBooks) { this.borrowedBooks = borrowedBooks; }
    public String getBorrowDate() { return borrowDate; }
    public void setBorrowDate(String borrowDate) { this.borrowDate = borrowDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getDueDate() { return dueDate; }
    public void setDueDate(String dueDate) { this.dueDate = dueDate; }

    @Override
    public String toString() {
        return "BorrowCardRequest{userId=" + userId + ", borrowedBooks=" + borrowedBooks + "}";
    }
}