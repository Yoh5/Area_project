const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3005;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  const homeHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Admin Panel</title>
      <style>
        body {
          background-color: #f0f0f0;
          font-family: Arial, sans-serif;
        }

        h1 {
          color: #333;
          text-align: center;
        }

        .button-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center; 
          max-width: 80%;
          margin: 20px auto;
        }

        .animated-button {
          display: inline-block;
          padding: 10px 20px;
          margin: 5px;
          background-color: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s, transform 0.3s;
          flex: 0 0 22%;
        }

        .animated-button:hover {
          background-color: #0056b3;
          transform: scale(1.05);
        }
      </style>
    </head>
    <body>
      <h1>Admin Panel</h1>
      <div class="button-container">
        <a href="/all-users" class="animated-button">All Users</a>
        <a href="/user-list" class="animated-button">User List</a>
        <a href="/manage-user" class="animated-button">Manage User</a>
        <a href="/services-list" class="animated-button">Services List</a>
        <a href="/area-list" class="animated-button">Area List</a>
        <a href="/area-descr" class="animated-button">Edit Area</a>
        <!-- Ajoutez d'autres boutons si nécessaire -->
      </div>
    </body>
    </html>
  `;

  res.send(homeHtml);
});


app.get('/all-users', (req, res) => {
  const url = 'https://deciding-oyster-probably.ngrok-free.app/user';

  axios.get(url)
    .then(response => {
      const data = response.data;

      if (Array.isArray(data) && data.length > 0) {
        const usersHtml = data.map(user => {
          return `
            <div class="user-title" onclick="toggleUserDetails(${user.id})">
              <h2>USERNAME: ${user.username}</h2>
            </div>
            <div class="user-box" id="user-details-${user.id}">
              <ul>
                <li>id: ${user.id}</li>
                <li>email: ${user.email}</li>
                <li>the_token: ${user.the_token}</li>
                <li>mdp: ${user.mdp}</li>
                <li>account_check: ${user.account_check}</li>
              </ul>
            </div>
          `;
        }).join('');

        const html = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>User Information</title>
            <style>
              body {
                background-color: #f0f0f0;
                font-family: Arial, sans-serif;
              }

              .user-title {
                width: 200px;
                padding: 10px;
                margin: 10px;
                background-color: #fff;
                color: #000;
                border-radius: 8px;
                text-align: center;
                cursor: pointer;
                transition: background-color 0.3s ease-in-out;
              }

              .user-title:hover {
                background-color: #444;
              }

              .user-box {
                display: none;
                width: 200px;
                padding: 20px;
                margin: 10px;
                border: 1px solid #ccc;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                background-color: #555;
              }
            </style>
          </head>
          <body>
            <h1>All Users Information</h1>
            ${usersHtml}
            <script>
              function toggleUserDetails(userId) {
                const detailsElement = document.getElementById('user-details-' + userId);
                detailsElement.style.display = detailsElement.style.display === 'none' ? 'block' : 'none';
              }
            </script>
          </body>
          </html>
        `;

        res.send(html);
      } else {
        res.send('Aucune donnée disponible.');
      }
    })
    .catch(error => {
      res.status(500).send(`Erreur lors de la requête: ${error.message}`);
    });
});


app.get('/user-list', (req, res) => {
  const url = 'https://deciding-oyster-probably.ngrok-free.app/user';

  axios.get(url)
    .then(response => {
      const data = response.data;

      if (Array.isArray(data) && data.length > 0) {
        const userListHtml = data.map(user => {
          return `
            <div class="user-info" onclick="toggleUserDetails(${user.id})">
              <li>ID: ${user.id}, Username: ${user.username}</li>
            </div>
            <div class="user-box" id="user-details-${user.id}">
              <ul>
                <li>Email: ${user.email}</li>
                <li>The Token: ${user.the_token}</li>
                <li>Password: ${user.mdp}</li>
                <li>Account Check: ${user.account_check}</li>
              </ul>
            </div>
          `;
        }).join('');

        const html = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>User List</title>
            <style>
              body {
                background-color: #f0f0f0;
              }

              .user-info {
                display: inline-block;
                width: 200px;
                padding: 10px;
                margin: 10px;
                background-color: #fff;
                color: #000;
                border-radius: 8px;
                text-align: center;
                cursor: pointer;
                transition: background-color 0.3s ease-in-out;
              }

              .user-info:hover {
                background-color: #ddd;
              }

              .user-box {
                display: none;
                width: 200px;
                padding: 20px;
                margin: 10px;
                border: 1px solid #ccc;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                background-color: #555;
              }
            </style>
          </head>
          <body>
            <h1>User List</h1>
            ${userListHtml}
            <script>
              function toggleUserDetails(userId) {
                const detailsElement = document.getElementById('user-details-' + userId);
                detailsElement.style.display = detailsElement.style.display === 'none' ? 'block' : 'none';
              }
            </script>
          </body>
          </html>
        `;

        res.send(html);
      } else {
        res.send('Aucune donnée disponible.');
      }
    })
    .catch(error => {
      res.status(500).send(`Erreur lors de la requête: ${error.message}`);
    });
});

app.get('/services-list', (req, res) => {
  const url = 'https://deciding-oyster-probably.ngrok-free.app/services';

  axios.post(url)
    .then(response => {
      const data = response.data;

      if (Array.isArray(data) && data.length > 0) {
        const servicesListHtml = data.map(service => {
          return `
            <div class="service-info" onclick="toggleServiceDetails(${service.id})">
              <li>Service Number ${service.id} : ${service.name}</li>
            </div>
            <div class="service-box" id="service-details-${service.id}">
              <!-- Add additional details here if needed -->
            </div>
          `;
        }).join('');

        const html = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Services List</title>
            <style>
              body {
                background-color: #f0f0f0;
              }

              .service-info {
                display: inline-block;
                width: 200px;
                padding: 10px;
                margin: 10px;
                background-color: #fff;
                color: #000;
                border-radius: 8px;
                text-align: center;
                cursor: pointer;
                transition: background-color 0.3s ease-in-out;
              }

              .service-info:hover {
                background-color: #ddd;
              }

              .service-box {
                display: none;
                width: 200px;
                padding: 20px;
                margin: 10px;
                border: 1px solid #ccc;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                background-color: #555;
              }
            </style>
          </head>
          <body>
            <h1>Services List</h1>
            <ul>${servicesListHtml}</ul>
            <script>
              function toggleServiceDetails(serviceId) {
                const detailsElement = document.getElementById('service-details-' + serviceId);
                detailsElement.style.display = detailsElement.style.display === 'none' ? 'block' : 'none';
              }
            </script>
          </body>
          </html>
        `;

        res.send(html);
      } else {
        res.send('Aucune donnée disponible.');
      }
    })
    .catch(error => {
      res.status(500).send(`Erreur lors de la requête: ${error.message}`);
    });
});

app.get('/area-list', async (req, res) => {
  try {
    const servicesResponse = await axios.post('https://deciding-oyster-probably.ngrok-free.app/services');
    const services = servicesResponse.data.reduce((acc, service) => {
      acc[service.id] = service.name;
      return acc;
    }, {});

    const areaListResponse = await axios.post('https://deciding-oyster-probably.ngrok-free.app/act_react/');
    const areaList = areaListResponse.data;

    if (Array.isArray(areaList) && areaList.length > 0) {
      const resultHtml = areaList.map(area => {
        const serviceActName = services[area.serv_act_id] || 'Service not found';
        const serviceReactName = services[area.serv_react_id] || 'Service not found';

        return `
          <h2 class="area-title" onclick="toggleDetails(${area.id})">Area ${area.id} : ${area.descr}</h2>
          <div class="area-box" id="details-${area.id}">
            <p>Nombre d'action-réaction = ${areaList.filter(a => a.descr === area.descr).length}</p>
            <p>Action Réaction number ${area.id} :</p>
            <ul>
              <li>Service action ${area.serv_act_id} : ${services[area.serv_act_id] || 'Service not found'}</li>
              <li>Service reaction ${area.serv_react_id} : ${services[area.serv_react_id] || 'Service not found'}</li>
              <li>Description: "${area.descr}"</li>
            </ul>
          </div>
        `;
      }).join('');


      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Area List</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #333;
              color: #fff;
            }

            .area-container {
              display: flex;
              flex-wrap: wrap;
            }

            .area-title {
              width: 200px;
              padding: 10px;
              margin: 10px;
              background-color: #fff;
              color: #000;
              border-radius: 8px;
              text-align: center;
              cursor: pointer;
              transition: background-color 0.3s ease-in-out;
            }

            .area-title:hover {
              background-color: #ddd;
            }

            .area-box {
              display: none;
              width: 200px;
              padding: 20px;
              margin: 10px;
              border: 1px solid #ccc;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              background-color: #555;
            }
          </style>
        </head>
        <body>
          <h1>Area List</h1>
          <div class="area-container">
            ${resultHtml}
          </div>

          <script>
            function toggleDetails(areaId) {
              const detailsElement = document.getElementById('details-' + areaId);
              detailsElement.style.display = detailsElement.style.display === 'none' ? 'block' : 'none';
            }
          </script>
        </body>
        </html>
      `;

      res.send(html);

    } else {
      res.send('Aucune donnée disponible.');
    }
  } catch (error) {
    res.status(500).send(`Erreur lors de la requête: ${error.message}`);
  }
});


app.get('/area-descr', async (req, res) => {
  try {
    const servicesResponse = await axios.post('https://deciding-oyster-probably.ngrok-free.app/services');
    const services = servicesResponse.data.reduce((acc, service) => {
      acc[service.id] = service.name;
      return acc;
    }, {});

    const areaListResponse = await axios.post('https://deciding-oyster-probably.ngrok-free.app/act_react/');
    const areaList = areaListResponse.data;

    if (Array.isArray(areaList) && areaList.length > 0) {
      const resultHtml = areaList.map(area => {
        const serviceActName = services[area.serv_act_id] || 'Service not found';
        const serviceReactName = services[area.serv_react_id] || 'Service not found';

        return `
          <div class="area-title" onclick="openEditModal(${area.id}, '${area.descr}')">
            <h2>Area ${area.id} : ${area.descr}</h2>
          </div>
        `;
      }).join('');

      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Area Descriptions</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #333;
              color: #fff;
            }

            .area-container {
              display: flex;
              flex-wrap: wrap;
            }

            .area-title {
              width: 200px;
              padding: 10px;
              margin: 10px;
              background-color: #fff;
              color: #000;
              border-radius: 8px;
              text-align: center;
              cursor: pointer;
              transition: background-color 0.3s ease-in-out;
            }

            .area-title:hover {
              background-color: #ddd;
            }

            .modal {
              display: none;
              position: fixed;
              z-index: 1;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              overflow: auto;
              background-color: rgb(0, 0, 0);
              background-color: rgba(0, 0, 0, 0.4);
              padding-top: 60px;
            }

            .modal-content {
              background-color: #fefefe;
              margin: 5% auto;
              padding: 20px;
              border: 1px solid #888;
              width: 80%;
            }

            .modal-btn {
              display: block;
              margin-top: 10px;
              padding: 10px;
              background-color: #555;
              color: #fff;
              text-align: center;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            }
          </style>
        </head>
        <body>
          <h1>Area Descriptions</h1>
          <div class="area-container">
            ${resultHtml}
          </div>

          <!-- Modal for editing description -->
          <div id="editModal" class="modal">
            <div class="modal-content">
              <label for="description">Enter Description:</label>
              <input type="text" id="description" name="description">
              <button class="modal-btn" onclick="editDescription()">Valider</button>
            </div>
          </div>

          <script>
            function openEditModal(areaId, currentDescription) {
              const modal = document.getElementById('editModal');
              const descriptionInput = document.getElementById('description');
              descriptionInput.value = currentDescription;
              modal.style.display = 'block';

              descriptionInput.setAttribute('data-area-id', areaId);
            }

            function editDescription() {
              const descriptionInput = document.getElementById('description');
              const areaId = descriptionInput.getAttribute('data-area-id');
              const newDescription = descriptionInput.value;

              axios.put(\`https://deciding-oyster-probably.ngrok-free.app/act_react/modify/\${areaId}\`, {
                serv_act_id: 1,
                serv_react_id: 2,
                descr: newDescription,
              })
              .then(response => {
                alert('Description updated successfully!');
              })
              .catch(error => {
                alert('Error updating description.');
              });

              const modal = document.getElementById('editModal');
              modal.style.display = 'none';
            }
          </script>
        </body>
        </html>
      `;

      res.send(html);

    } else {
      res.send('Aucune donnée disponible.');
    }
  } catch (error) {
    res.status(500).send(`Erreur lors de la requête: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});

/*

utiliser la liste de /area-list qui effectue cette requête

Afficher les listes des Areas, et un boutton 'edit description' lorsqu'on le sélectionne, une fenêtre s'ouvre et
demande de renseigner un champ qui est le descr spécifiés dans body au niveau de la requête PUT suivante, et un boutton 'valider'
pour appliquer le changement

PUT request https://deciding-oyster-probably.ngrok-free.app/act_react/modify/{id_actionreaction}, body {serv_act_id, serv_react_id, descr}

*/
