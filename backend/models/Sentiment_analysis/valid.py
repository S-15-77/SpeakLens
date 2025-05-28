# test.py
from sentiment_model import SentimentModel

model = SentimentModel()

examples = [
    "I'm really excited about this opportunity!",
    "This is the worst experience ever.",
    "Let's schedule the meeting for tomorrow."
]

for text in examples:
    print(f"{text} ➜ {model.predict(text)}")
