const axios = require('axios');

const apiUrl = 'https://www.hackthebox.com/api/v4/profile/activity/';

const baseUrl = 'https://www.hackthebox.com/api/v4/';
const profileActivityRoute = 'profile/activity/';

let userId;

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiYTRjZjkzMDNhODNjNGUxMDA1NDRmNWIwOWJjNTQzYzBjYWNiMTdkNGM2N2JiYmNiZDNjYTU2NTAzNjAxYWEzZmNiMTUyYjdmNTQ4YmY3M2MiLCJpYXQiOjE3MDQ3NjcxMTAuMzY0NjIxLCJuYmYiOjE3MDQ3NjcxMTAuMzY0NjIyLCJleHAiOjE3MDczNTkxMTAuMzUyNzcxLCJzdWIiOiIxMDA1NjM2Iiwic2NvcGVzIjpbIjJmYSJdfQ.vcGj3gWPD7zVMJlzP-_R2obh77w8JPfOx-av4wv1njX1IeiiNOeGGzaxYpRqam5hhTtwM-kiyOilGdFl1oqqj3Ce3fxdqMhTsAM-1pRcYOFlYRhlJbkSac1TCdT6b51af8_c0MIMiknWGXbzrad8iXtmHYKMIds3R_Plwui4Jp_DtkJhLAzrGPB_hwhPiIwk9yl1WgCBnWmcpnNOjky0fNSGEVeE7ZOaZ5hcpNDd2yCWqgOqKDkVt3j2e8LdOn1zC6ydw40DAXdGYe6J8FoPMyW9DU12onRSPYWJlNDsl04t6PyfvX1vs5CkopE5YYRVb4kuBJ-7zeBuPZLTKGKAWwZXQp2dWQIamK-U4nADOxVQmxNVd8CHM7MTmtkuFuCWER5XC40qL5Z_h_slm143dCU-qrl93TtZtz_TLuQHE-T0QpVx7OcaK3sWzJpj1tX3Q1V3wzHV9TOkWcjto0b8e6Ha2JO-2paYDI3YFl1G_nXVF-EOEyKTPOi2okmAYelI8Wk_p9MFN1gZplaFS3LlUhmknmKRFZ0-dMMcbgJdbzWaWWLQjT_wyTxee3d4S-YzBvQxs23uc47bsLPV3EpbbmOtdBr6MBSxYbx12tCVmKHNd5cFJJV4FL113QiCM7BBO-hTyXZQqlitOBjOkzL6bCwmg599SDsu9EELS_CDERE';  // Remplacez par votre token

let previousObjectCount = 3;
let firstExecution = true;


function askForCredentials() {
  rl.question('Entrez votre nom d\'utilisateur : ', (username) => {
    console.log(`Nom d'utilisateur : ${username}`);

    rl.question('Entrez votre mot de passe (ID utilisateur) : ', (password) => {
      userId = password; 
      console.log(`Mot de passe (ID utilisateur) : ${password}`);
      rl.close();
      makeRequest();
    });
  });
}

function handleResponse(response) {
  console.log('Réponse du serveur:');
  console.log(JSON.stringify(response.data, null, 2));

  const currentObjectCount = response.data.profile.activity.length;
  console.log('Nombre total d\'objets dans la réponse:', currentObjectCount);
  console.log('Nombre total d\'objets dans la réponse précédente:', previousObjectCount);

  if (firstExecution && currentObjectCount > previousObjectCount || currentObjectCount > previousObjectCount) {
    const newObject = response.data.profile.activity[0];
    console.log(`User ${userId} just solved the ${newObject.object_type} named ${newObject.name}`);
  } else {
    console.log('Still checking');
  }

  updatePreviousObjectCount(currentObjectCount);
  firstExecution = false;
}

function updatePreviousObjectCount(currentCount) {
  previousObjectCount = currentCount;
}

function makeRequest() {
  axios.get(`${apiUrl}${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      handleResponse(response);
    })
    .catch(error => {
      console.error('Erreur lors de la requête:', error.message);
    });
}

askForCredentials();
setInterval(() => {
  makeRequest();
}, 10000);