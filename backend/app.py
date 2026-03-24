from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import books

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tillåter alla (bra för utveckling)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(books.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)