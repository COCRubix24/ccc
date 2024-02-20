from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/calculate_popularity', methods=['GET'])
def calculate_popularity():
    sales = pd.read_csv(r"public/uploads/updated_products.csv")

    # Define weights for each factor
    weights = {
        'price': 0.2,
        'quantity': 0.3,
        'gross income': 0.1,
        'rating': 0.4
    }

    # Normalize values
    sales['Unit price'] = sales['Unit price'] / sales['Unit price'].max()
    sales['Quantity'] = sales['Quantity'] / sales['Quantity'].max()
    sales['gross income'] = sales['gross income'] / sales['gross income'].max()
    sales['Rating'] = sales['Rating'] / sales['Rating'].max()

    # Calculate popularity score
    sales['Popularity Score'] = (weights['price'] * sales['Unit price']) + \
                                (weights['quantity'] * sales['Quantity']) + \
                                (weights['gross income'] * sales['gross income']) + \
                                (weights['rating'] * sales['Rating'])

    # Group by 'Product line' and calculate unique popularity score for each product
    grouped_products = sales.groupby('Product line')['Popularity Score'].mean()

    # Min-Max scaling
    min_score = grouped_products.min()
    max_score = grouped_products.max()
    scaled_scores = (grouped_products - min_score) / (max_score - min_score) * 100

    # Convert to JSON format
    result_json = scaled_scores.reset_index().to_json(orient='records')

    return jsonify(result_json)

if __name__ == '__main__':
    app.run(port = 5000, debug=True)
