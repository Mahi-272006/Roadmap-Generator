import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from google.genai import Client
from dotenv import load_dotenv
import json


load_dotenv()

app = Flask(__name__)
CORS(app)

client = Client(api_key=os.getenv("GEMINI_API_KEY"))

@app.route("/generate-roadmap", methods=["POST"])
def generate_roadmap():
    data = request.json
    goal = data.get("goal")
    skills = data.get("skills", [])

    prompt = f"""
    I have a user who wants to become a {goal} and already knows {', '.join(skills)}.
    Generate a step-by-step learning roadmap.
    For each skill, include:
    - skill (name)
    - YouTube video or playlist link
    - Documentation link
    - Paid course link
    - Free course link
    Return the roadmap as a JSON array.
    """

    # Updated Gemini API call
    response = client.chat.completions.create(
        model="gemini-2.5",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    
    # Get AI text
    ai_text = response.output_text
    try:
        roadmap_json = json.loads(response.choices[0].message['content'])
    except:
        roadmap_json = []

    return jsonify({"roadmap": ai_text})

if __name__ == "__main__":
    app.run(debug=True)
