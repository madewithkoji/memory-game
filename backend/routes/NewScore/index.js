import 'isomorphic-fetch';
import Jiro from '@madewithjiro/jiro-sdk';
const { Store } = new Jiro();

export default async (req, res) => {
    console.log('Saving data...');
    console.log(req.body.score);

    let scores = (await Store.get('scores', 'master'));
    if(!scores) scores = [];
    else scores = scores.scores;

    scores.push(req.body.score);

    await Store.set('scores', 'master', {
        scores,
    });
    
    res.status(200).json({ scores });
}
