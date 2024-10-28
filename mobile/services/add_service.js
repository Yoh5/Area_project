import {API_KEY} from "../services/api"

export default function send_service_infos(serviceInfos, navigation) {
    try {
        fetch(`${API_KEY}/account/connect`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(serviceInfos)
        })
        navigation.navigate('applets', {
            'serviceId': serviceInfos.service_id,
            'userMail': serviceInfos.email,
            'validated': true,
        })
    }
    catch (error) {
        console.error('Erreur :', error)
    }
}
