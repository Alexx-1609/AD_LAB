from flask import Flask, request, jsonify, render_template
import numpy as np
import pickle

app = Flask(__name__)

# Load model
lr_model = pickle.load(open("lr_model.pkl", "rb"))
scaler = pickle.load(open("scaler.pkl", "rb"))

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    days = int(data.get("days", 5))

    future_x = np.array(range(1000, 1000 + days)).reshape(-1, 1)
    preds = lr_model.predict(future_x)

    preds = scaler.inverse_transform(preds.reshape(-1,1)).flatten().tolist()

    return jsonify({"predictions": preds})

if __name__ == "__main__":
    app.run(debug=True)