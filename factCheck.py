import json
import requests
#import 



with open('config.json') as config_file:
    config = json.load(config_file)
    api_key = config.get('api_key')
    
def Check(query):
    payload = {
        'key': api_key,
        'query': query
    }

    url = 'https://factchecktools.googleapis.com/v1alpha1/claims:search'
    response = requests.get(url, params=payload)
    if response.status_code == 200:
        result = json.loads(response.text)
 
        try:
            topRating = result["claims"][0]
            publisher_name = topRating["claimReview"][0]['publisher']['name']
            claim_title = topRating["claimReview"][0]['title']
            website_url = topRating["claimReview"][0]['url']
            rating = topRating["claimReview"][0]['textualRating']
            if rating == "True" or "False" or "Mostly False" or "Half True" or "Mostly True":
                result = f"Publisher : {publisher_name} \n{claim_title} \nRead More : {website_url} \nRating : {rating}"
                return result 
            else:
                result = f"Publisher : {publisher_name} \n{claim_title} \nRead More : {website_url}"
                return result         
        except:
            return 0
    else:
        return 0

def Test():
    result = Check("The sun is a mile away from earth")
    if result:
        print(result)
    else:
        print("Fact-checking failed or no claim review found.")


Test()
