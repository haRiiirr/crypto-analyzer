import requests
import pandas as pd

def fetch_crypto_data(crypto_id="bitcoin", vs_currency="usd", days="30"):
    url = f"https://api.coingecko.com/api/v3/coins/{crypto_id}/market_chart"
    params = {"vs_currency": vs_currency, "days": days}
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        # Convert API response to a pandas DataFrame
        prices = pd.DataFrame(data["prices"], columns=["timestamp", "price"])
        prices["timestamp"] = pd.to_datetime(prices["timestamp"], unit="ms")
        return prices
    else:
        print("Error fetching data:", response.status_code)
        return None

