from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import requests
from dotenv import load_dotenv
import os
# from PIL import Image
import google.generativeai as genai

load_dotenv()

app = Flask(__name__)
CORS(app)


genai.configure(api_key=os.getenv("API_KEY"))

safety_settings = [
    {
        "category": "HARM_CATEGORY_DANGEROUS",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_NONE",
    },
]


def get_gemini_response(input, image, prompt):
    model = genai.GenerativeModel(
        'gemini-pro-vision', safety_settings=safety_settings)
    response = model.generate_content([input, image[0], prompt])
    return response.text


def input_image_setup(ipfs_link):
    response = requests.get(ipfs_link)
    if response.status_code == 200:
        bytes_data = response.content
        image_parts = [
            {
                "mime_type": "image/jpeg",
                "data": bytes_data
            }
        ]
        return image_parts
    else:
        raise FileNotFoundError("Failed to fetch image data from IPFS")



'''
all popularity
'''
@app.route('/calculate_popularity', methods=['GET'])
def calculate_popularity():
    sales = pd.read_csv(r"public/uploads/updated_products.csv")

    # Define weights for each factor
    weights = {
        'price': 0.1,
        'quantity': 0.2,
        'gross income': 0.1,
        'rating': 0.6
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

    return result_json


'''
main stats rating , gross income etc info
'''
@app.route('/calculate_product_stats', methods=['GET'])
def calculate_product_stats():
    sales = pd.read_csv(r"public/uploads/updated_products.csv")

    # Group by product line and calculate the statistics
    product_line_stats = sales.groupby('Product line').agg({
        'Rating': 'mean',
        'Unit price': 'mean',
        'Quantity': 'sum',
        'gross income': 'sum'
    }).reset_index()

    # Convert to JSON format
    result_json = product_line_stats.to_json(orient='records')

    return result_json

'''
seasonal popularity
'''
@app.route('/seasonal_analysis', methods=['GET'])
def seasonal_analysis():
    # Load the sales data
    sales = pd.read_csv(r"public/uploads/updated_products.csv")

    # Define seasons based on months
    def get_season(month):
        if month in [ 11, 12, 1]:  # Winter
            return 'Winter'
        elif month in [3, 4, 5, 6]:  # Spring
            return 'Summer'
        elif month in [7, 8, 9, 10, 2]:  # Summer
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
    seasonal_popularity['Scaled Popularity Score'] = (seasonal_popularity['Average Popularity Score'] - seasonal_popularity['Average Popularity Score'].min()) / (seasonal_popularity['Average Popularity Score'].max() - seasonal_popularity['Average Popularity Score'].min())*100

    # Create a dictionary to store the result
    result = {}

    # Iterate over unique seasons
    for season in sales['Season'].unique():
        season_data = seasonal_popularity[seasonal_popularity['Season'] == season]
        popular_products = season_data.sort_values(by='Scaled Popularity Score', ascending=False)
        result[season] = popular_products.to_dict(orient='records')

    return jsonify(result)

@app.route('/seasonal_product_stats', methods=['GET'])
def seasonal_product_stats():
    # Load the sales data
    sales = pd.read_csv(r"public/uploads/updated_products.csv")

    # Define seasons based on months
    def get_season(month):
        if month in [ 11, 12, 1]:  # Winter
            return 'Winter'
        elif month in [3, 4, 5, 6]:  # Spring
            return 'Summer'
        elif month in [7, 8, 9, 10, 2]:  # Summer
            return 'Monsoon'

    # Preprocess the sales data
    sales['Date'] = pd.to_datetime(sales['Date'])
    sales['Month'] = sales['Date'].dt.month
    sales['Season'] = sales['Month'].apply(get_season)

    # Group by season and product line, and calculate the statistics
    seasonal_product_stats = sales.groupby(['Season', 'Product line']).agg({
        'Rating': 'mean',
        'Unit price': 'mean',
        'Quantity': 'sum',
        'gross income': 'sum'
    }).reset_index()

    # Convert to JSON format
    result_json = seasonal_product_stats.to_json(orient='records')

    return result_json

@app.route('/shelfGuide/', methods=['POST'])
def generate_content():
    print(request.json)
    # input_prompt = request.json['input']
    # depts = request.json.get('depts', '')
    # image_data = input_image_setup(request.json['pinataIPFS'])
    data = request.json
    input_prompt = data.get(
        'input', 'Give all the wrong structures present or harmful product at top which may cause bad impression to user, and see which product should be where for better retail shelf optimization. Also suggest the shelf changes if you have any .Keep it to the point consise and dont divert it.')
    
    image = data.get(
        'pinataIPFS', '[{"key":"pinataIPFS","value":"https://ipfs.io/ipfs/QmWcwrMBCYEFUotUogeFVgYj5ACWE9GrLQ3r5a81Pjhu3x","description":"","type":"text","enabled":true}]')
    image_data = input_image_setup("https://ipfs.io/ipfs/" + image)

    # print(image_data)
    predefined_text = (
        'Give all the wrong structures present or harmful product at top which may cause bad impression to user, and see which product should be where for better retail shelf optimization. Also suggest the shelf changes if you have any .Keep it to the point consise and dont divert it.')

    try:
        response = get_gemini_response(
            input_prompt, image_data, predefined_text)
        print(response)

        # Assuming response is a string separated by semicolons
        parts = [part.strip() for part in response.split(';')]
        # Assuming the first part is deptSelected and the second part is keywords
        dept_selected = parts[0].replace("deptSelected:", "").strip()
        keywords = parts[1].replace("keywords:", "").strip()

        # Assuming the first part is deptSelected and the second part is keywords
        result = {"deptSelected": dept_selected, "keywords": keywords}

        return jsonify({"result": result})

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port = 5000, debug=True)