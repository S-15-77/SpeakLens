# train.py
from datasets import load_dataset
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from imblearn.over_sampling import SMOTE
import joblib
import pandas as pd
from sa_utils import label_map

# Load dataset
dataset = load_dataset("daily_dialog",trust_remote_code=True)
print(dataset.column_names)
texts, labels = [], []
for dialog, emotions in zip(dataset["train"]["dialog"], dataset["train"]["emotion"]):
    for utt, label in zip(dialog, emotions):
        if label != -1:
            texts.append(utt)
            labels.append(label_map[label])

# Vectorize
vectorizer = TfidfVectorizer(max_features=5000)
X = vectorizer.fit_transform(texts)
y = labels

smote =  SMOTE()
X, y = smote.fit_resample(X, y)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

print(classification_report(y_test, model.predict(X_test)))

joblib.dump(model, r"save_model\ssentiment_model.pkl")
joblib.dump(vectorizer, r"save_model\sentiment_vectorizer.pkl")
