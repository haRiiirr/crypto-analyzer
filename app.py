from flask import Flask, render_template, request
from data_fetcher import fetch_crypto_data, fetch_historical_data
from visualizer import generate_line_chart, generate_bar_chart

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():
    price = None
    error = None
    line_chart = None
    bar_chart = None

    if request.method == "POST":
        crypto_symbol = request.form.get("crypto_symbol").lower()
        price = fetch_crypto_data(crypto_symbol)
        
        if isinstance(price, str) and "Error" in price:
            error = price
        else:
            historical_data = fetch_historical_data(crypto_symbol, days=7)
            if isinstance(historical_data, str) and "Error" in historical_data:
                error = historical_data
            else:
                line_chart = generate_line_chart(historical_data, crypto_symbol)
                bar_chart = generate_bar_chart(historical_data, crypto_symbol)

    return render_template("index.html", price=price, error=error, line_chart=line_chart, bar_chart=bar_chart)

if __name__ == "__main__":
    app.run(debug=True)
