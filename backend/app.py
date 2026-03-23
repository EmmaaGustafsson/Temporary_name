from fastapi import FastAPI

app = FastAPI()
books = []

@app.get("/")
def home():
    return {"message": "Homepage"}

@app.get("/test")
def test():
    return {"message": "Test page"}

@app.get("/hello")
def hello():
    return {"message": "Hello!!!"}

from fastapi import HTTPException

@app.get("/books/{book_id}")
def get_books(book_id: int):
    if 0 < book_id <= len(books):
        return books[book_id - 1]
    else:
        raise HTTPException(status_code=404, detail="Book not found")

from pydantic import BaseModel

class Book(BaseModel):
    title: str
    author: str


@app.post("/books")
def create_book(book: Book):
    books.append(book)
    return book

@app.delete("/books/{book_id}")
def delete_book(book_id: int):
    if 0 < book_id <= len(books):
        deleted_book = books.pop(book_id -1)
        return deleted_book
    else:
        raise HTTPException(status_code=404, detail="Book not found")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)