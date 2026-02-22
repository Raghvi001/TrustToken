from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import requests
import uuid
import hashlib
import json

# ---------- SCHEMAS ----------
class ClaimRequest(BaseModel):
    claim: str

class Evidence(BaseModel):
    source: str
    summary: str
    url: str

class ClaimResponse(BaseModel):
    truth_score: int
    panic_score: int
    bias_score: float
    evidence_links: List[Evidence]
    hash: str

# ---------- LANGFLOW CONFIG ----------
LANGFLOW_URL = "http://localhost:7860/api/v1/run/32da8a5e-8cb9-4046-8356-1f4063d44356"
API_KEY = "sk-kbZTTmv2V83Y1HJVr065TJz7T0RWfIWsAIO65s06kOc"

app = FastAPI(title="Trust Token API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "Server running"}

@app.post("/verify-claim", response_model=ClaimResponse)
def verify_claim(request: ClaimRequest):

    truth_score = 50
    panic_score = 5
    bias_score = 0.0
    ai_summary = "AI could not verify claim"

    payload = {
        "output_type": "chat",
        "input_type": "chat",
        "input_value": request.claim,
        "session_id": str(uuid.uuid4())
    }

    headers = {
        "x-api-key": API_KEY
    }

    try:
        print("\n🚀 Sending claim to Langflow:")
        print(request.claim)

        response = requests.post(
            LANGFLOW_URL,
            json=payload,
            headers=headers,
            timeout=60
        )

        print("\n📡 Langflow Status Code:")
        print(response.status_code)

        if response.status_code != 200:
            print("❌ Langflow did not respond correctly")
            print(response.text)

            return ClaimResponse(
                truth_score=50,
                panic_score=5,
                bias_score=0.0,
                evidence_links=[
                    Evidence(
                        source="Langflow Error",
                        summary="Langflow did not return 200",
                        url="http://localhost:7860"
                    )
                ],
                hash="error"
            )

        result = response.json()

        print("\n📦 FULL LANGFLOW RESPONSE:")
        print(result)

        # -------- AGENT FLOW OUTPUT PATH --------
        try:
            raw_output = result["outputs"][0]["outputs"][0]["results"]["message"]["text"]
            print("\n🧠 RAW LLM OUTPUT:")
            print(raw_output)
            print("TYPE:", type(raw_output))
        except Exception as e:
            print("\n❌ LLM OUTPUT NOT FOUND!")
            print("Structure Error:", e)

            return ClaimResponse(
                truth_score=50,
                panic_score=5,
                bias_score=0.0,
                evidence_links=[
                    Evidence(
                        source="Langflow Error",
                        summary="LLM Output Missing",
                        url="http://localhost:7860"
                    )
                ],
                hash="error"
            )

        # -------- TRY JSON PARSE --------
        if isinstance(raw_output, str):
            print("\n📄 Output is STRING")

            try:
                parsed = json.loads(raw_output)
                print("✅ Valid JSON received from LLM")
            except Exception as e:
                print("❌ NOT JSON! LLM returned plain text")
                print("Parsing Error:", e)
                print("LLM Output was:")
                print(raw_output)
                parsed = {}

        elif isinstance(raw_output, dict):
            print("✅ Output is already DICTIONARY")
            parsed = raw_output
        else:
            print("❌ Unknown LLM Output Type")
            parsed = {}

        print("\n🔍 FINAL PARSED OUTPUT:")
        print(parsed)

        truth_score = int(parsed.get("truth_score", 50))
        panic_score = int(parsed.get("panic_score", 5))
        bias_score = float(parsed.get("bias_score", 0.0))
        ai_summary = parsed.get("summary", "No summary")

    except Exception as e:
        print("\n🔥 LANGFLOW CONNECTION ERROR:")
        print(e)

    hash_input = f"{request.claim}{truth_score}{panic_score}"
    verification_hash = hashlib.sha256(hash_input.encode('utf-8')).hexdigest()

    dummy_evidence = [
        Evidence(
            source="Langflow AI",
            summary=ai_summary,
            url="http://localhost:7860"
        )
    ]

    return ClaimResponse(
        truth_score=truth_score,
        panic_score=panic_score,
        bias_score=bias_score,
        evidence_links=dummy_evidence,
        hash=verification_hash
    )