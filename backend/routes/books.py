from fastapi import APIRouter, HTTPException
from schemas.book_schema import Book
from database import SessionLocal
from models.book import Book as BookModel

router = APIRouter()

books = []

@router.get("/books")
def get_books():
    db = SessionLocal()
    books = db.query(BookModel).all()
    db.close()
    return books


@router.get("/books/{book_id}")
def get_book(book_id: int):
    db = SessionLocal()
    book = db.query(BookModel).filter(BookModel.id == book_id).first()
    db.close()

    if book:
        return book
    else:
        raise HTTPException(status_code=404, detail="Book not found")


@router.post("/books")
def create_book(book: Book):
    db = SessionLocal()

    new_book = BookModel(title=book.title, author=book.author)
    db.add(new_book)
    db.commit()
    db.refresh(new_book)

    db.close()
    return new_book


@router.put("/books/{book_id}")
def update_book(book_id: int, updated_book: Book):
    db = SessionLocal()
    book = db.query(BookModel).filter(BookModel.id == book_id).first()

    if book:
        book.title = updated_book.title
        book.author = updated_book.author
        db.commit()
        db.refresh(book)
        db.close()
        return book
    else:
        db.close()
        raise HTTPException(status_code=404, detail="Book not found")


@router.delete("/books/{book_id}")
def delete_book(book_id: int):
    db = SessionLocal()
    book = db.query(BookModel).filter(BookModel.id == book_id).first()

    if book:
        db.delete(book)
        db.commit()
        db.close()
        return {"message": "Book deleted"}
    else:
        db.close()
        raise HTTPException(status_code=404, detail="Book not found")