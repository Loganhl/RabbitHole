import requests
from bs4 import BeautifulSoup, SoupStrainer
import json

#search will hold the keywords we want to search google news for
search = str()

search = "werewolves"

#holds the request information from the query in a bunary format

response = requests.get("https://www.google.com/search?q="+ search +"&tbm=nws")
    
if response.status_code == 200:
    #parse the response into html
    soup = BeautifulSoup(response.text, 
                            "html.parser") 


    #get all headers(article titles)
    heading_object=soup.find_all( 'h3' )
    

    #will hold the links to the articles
    link_list = list()
    
    relevant_articles = list()


    for link in soup.find_all("a"):
        link_list.append(link.get("href").replace("/url?q=",""))
        
        
    #for info,link in heading_object,soup.find_all("a"):
    #   relevant_articles.append()
        
        
        
        
    print(link_list)
            

    for info in heading_object: 
        print(info.getText()) 
        print("------") 

