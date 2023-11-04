import requests
from bs4 import BeautifulSoup
import json


#search will hold the keywords we want to search google news for
search = str()
#list variables to hold the parsed data
headers_list = list()
link_list = list()
relevant_articles = list()

search = "Scream"

#holds the request information from the query in a binary format
response = requests.get("https://www.google.com/search?q="+ search +"&tbm=nws")
    
if response.status_code == 200:
    #parse the response into html
    soup = BeautifulSoup(response.text, 
                            "html.parser") 

    #get all headers(article titles)
    heading_object=soup.find_all( 'h3' )

    #parse headers and urls into seperate lists
    for info in heading_object: 
        headers_list.append(info.getText()) 
        
    for link in soup.find_all("a"):
        link_list.append(link.get("href").replace("/url?q=",""))
       
    #last 7 urls aren't search results, nor are the first 16 elements
    link_list = link_list[16:-7]
    
    #zip header_list elements and link_lsit
    if len(headers_list) == len(link_list):
        relevant_articles.extend([list(a) for a in zip(headers_list,link_list)]) 
        
        
    for pair in relevant_articles:
        print(pair,"\n\n")
