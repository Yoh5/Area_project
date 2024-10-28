const axios = require('axios');

const api = 'https://deciding-oyster-probably.ngrok-free.app';

const id_actionreaction = 'your_id';
const url_modify = `${api}/act_react/modify/${id_actionreaction}`;
const data_modify = { serv_act_id: 'value', serv_react_id: 'value', descr: 'value' };
axios.put(url_modify, data_modify)
    .then(response => console.log(response.data))
    .catch(error => console.error(error));

const url_connect = `${api}/account/connect`;
const data_connect = { email: '', service_id: '', identifiant: '', access_token: '', refresh_token: '' };
axios.put(url_connect, data_connect)
    .then(response => console.log(response.data))
    .catch(error => console.error(error));

const url_services = `${api}/services`;
const data_services = {};
axios.post(url_services, data_services)
    .then(response => console.log(response.data))
    .catch(error => console.error(error));

const url_act_react = `${api}/act_react/`;
const data_act_react = {};
axios.post(url_act_react, data_act_react)
    .then(response => console.log(response.data))
    .catch(error => console.error(error));

const url_user = `${api}/user`;
axios.get(url_user)
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
