const Parser = require('rss-parser');
const parser = new Parser();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "halidonfd13@gmail.com",
        pass: "yrwimfzjywzhxsev",
    },
});

let lastArticleDate = new Date(2000, 0, 1);
let newItems = [];

async function fetchRSS(url) {
    try {
        const feed = await parser.parseURL(url);
        console.log(feed.title);
        const items = feed.items.map(item => ({
            title: item.title,
            link: item.link,
            img: item.enclosure ? item.enclosure.url : 'Aucune image disponible',
            pubDate: item.pubDate,
        }));
        lastArticleDate = (items[0].pubDate);
        console.log('Date du dernier article :', lastArticleDate);
        newItems = items.filter(item => (item.pubDate) <= lastArticleDate);
        console.log('Nouveaux articles :', newItems);
        if (newItems.length > 0) {
            for (let i = 0; i < 3; i++) {
                console.log('Nouvel article :', newItems[i]);
            
            const enclosureUrl = newItems[i].enclosure ? newItems[i].enclosure.url : 'Aucune image disponible';
            const mailOptions = {
                from: 'deo-gratias.patinvoh@epitech.eu',
                to: 'deogratiaspatinvoh@gmail.com',
                subject: 'Nouvel article dans le flux RSS',
                text: `Un nouvel article a été ajouté au flux RSS.\n\nTitre: ${newItems[i].title}\nLien: ${newItems[i].link}\nImage: ${enclosureUrl}\nDate de publication: ${newItems[i].pubDate}`,
            };

            await transporter.sendMail(mailOptions);
        }
        }

        return items;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    fetchRSS,
};