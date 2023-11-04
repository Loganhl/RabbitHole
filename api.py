import json

with open('config.json') as config_file:
    config = json.load(config_file)
    apiKey = config.get('apiKey')
    

if apiKey is None:
    print("API key not found in the configuration file.")