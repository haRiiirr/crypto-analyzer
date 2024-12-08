from flask import Flask, render_template
from data_fetcher import fetch_crypto_data
from visualizer import plot_price_trends

app = Flask(__name__)

@app.route("/")
def home():
    # Fetch data
    crypto_data = fetch_crypto_data()
    if crypto_data is not None:
        # Generate and save the plot
        plot_price_trends(crypto_data)
        return render_template("index.html", img_url="static/price_trends.png")
    return "Error fetching data!"

if __name__ == "__main__":
    app.run(debug=True)
