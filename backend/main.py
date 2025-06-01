from fastapi import FastAPI
from backend.routes import asr_route, summerizer_route, qa_route, sentiment_route
from fastapi.middleware.cors import CORSMiddleware

import sys
sys.path.append(".")

app = FastAPI()
app.include_router(asr_route.router)
app.include_router(summerizer_route.router)
app.include_router(qa_route.router)
app.include_router(sentiment_route.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)