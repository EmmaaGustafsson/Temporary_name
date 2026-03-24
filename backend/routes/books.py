from fastapi import APIRouter, HTTPException
from schemas.book_schema import Book

router = APIRouter()

books = []

@router.get("/books")
def get_books():
    return books


@router.get("/books/{book_id}")
def get_book(book_id: int):
    if 0 < book_id <= len(books):
        return books[book_id - 1]
    else:
        raise HTTPException(status_code=404, detail="Book not found")


@router.post("/books")
def create_book(book: Book):
    books.append(book)
    return book


@router.put("/books/{book_id}")
def update_book(book_id: int, updated_book: Book):
    if 0 < book_id <= len(books):
        books[book_id - 1] = updated_book
        return updated_book
    else:
        raise HTTPException(status_code=404, detail="Book not found")


@router.delete("/books/{book_id}")
def delete_book(book_id: int):
    if 0 < book_id <= len(books):
        return books.pop(book_id - 1)
    else:
        raise HTTPException(status_code=404, detail="Book not found")