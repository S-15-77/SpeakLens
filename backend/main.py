from fastapi import FastAPI
from backend.routes import asr_route
from backend.routes import summerizer_route
from fastapi.middleware.cors import CORSMiddleware

import sys
sys.path.append(".")

app = FastAPI()
app.include_router(asr_route.router)
app.include_router(summerizer_route.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or restrict to ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)