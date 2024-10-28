export default async function send_service_infos(serviceInfos) {
    fetch('https://deciding-oyster-probably.ngrok-free.app/account/connect', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceInfos)
    })
    .then(res => {
        window.location.href = `?service=${serviceInfos.service_id}&validated`
    })
    .catch(error => {
        console.error('Erreur :', error)
    })
}
