from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.preprocessing import MinMaxScaler

app = Flask(__name__)
CORS(app)


'''
all popularity
'''
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
    # Sort the scaled scores dataframe
    sorted_scores = scaled_scores.reset_index().sort_values(by='Popularity Score', ascending=False)

    # Convert to JSON format
    result_json = sorted_scores.to_json(orient='records')

    return jsonify(result_json)


'''
main stats rating , gross income etc info
'''
@app.route('/calculate_product_stats', methods=['GET'])
def calculate_product_stats():
    sales = pd.read_csv("sales_data.csv")

    # Group by product line and calculate the statistics
    product_line_stats = sales.groupby('Product line').agg({
        'Rating': 'mean',
        'Unit price': 'mean',
        'Quantity': 'sum',
        'gross income': 'sum'
    }).reset_index()

    # Convert to JSON format
    result_json = product_line_stats.to_json(orient='records')

    return jsonify(result_json)
 








if __name__ == '__main__':
    app.run(port = 5000, debug=True)
