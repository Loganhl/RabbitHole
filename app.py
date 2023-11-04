from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/submit', methods=['POST'])
def submit_data():
    # Parse data from request
    user_id = request.json.get('user_id')
    text_data = request.json.get('text_data')

    # You can now use user_id and text_data as needed
    # For example, print them to the console
    print(f"Received data from user {user_id}: {text_data}")

    # Do something with the data (store to database, process, etc.)

    # Respond with success message
    return jsonify({"status": "success", "message": "Data received successfully."})

if __name__ == '__main__':
    app.run(host='localhost', port=5000)