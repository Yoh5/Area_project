import GitHub from '../services/github'
import Trello from '../services/trello'

const noAuth = null

const datas = {
    1: {
        'name': "Github",
        'boxColor': "black",
        'iconColor': "white",
        'image': "github",
        'AuthView': GitHub
    },
    2: {
        'name': "Gmail",
        'boxColor': "red",
        'iconColor': "#ddd",
        'image': "envelope",
        'AuthView': noAuth,
    },
    3: {
        'name': "Blague",
        'boxColor': "#1569c7",
        'iconColor': "white",
        'image': "smile-o",
        'AuthView': noAuth,
    },
    4: {
        'name': "Culture générale",
        'boxColor': "green",
        'iconColor': "#ddd",
        'image': "globe",
        'AuthView': noAuth,
    },
    5: {
        'name': "Trello",
        'boxColor': "#1569c7",
        'iconColor': "#ddd",
        'image': "trello",
        'AuthView': Trello,
    },
    6: {
        'name': "Meteo",
        'boxColor': "#1569c7",
        'iconColor': "#ddd",
        'image': "cloud",
        'AuthView': noAuth,
    },
    7: {
        'name': "Rss",
        'boxColor': "green",
        'iconColor': "#ddd",
        'image': "rss",
        'AuthView': noAuth,
    },
    8: {
        'name': "Bible",
        'boxColor': "green",
        'iconColor': "#ddd",
        'image': "book",
        'AuthView': noAuth,
    },
}

export default datas
