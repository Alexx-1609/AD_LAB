import yfinance as yf
import pandas as pd
import numpy as np
import pickle

from sklearn.preprocessing import MinMaxScaler
from sklearn.linear_model import LinearRegression

# Fetch data
df = yf.download("AAPL", start="2020-01-01", end="2024-01-01")
df = df[['Close']]
df.dropna(inplace=True)

# Scaling
scaler = MinMaxScaler()
scaled_data = scaler.fit_transform(df)

# Train-test split
train_size = int(len(scaled_data)*0.8)
train_data = scaled_data[:train_size]

# Linear Regression
X_train = np.array(range(len(train_data))).reshape(-1,1)
y_train = train_data.flatten()

lr_model = LinearRegression()
lr_model.fit(X_train, y_train)

# Save models
pickle.dump(lr_model, open("lr_model.pkl","wb"))
pickle.dump(scaler, open("scaler.pkl","wb"))

print(" Model saved")