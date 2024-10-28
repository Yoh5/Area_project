import requests
api = 'https://deciding-oyster-probably.ngrok-free.app'

url_modify = f"{api}/act_react/modify/{id_actionreaction}"
data_modify = {"serv_act_id": "value", "serv_react_id": "value", "descr": "value"}
response_modify = requests.put(url_modify, json=data_modify)
print(response_modify.json())

url_connect = f"{api}/account/connect"
data_connect = {"email": "", "service_id": "", "identifiant": "", "access_token": "", "refresh_token": ""}
response_connect = requests.put(url_connect, json=data_connect)
print(response_connect.json())

url_services = f"{api}/services"
data_services = {}  # Add your data here
response_services = requests.post(url_services, json=data_services)
print(response_services.json())

url_act_react = f"{api}/act_react/"
data_act_react = {}  # Add your data here
response_act_react = requests.post(url_act_react, json=data_act_react)
print(response_act_react.json())

url_user = f"{api}/user"
response_user = requests.get(url_user)
print(response_user.json())
