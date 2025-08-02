from dotenv import load_dotenv
import google.generativeai as genai
import os
 
load_dotenv()
GEMINI_API_KEY = os.getenv('GOOGLE_KEY')

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash')

response = model.generate_content("Hi, could you assess the care priority of someone with a history of asthma having severe flu symptoms? Return only an integer from 1 to 10")
print(response.text)