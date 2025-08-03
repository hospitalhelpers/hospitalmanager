import getpass
import os
from dotenv import load_dotenv
import google.generativeai as genai
# langchain libraries
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain.vectorstores import DocArrayInMemorySearch
from langchain.schema.runnable import RunnableMap
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser
from langchain_community.document_loaders import JSONLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# --- loading env for api keys ---
load_dotenv()

# --- fetch the google gemini ---
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.7)
#result = llm.invoke("hello who is this?")
#print(result.text)

#  ------ setup RAG -----

loader = JSONLoader(file_path="./geminiuserinfo.json")
data = loader.load()
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
docs = text_splitter.split_documents(data)
embeddings = GoogleGenerativeAIEmbeddings(model = "models/embedding-001")
vectorstore = DocArrayInMemorySearch.from_documents(
        docs,
        embedding=embeddings
)

# making the RAG
retriever = vectorstore.as_retriever()
#print(retriever.get_relevant_documents("Who is the current CEO of microsoft?"))
# --- Making chain ---
# setting up the format for output and the specific prompt engineering 
template =f"""
Hi, could you assess the care priority of this patient with medical records and medical history provided below?
answer based off this context: {context}
in the json format:
{{"score"}} : integer from 1(highest)-5(lowest)
{{"answer"}} : "..."
for this question: {question}
"""
prompt = ChatPromptTemplate.from_template(template)
output_parser = StrOutputParser()
# creating chain
chain = RunnableMap({
    "context" : lambda x : retriever.get_relevant_documents(x["question"]),
    "question" : lambda x : x["question"]
    }) | prompt | llm | output_parser

def get_user_score(healthID : str):
    # get the user data
    # get response
    resp = chain.invoke({"question" : ""})