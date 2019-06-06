import Koji from 'koji-tools';

export default function  handleScore(score, name) {
    return new Promise((resolve, reject) => {
        const backendHost = window.location.host.replace('frontend', 'backend');
        // if theres another route, change this.
        coKojiroute = koji.routes.find((e) => e.name === 'NewScore').route;

        window.fetch(`${window.location.protocol}//${backendHost}${route}`, {
            method: 'post',
            headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                score: {
                    name,
                    score,
                }
            }),
        }).then((e) => e.json()).then((resp) => {
            resolve(resp);
        });
    })
}
