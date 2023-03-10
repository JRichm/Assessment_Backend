module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes = ['A beautiful, smart, and loving person will be coming into your life.',
        'A dubious friend may be an enemy in camouflage.',
        'A faithful friend is a strong defense.',
        'A feather in the hand is better than a bird in the air. ',
        'A fresh start will put you on your way.', 
        'A friend asks only for your time not your money.',
        'A friend is a present you give yourself.',
        'A gambler not only will lose what he has, but also will lose what he doesn’t have.',
        'A golden egg of opportunity falls into your lap this month.',
        'A good friendship is often more important than a passionate romance',
        'A good time to finish up old tasks.',
        'A hunch is creativity trying to tell you something.',
        'A lifetime friend shall soon be made.',
        'A lifetime of happiness lies ahead of you.',
        'A light heart carries you through all the hard times.',
        'A new outlook brightens your image and brings new friends.',
        'A pleasant surprise is waiting for you.'];

        // choose random fortune

        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];

        res.status(200).send(randomFortune);
    }

}