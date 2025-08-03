from dotenv import load_dotenv
import os
import json
# langchain libraries
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain.vectorstores import DocArrayInMemorySearch
from langchain.schema.runnable import RunnableMap
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser
from langchain_community.document_loaders.csv_loader import CSVLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
# --- loading env for api keys ---
load_dotenv()

# --- fetch the google gemini ---
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash", 
    temperature=0.7,
    google_api_key=os.getenv("GOOGLE_KEY")
)

#  ------ setup RAG -----
def setup_rag():
    try:
        loader = CSVLoader(file_path="./geminicases.csv")
        data = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        docs = text_splitter.split_documents(data)
        
        # Use a simpler embedding approach
        embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=os.getenv("GOOGLE_KEY")
        )
        
        vectorstore = DocArrayInMemorySearch.from_documents(
            docs,
            embedding=embeddings
        )
        return vectorstore.as_retriever()
    except Exception as e:
        print(f"Error setting up RAG: {e}")
        return None

# Initialize retriever
retriever = setup_rag()

# --- Making chain ---
# setting up the format for output and the specific prompt engineering 
template ="""
assess the care priority 1 as highest, 5 as lowest, of this patient with medical records and medical history provided below.
provide a short answer with reasoning based off symptoms age and past experiences.
answer based off this context: {context}
in the format:
{{
"priority" : integer,
"answer" : "..."
}}
for this question: {question}
"""
prompt = ChatPromptTemplate.from_template(template)
output_parser = StrOutputParser()

# creating chain
def create_chain():
    if retriever is None:
        # Fallback chain without RAG
        return prompt | llm | output_parser
    else:
        return RunnableMap({
            "context" : lambda x : retriever.invoke(x["question"]),
            "question" : lambda x : x["question"]
        }) | prompt | llm | output_parser

chain = create_chain()

def get_user_score(userdata : str):
    try:
        # get the user data
        print(f"User data retrieved: {userdata}")
        
        # Format the question for the LLM
        question = f"Patient: {userdata.get('patientName', 'Unknown')}, Age: {userdata.get('age', 'Unknown')}, Symptoms: {userdata.get('symptoms', [])}, Current Priority: {userdata.get('priority', 0)}, Status: {userdata.get('status', 'Unknown')}. Please assess the care priority."
        
        # get response
        if retriever is None:
            # Use fallback approach without RAG
            resp = chain.invoke({"context": "No historical data available", "question": question})
        else:
            resp = chain.invoke({"question": question})
        
        # Try to parse JSON response
        try:
            # Clean up the response to extract JSON
            if "{" in resp and "}" in resp:
                start = resp.find("{")
                end = resp.rfind("}") + 1
                json_str = resp[start:end]
                parsed_response = json.loads(json_str)
                return parsed_response
            else:
                # If no JSON found, return a default response
                return {"priority": 3, "answer": resp}
        except json.JSONDecodeError:
            # If JSON parsing fails, return the raw response
            return {"priority": 3, "answer": resp}
            
    except Exception as e:
        print(f"Error in get_user_score: {e}")
        return {"priority": 3, "answer": f"Error processing request: {str(e)}"}
