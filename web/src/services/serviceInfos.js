import { FaGithub, FaMailBulk, FaTrello, FaCloudMoonRain,
    FaRss, FaBook, FaGlobe, FaSmile } from "react-icons/fa"

import {handle_github_login} from './github'
import {handle_trello_login} from './trello'

const noAuth = () => {}

const datas = {
    0: {
        'boxColor': "white",
        'iconColor': "black",
    },
    1: {
        'name': "Github",
        'boxColor': "black",
        'iconColor': "white",
        'Image': FaGithub,
        'handle_connect': handle_github_login,
    },
    2: {
        'name': "Gmail",
        'boxColor': "red",
        'iconColor': "white",
        'Image': FaMailBulk,
        'handle_connect': handle_trello_login,
    },
    3: {
        'name': "Blague",
        'boxColor': "#1569c7",
        'iconColor': "white",
        'Image': FaSmile,
        'handle_connect': noAuth,
    },
    4: {
        'name': "Culture générale",
        'boxColor': "green",
        'iconColor': "#ddd",
        'Image': FaGlobe,
        'handle_connect': noAuth,
    },
    5: {
        'name': "Trello",
        'boxColor': "#1569c7",
        'iconColor': "white",
        'Image': FaTrello,
        'handle_connect': handle_trello_login,
    },
    6: {
        'name': "Meteo",
        'boxColor': "#1569c7",
        'iconColor': "white",
        'Image': FaCloudMoonRain,
        'handle_connect': handle_trello_login,
    },
    7: {
        'name': "Rss",
        'boxColor': "green",
        'iconColor': "white",
        'Image': FaRss,
        'handle_connect': handle_trello_login,
    },
    8: {
        'name': "Bible",
        'boxColor': "green",
        'iconColor': "white",
        'Image': FaBook,
        'handle_connect': handle_trello_login,
    },
}

export default datas
