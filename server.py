from flask import Flask, request, jsonify
import openai

openai.api_key = "..."

app = Flask(__name__)

@app.route('/api/explanation', methods=['POST'])
def get_explanation():
    data = request.json
    code_snippet = data.get('code', '')

    if not code_snippet:
        return jsonify({"error": "No code snippet provided"}), 400

    try:
        response = openai.Completion.create(
            engine="gpt-4",
            prompt=f"Explain the following code in detail:\n\n{code_snippet}",
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.7
        )
        explanation = response.choices[0].text.strip()
        return jsonify({"explanation": explanation})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
