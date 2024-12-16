from flask import Flask, jsonify, render_template
import requests

app = Flask(__name__)

# Route to serve the main HTML page
@app.route('/')
def index():
    return render_template('index.html')

# API route to fetch real-time cryptocurrency data
@app.route('/api/crypto', methods=['GET'])
def fetch_crypto():
    try:
        # Fetch real-time Bitcoin price data from CoinDesk API
        response = requests.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        data = response.json()

        # Extract the time and current Bitcoin price in USD
        current_time = data['time']['updated']
        current_price = data['bpi']['USD']['rate_float']

        # Return the data as JSON
        return jsonify({
            'time': current_time,
            'price': current_price
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
