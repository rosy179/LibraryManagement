package com.library_web.library.dto;

public class BorrowedBookRequest {
    private Long bookId;
    private String childBookId;

    // Getters và setters
    public Long getBookId() { return bookId; }
    public void setBookId(Long bookId) { this.bookId = bookId; }
    public String getChildBookId() { return childBookId; }
    public void setChildBookId(String childBookId) { this.childBookId = childBookId; }

    @Override
    public String toString() {
        return "BorrowedBookRequest{bookId=" + bookId + ", childBookId=" + childBookId + "}";
    }
}