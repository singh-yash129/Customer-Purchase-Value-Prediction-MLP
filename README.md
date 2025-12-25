# Customer Purchase Value Prediction using MLP

## 📌 Project Overview
This project predicts the **purchase value (total spend)** of user sessions on a large-scale **digital commerce platform** using a **Multi-Layer Perceptron (MLP)** regression model. The model captures non-linear relationships in high-dimensional session data to identify high-value customers and optimize business decisions.

---

## 🎯 Objective
- Predict **purchaseValue** (continuous regression target)
- Handle **zero-inflated session data**
- Capture complex feature interactions using deep learning

**Evaluation Metric:**  
- **R² Score (Coefficient of Determination)**

---

## 📂 Dataset Description
The dataset contains **session-level logs** with mixed feature types:
- Numerical
- Categorical
- High-cardinality attributes
- Time-based features

### Feature Categories

| Category | Key Features | Impact |
|--------|-------------|--------|
| **User Behavior** | `totalHits`, `pageViews`, `bounces`, `newVisits`, `sessionStart` | High |
| **Technical** | `deviceType`, `browser`, `OS`, `isMobile`, `language` | Medium |
| **Traffic Source** | `trafficSource.medium`, `source`, `campaign`, `gclIdPresent` | High |
| **Geography** | `city`, `country`, `continent` | Low–Medium |

---

## 🔧 Data Preprocessing
1. **Zero Handling**  
   - Missing or NaN `purchaseValue` values are replaced with `0`

2. **Categorical Encoding**  
   - Low-cardinality features → One-Hot Encoding  
   - High-cardinality features → Frequency Encoding / Embeddings

3. **Feature Scaling**  
   - Numerical features scaled using `StandardScaler` or `MinMaxScaler`

4. **Date-Time Feature Extraction**  
   - Extracted **Hour of Day** and **Day of Week** from `sessionStart`

---

## 🧠 Model Architecture (MLP)
- **Input Layer:** Processed feature vector  
- **Hidden Layers:** Fully connected layers with **ReLU** activation  
- **Output Layer:** Single neuron with **Linear** activation (regression)

---

## 🔍 Post-Processing Logic
```python
predictions[predictions < 0] = 0Negative predictions are clamped to zero to respect real-world constraints and improve model performance.

---

## ⚠️ Challenges & Observations
- Highly zero-inflated target variable  
- Model performs both purchase classification and value regression  
- Potential data leakage from session-end features  
- R² sensitivity to high-spending outliers  

---

## ✅ Conclusion
The MLP model effectively predicts session-level revenue using behavioral and traffic data.  
Key predictors include **user engagement metrics** and **traffic source**.

---

## 🚀 Future Improvements
- Hurdle models (purchase probability + purchase amount)  
- Sequential models (LSTM / Transformer)  
- Real-time feature engineering constraints  

---

## 🛠️ Tech Stack
- Python  
- Pandas, NumPy  
- Scikit-learn  
- TensorFlow / Keras  

---

## 📄 Project Files
- `customer-purchase-prediction-mlp.ipynb`  
- `customer-purchase-prediction-mlp.pdf`  
- `README.md`


