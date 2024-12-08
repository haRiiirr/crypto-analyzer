import matplotlib.pyplot as plt

def plot_price_trends(prices, crypto_name="Bitcoin"):
    plt.figure(figsize=(10, 6))
    plt.plot(prices["timestamp"], prices["price"], label=f"{crypto_name} Price")
    plt.title(f"{crypto_name} Price Trends")
    plt.xlabel("Date")
    plt.ylabel("Price (USD)")
    plt.legend()
    plt.grid()
    # Save the plot as an image in the static folder
    plt.savefig("static/price_trends.png")
    plt.close()
