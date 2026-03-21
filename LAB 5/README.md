## sentiment_lab.ipynb
    import sys
    print(sys.version)

    import sys
    print("Python version:", sys.version)
    print("\nChecking all required packages:\n")
    packages = {
    'fastapi': 'FastAPI',
    'tweepy': 'Tweepy',
    'textblob': 'TextBlob',
    'sklearn': 'scikit-learn',
    'pandas': 'pandas',
    'uvicorn': 'uvicorn',
    'jupyter': 'Jupyter'
    }
    for module, name in packages.items():
    try:
        mod = __import__(module)
        version = getattr(mod, '__version__', 'installed')
        print(f"{name}: {version}")
    except ImportError:
        print(f"{name}: NOT installed")
    from textblob import TextBlob

    def analyze_sentiment(text):
    try:
        # Step 1: Create TextBlob object (NLP preprocessing happens here)
        blob = TextBlob(text)

        # Step 2: Extract polarity score
        # TextBlob uses pre-trained sentiment analyzer
        polarity = blob.sentiment.polarity

        # Step 3: Categorize based on polarity threshold
        if polarity > 0.1:
            sentiment_category = "Positive"
        elif polarity < -0.1:
            sentiment_category = "Negative"
        else:
            sentiment_category = "Neutral"

        # Step 4: Return structured result
        return {
            "text": text,
            "polarity": round(polarity, 4),
            "sentiment": sentiment_category
        }

    except Exception as e:
        # Handle errors gracefully
        return {
            "text": text,
            "error": str(e)
        }

    print("✓ Sentiment analysis function created")

    # Test with diverse examples
    test_texts = [
    "I love this!",      # Should be Positive
    "This is awful",     # Should be Negative
    "The sky is blue"    # Should be Neutral
    ]

    print("\nTesting sentiment analysis:\n")

    for text in test_texts:
    result = analyze_sentiment(text)
    print(f"Text: '{result['text']}'")
    print(f" Polarity: {result['polarity']}")
    print(f" Sentiment: {result['sentiment']}")
    print()

    import pandas as pd

    sample_tweets = [
    {"text": "I absolutely love this new product! It's amazing!", "author": "user1"},
    {"text": "This is terrible. Worst experience ever.", "author": "user2"},
    {"text": "The weather is nice today.", "author": "user3"},
    {"text": "I'm so happy with my purchase! Highly recommend!", "author": "user4"},
    {"text": "This app keeps crashing. Very disappointed.", "author": "user5"},
    {"text": "Just had the best coffee of my life!", "author": "user6"},
    {"text": "The service was slow and food was cold.", "author": "user7"},
    {"text": "Learning Python is fun and rewarding.", "author": "user8"},
    {"text": "I hate waiting in long queues.", "author": "user9"},
    {"text": "The sunset today was beautiful.", "author": "user10"},
    {"text": "This movie is absolutely brilliant!", "author": "user11"},
    {"text": "I'm frustrated with the lack of updates.", "author": "user12"},
    ]

    tweets_df = pd.DataFrame(sample_tweets)

    print("✓ Sample tweets dataset created")
    print(f"Total tweets: {len(tweets_df)}")
    print("\nSample data:")
    print(tweets_df.head())

    sentiment_results = []   # IMPORTANT: initialize empty list

    for idx, row in tweets_df.iterrows():
    sentiment_data = analyze_sentiment(row['text'])
    sentiment_data['author'] = row['author']
    sentiment_results.append(sentiment_data)

    results_df = pd.DataFrame(sentiment_results)

    print("Sentiment analysis completed")
    print(f"Total tweets analyzed: {len(results_df)}\n")

    # Summary
    sentiment_counts = results_df['sentiment'].value_counts()

    print("Sentiment Distribution:")
    for sentiment, count in sentiment_counts.items():
    percentage = (count / len(results_df)) * 100
    print(f" {sentiment}: {count} ({percentage:.1f}%)")

    print(f"\nAverage Polarity: {results_df['polarity'].mean():.4f}")

    print("\nDetailed Results:")
    print(results_df[['text', 'author', 'sentiment', 'polarity']])

    from fastapi import FastAPI
    from pydantic import BaseModel
    from typing import List, Optional

    # Initialize FastAPI application
    app = FastAPI(
    title="Sentiment Prediction API",
    description="Analyzes sentiment of tweets using TextBlob",
    version="1.0.0",
    swagger_ui_parameters={"defaultModelsExpandDepth": -1}  # Hide Schemas section
    )

    # Define data models for input/output
    class TweetInput(BaseModel):
    text: str
    author: Optional[str] = "Anonymous"

    class SentimentResult(BaseModel):
    text: str
    author: str
    sentiment: str
    polarity: float

    class BulkAnalysisResponse(BaseModel):
    total_tweets: int
    results: List[SentimentResult]
    sentiment_distribution: dict

    print("FastAPI application initialized")
    print(f"Title: {app.title}")
    print(f"Version: {app.version}")
    print("\nPydantic models created:")
    print(" - TweetInput (for requests)")
    print(" - SentimentResult (for individual results)")
    print(" - BulkAnalysisResponse (for complete response)")

    @app.post("/analyze_tweets/", response_model=BulkAnalysisResponse)
    def analyze_tweets(tweets_input: List[TweetInput]):
    # Initialize empty results list
    results = []

    # Process each tweet
    for tweet in tweets_input:
        # Call sentiment analysis function
        sentiment_data = analyze_sentiment(tweet.text)

        # Wrap result in SentimentResult model
        result = SentimentResult(
            text=sentiment_data['text'],
            author=tweet.author,
            sentiment=sentiment_data['sentiment'],
            polarity=sentiment_data['polarity']
        )

        results.append(result)

    # Calculate sentiment distribution
    sentiments = [r.sentiment for r in results]

    sentiment_distribution = {
        "Positive": sentiments.count("Positive"),
        "Negative": sentiments.count("Negative"),
        "Neutral": sentiments.count("Neutral")
    }

    # Return complete response
    return BulkAnalysisResponse(
        total_tweets=len(results),
        results=results,
        sentiment_distribution=sentiment_distribution
    )

    print("API endpoint created: POST /analyze_tweets/")
    print("\nEndpoint details:")
    print(" Path: /analyze_tweets/")
    print(" Method: POST")
    print(" Input: List of tweets with text and author")
    print(" Output: Analyzed sentiments with distribution")

--
## app.py
  
    import pandas as pd
    from textblob import TextBlob
    from fastapi import FastAPI
    from pydantic import BaseModel
    from typing import List, Optional

    # ---------------- SAMPLE TWEETS DATA ----------------
    sample_tweets = [
    {"text": "I absolutely love this new product! It's amazing!", "author": "user1"},
    {"text": "This is terrible. Worst experience ever.", "author": "user2"},
    {"text": "The weather is nice today.", "author": "user3"},
    {"text": "I'm so happy with my purchase! Highly recommend!", "author": "user4"},
    {"text": "This app keeps crashing. Very disappointed.", "author": "user5"},
    {"text": "Just had the best coffee of my life!", "author": "user6"},
    {"text": "The service was slow and food was cold.", "author": "user7"},
    {"text": "Learning Python is fun and rewarding.", "author": "user8"},
    {"text": "I hate waiting in long queues.", "author": "user9"},
    {"text": "The sunset today was beautiful.", "author": "user10"},
    {"text": "This movie is absolutely brilliant!", "author": "user11"},
    {"text": "I'm frustrated with the lack of updates.", "author": "user12"},
    ]

    tweets_df = pd.DataFrame(sample_tweets)

    # ---------------- SENTIMENT ANALYSIS FUNCTION ----------------
    def analyze_sentiment(text):
    try:
        blob = TextBlob(text)
        polarity = blob.sentiment.polarity

        if polarity > 0.1:
            sentiment_category = "Positive"
        elif polarity < -0.1:
            sentiment_category = "Negative"
        else:
            sentiment_category = "Neutral"

        return {
            "text": text,
            "polarity": round(polarity, 4),
            "sentiment": sentiment_category
        }

    except Exception as e:
        return {
            "text": text,
            "error": str(e)
        }

    # ---------------- FASTAPI SETUP ----------------
    app = FastAPI(
    title="Sentiment Prediction API",
    description="Analyzes sentiment of tweets using TextBlob",
    version="1.0.0",
    swagger_ui_parameters={"defaultModelsExpandDepth": -1}  # Hide Schemas section
    )

    # ---------------- DATA MODELS ----------------
    class TweetInput(BaseModel):
    text: str
    author: Optional[str] = "Anonymous"

    class SentimentResult(BaseModel):
    text: str
    author: str
    sentiment: str
    polarity: float

    class BulkAnalysisResponse(BaseModel):
    total_tweets: int
    results: List[SentimentResult]
    sentiment_distribution: dict

    # ---------------- API ENDPOINT ----------------
    @app.post("/analyze_tweets/", response_model=BulkAnalysisResponse)
    def analyze_tweets(tweets_input: List[TweetInput]):
    """Analyze sentiment of multiple tweets."""

    results = []

    for tweet in tweets_input:
        sentiment_data = analyze_sentiment(tweet.text)

        result = SentimentResult(
            text=sentiment_data["text"],
            author=tweet.author,
            sentiment=sentiment_data["sentiment"],
            polarity=sentiment_data["polarity"]
        )

        results.append(result)

    sentiments = [r.sentiment for r in results]

    sentiment_distribution = {
        "Positive": sentiments.count("Positive"),
        "Negative": sentiments.count("Negative"),
        "Neutral": sentiments.count("Neutral")
    }

    return BulkAnalysisResponse(
        total_tweets=len(results),
        results=results,
        sentiment_distribution=sentiment_distribution
    )

    # ---------------- RUN SERVER ----------------
    if __name__ == "__main__":
       import uvicorn

    print("\n" + "=" * 60)
    print("Sentiment Prediction API Server Started")
    print("=" * 60)
    print("API Docs: http://localhost:8000/docs")
    print("=" * 60 + "\n")


## Output



    uvicorn.run(app, host="0.0.0.0", port=8000)
