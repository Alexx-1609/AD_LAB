import PyPDF2
import requests
from bs4 import BeautifulSoup
import re
def read_pdf(file_path):
text = ""
with open(file_path, "rb") as file:
reader = PyPDF2.PdfReader(file)
for page in reader.pages:
page_text = page.extract_text()
if page_text:
text += page_text + "\n"
return text
def scrape_website(url):
headers = {"User-Agent": "Mozilla/5.0"}
response = requests.get(url, headers=headers, timeout=10)
soup = BeautifulSoup(response.text, "html.parser")
paragraphs = soup.find_all("p")
return " ".join(p.get_text() for p in paragraphs)
STOPWORDS = {
"how", "to", "is", "the", "a", "an", "of", "for",
"in", "on", "what", "define", "explain", "was", "when"
}
def extract_keywords(question):
words = re.findall(r"\b[a-z]+\b", question.lower())
return [w for w in words if w not in STOPWORDS]

def split_sentences(text):
return re.split(r"[.\n]", text)
def best_match(text, keywords):
best_sentence = ""
best_score = 0
for sentence in split_sentences(text):
sentence_clean = sentence.strip()
if len(sentence_clean) < 40:
continue
sentence_lower = sentence_clean.lower()
score = sum(1 for k in keywords if k in sentence_lower)
if score > best_score:
best_score = score
best_sentence = sentence_clean
return best_sentence
def chatbot_response(question, pdf_text, web_text):
keywords = extract_keywords(question)
if question.lower().startswith(("what is", "define", "explain")):
pdf_answer = best_match(pdf_text, keywords)
if pdf_answer:
return "ChatBot (From PDF):\n" + pdf_answer
web_answer = best_match(web_text, keywords)
if web_answer:
return "ChatBot (From Website):\n" + web_answer
pdf_answer = best_match(pdf_text, keywords)
if pdf_answer:
return "ChatBot (From PDF):\n" + pdf_answer
return "Sorry, no relevant answer found."

pdf_text = read_pdf(
r"C:\Users\uraj0\Downloads\Smart-Ultrasonic-Glasses-for-Assisting-Visually-Impaire

d-Individuals.pdf"
)
web_text = scrape_website(
"https://en.wikipedia.org/wiki/Web_scraping"
)
print("\nChatbot is ready. Type 'exit' to quit.\n")
while True:
user_input = input("You: ")
if user_input.lower() == "exit":
break
response = chatbot_response(user_input, pdf_text, web_text)
print("Bot:", response)
