import requests
from datetime import datetime

def fetch_crypto_data(crypto_symbol):
    url = f"https://api.coingecko.com/api/v3/simple/price?ids={crypto_symbol}&vs_currencies=usd"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        return data.get(crypto_symbol, {}).get('usd', "Price not found")
    except requests.exceptions.RequestException as e:
        return f"Error fetching data: {e}"

def fetch_historical_data(crypto_symbol, days=7):
    url = f"https://api.coingecko.com/api/v3/coins/{crypto_symbol}/market_chart?vs_currency=usd&days={days}"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        prices = data.get("prices", [])
        return [(datetime.fromtimestamp(p[0] / 1000), p[1]) for p in prices]
    except requests.exceptions.RequestException as e:
        return f"Error fetching historical data: {e}"
