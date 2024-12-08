from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import re

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Database connection
def get_db_connection():
    try:
        db = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Aisa937!",  # Update with your MySQL password
            database="my_marketplace"
        )
        return db
    except Error as e:
        print(f"Error: {e}")
        return None

# Validate email format
def validate_email(email):
    return bool(re.match(r"[^@]+@[^@]+\.[^@]+", email))  # Basic email validation

# Route for customer registration (users table)
@app.route('/customer/register', methods=['POST'])
def customer_register():
    data = request.json
    email = data['email']
    password = data['password']

    if not validate_email(email):
        return jsonify({"error": "Invalid email format"}), 400

    # Get DB connection
    db = get_db_connection()
    if db is None:
        return jsonify({"error": "Database connection failed"}), 500
    
    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, password))
        db.commit()
        return jsonify({"message": "Customer registered successfully"}), 201
    except mysql.connector.errors.IntegrityError:
        return jsonify({"error": "User already exists with that email"}), 400
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
    finally:
        cursor.close()
        db.close()

# Route for store staff registration (store_staff table)
@app.route('/staff/register', methods=['POST'])
def staff_register():
    data = request.json
    email = data['email']
    password = data['password']

    if not validate_email(email):
        return jsonify({"error": "Invalid email format"}), 400

    # Get DB connection
    db = get_db_connection()
    if db is None:
        return jsonify({"error": "Database connection failed"}), 500
    
    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO store_staff (email, password) VALUES (%s, %s)", (email, password))
        db.commit()
        return jsonify({"message": "Store staff registered successfully"}), 201
    except mysql.connector.errors.IntegrityError:
        return jsonify({"error": "User already exists with that email"}), 400
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
    finally:
        cursor.close()
        db.close()

# Route for customer login (users table)
@app.route('/customer/login', methods=['POST'])
def customer_login():
    data = request.json
    email = data['email']
    password = data['password']

    # Get DB connection
    db = get_db_connection()
    if db is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = db.cursor()
    cursor.execute("SELECT password FROM users WHERE email = %s", (email,))
    result = cursor.fetchone()
    cursor.close()
    db.close()

    if result and result[0] == password:  # Direct password check (no hashing)
        return jsonify({"message": "Customer login successful"})
    return jsonify({"error": "Invalid credentials"}), 401

# Route for store staff login (store_staff table)
@app.route('/staff/login', methods=['POST'])
def staff_login():
    data = request.json
    email = data['email']
    password = data['password']

    # Get DB connection
    db = get_db_connection()
    if db is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = db.cursor()
    cursor.execute("SELECT password FROM store_staff WHERE email = %s", (email,))
    result = cursor.fetchone()
    cursor.close()
    db.close()

    if result and result[0] == password:  # Direct password check (no hashing)
        return jsonify({"message": "Store staff login successful"})
    return jsonify({"error": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)
