import requests
from bs4 import BeautifulSoup, SoupStrainer
import json

#search will hold the keywords we want to search google news for
search = str()

search = "wolves"

#holds the request information from the queried 
raw = requests.get("https://www.google.com/search?q="+ search +"&tbm=nws")


soup = BeautifulSoup(raw.text, 
                         "html.parser") 

heading_object=soup.find_all( 'h3' )

link_list = list()

for link in soup.find_all("a"):
    link_list.append(link.get("href"))
    
    
print(link_list)
        

for info in heading_object: 
    print(info.getText()) 
    print("------") 

