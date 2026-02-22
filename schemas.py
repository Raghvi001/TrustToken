"""
Pydantic schemas for the Trust Token FastAPI backend.
Defines the request and response structures for the real-time AI forensics claim verification system.
"""
from pydantic import BaseModel, Field
from typing import List

# Request Model: What the React frontend sends to the API
class ClaimRequest(BaseModel):
    claim: str = Field(
        ..., 
        description="The social media text, headline, or claim to be verified."
    )

# Sub-Model: Represents a single piece of evidence from a trusted source
class Evidence(BaseModel):
    source: str = Field(..., description="The name of the trusted source (e.g., PIB, News API)")
    summary: str = Field(..., description="A short summary of what the source says about the claim")
    url: str = Field(..., description="A clickable link to the source article or record")

# Response Model: What the API sends back to update the React Dashboard
class ClaimResponse(BaseModel):
    truth_score: int = Field(
        ..., 
        ge=0, le=100, 
        description="Truth score from 0 (Fabricated) to 100 (Authentic)"
    )
    panic_score: int = Field(
        ..., 
        ge=0, le=10, 
        description="Panic/Emotion index from 0 (Calm) to 10 (High Panic)"
    )
    bias_score: float = Field(
        ..., 
        ge=-1.0, le=1.0, 
        description="Political/Narrative bias score from -1.0 (Left) to +1.0 (Right)"
    )
    evidence_links: List[Evidence] = Field(
        ..., 
        description="List of cross-referenced evidence from trusted nodes"
    )
    hash: str = Field(
        ..., 
        description="Immutable SHA-256 hash of the RAG verification ledger"
    )