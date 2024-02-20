from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

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

'''
seasonal popularity
'''
@app.route('/seasonal_analysis', methods=['GET'])
def seasonal_analysis():
    # Load the sales data
    sales = pd.read_csv(r"public/uploads/updated_products.csv")

    # Define seasons based on months
    def get_season(month):
        if month in [11, 12, 1, 2]:  # Winter
            return 'Winter'
        elif month in [3, 4, 5]:  # Spring
            return 'Spring'
        elif month in [6, 7, 8, 9, 10]:  # Summer
            return 'Monsoon'

    # Preprocess the sales data
    sales['Date'] = pd.to_datetime(sales['Date'])
    sales['Month'] = sales['Date'].dt.month
    sales['Season'] = sales['Month'].apply(get_season)

    # Define weights for each metric
    weightsNew = {
        'Rating': 0.4,
        'Unit price': 0.2,
        'gross income': 0.1,
        'Quantity': 0.3
    }

    # Normalize the values for each metric
    for col in ['Rating', 'Unit price', 'gross income', 'Quantity']:
        min_val = sales[col].min()
        max_val = sales[col].max()
        sales[col] = (sales[col] - min_val) / (max_val - min_val)

    # Calculate the popularity score for each product line in each season
    sales['Popularity Score'] = (weightsNew['Rating'] * sales['Rating']) + \
                                (weightsNew['Unit price'] * sales['Unit price']) + \
                                (weightsNew['gross income'] * sales['gross income']) + \
                                (weightsNew['Quantity'] * sales['Quantity'])

    # Group by season and product line, and calculate the average popularity score
    seasonal_popularity = sales.groupby(['Season', 'Product line'])['Popularity Score'].mean().reset_index(name='Average Popularity Score')

    # Scale the 'Average Popularity Score' column to range from 0 to 1
    seasonal_popularity['Scaled Popularity Score'] = (seasonal_popularity['Average Popularity Score'] - seasonal_popularity['Average Popularity Score'].min()) / (seasonal_popularity['Average Popularity Score'].max() - seasonal_popularity['Average Popularity Score'].min())

    # Create a dictionary to store the result
    result = {}

    # Iterate over unique seasons
    for season in sales['Season'].unique():
        season_data = seasonal_popularity[seasonal_popularity['Season'] == season]
        popular_products = season_data.sort_values(by='Scaled Popularity Score', ascending=False)
        result[season] = popular_products.to_dict(orient='records')

    return jsonify(result)





if __name__ == '__main__':
    app.run(port = 5000, debug=True)
