import plotly.graph_objs as go
from plotly.offline import plot

def generate_line_chart(data, crypto_symbol):
    dates, prices = zip(*data)

    fig = go.Figure()
    fig.add_trace(go.Scatter(x=dates, y=prices, mode='lines+markers', name=f'{crypto_symbol.capitalize()} Price'))
    
    fig.update_layout(
        title=f"{crypto_symbol.capitalize()} Price Trend",
        xaxis_title="Date",
        yaxis_title="Price (USD)",
        template="plotly_dark"
    )

    return plot(fig, output_type='div')

def generate_bar_chart(data, crypto_symbol):
    dates, prices = zip(*data)

    fig = go.Figure()
    fig.add_trace(go.Bar(x=dates, y=prices, name=f'{crypto_symbol.capitalize()} Price'))

    fig.update_layout(
        title=f"{crypto_symbol.capitalize()} Price Comparison",
        xaxis_title="Date",
        yaxis_title="Price (USD)",
        template="plotly_dark"
    )

    return plot(fig, output_type='div')
