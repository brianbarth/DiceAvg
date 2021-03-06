let fs = require('fs');

module.exports = function (rolls, callback) {
    
    const startRolls = function(){
        console.log("onclick function call works");
        let i = 0;
        let twos = 0;
        let threes = 0;
        let fours = 0;
        let fives = 0;
        let sixes = 0;
        let sevens = 0;
        let eights = 0;
        let nines = 0;
        let tens = 0;
        let elevens = 0;
        let twelves = 0;
        let repeat = rolls;

        let getDieRoll = function () {
            return Math.ceil(6 * Math.random());
        }

        while (i < repeat) {
            let first = getDieRoll();
            let second = getDieRoll();
            let sum = first + second;
                // if ( sum == 2 ){
                //     twos = twos + 1;
                // } else if ( sum == 3 ) {
                //     threes = threes + 1;
                // } else if ( sum == 4 ) {
                //     fours = fours + 1;
                // } else if ( sum == 5 ) {
                //     fives = fives + 1;
                // } else if ( sum == 6 ) {
                //     sixes = sixes + 1;
                // } else if ( sum == 7 ) {
                //     sevens = sevens + 1;
                // } else if ( sum == 8 ) {
                //     eights = eights + 1;
                // } else if ( sum == 9 ) {
                //     nines = nines + 1;
                // } else if ( sum == 10 ) {
                //     tens = tens + 1;
                // } else if ( sum == 11 ) {
                //     elevens =elevens + 1;
                // } else {
                //     twelves = twelves + 1;
                // }

                switch (sum) {
                    case 2:
                        twos += 1;
                        break;
                    case 3:
                        threes +=1;
                        break;
                    case 4:
                        fours +=1;
                        break;
                    case 5:
                        fives +=1;
                        break;
                    case 6:
                        sixes +=1;
                        break;
                    case 7:
                        sevens +=1;
                        break;
                    case 8:
                        eights +=1;
                        break;
                    case 9:
                        nines +=1;
                        break;
                    case 10: 
                        tens +=1;
                        break;
                    case 11:
                        elevens +=1;
                        break;
                    case 12:
                        twelves +=1;
                        break; 
                }
            i = i + 1;
        };
        console.log('number of rolls : ' + repeat);
        console.log('twos: ' + twos);
        console.log('threes: ' + threes);
        console.log('fours: ' + fours);
        console.log('fives: ' + fives);
        console.log('sixes: ' + sixes);
        console.log('sevens: ' + sevens);
        console.log('eights: ' + eights);
        console.log('nines: ' + nines);
        console.log('tens: ' + tens);
        console.log('elevens: ' + elevens);
        console.log('twelves: ' + twelves);

        let set = [twos, threes, fours, fives, sixes, sevens, eights, nines, tens, elevens, twelves];

        return set;
    }; 

    let results = startRolls();

    const percentage = function() {
        let total = 0;
        for (let i = 0; i < results.length; i = i + 1) {
            total += results[i];
        }
        let avgTwos = (results[0] / total).toFixed(5);
        let avgThrees = (results[1] / total).toFixed(5);
        let avgFours = (results[2] / total).toFixed(5);
        let avgFives = (results[3] / total).toFixed(5);
        let avgSixes = (results[4] / total).toFixed(5);
        let avgSevens = (results[5] / total).toFixed(5);
        let avgEights = (results[6] / total).toFixed(5);
        let avgNines = (results[7] / total).toFixed(5);
        let avgTens = (results[8] / total).toFixed(5);
        let avgElevens = (results[9] / total).toFixed(5);
        let avgTwelves = (results[10] / total).toFixed(5);

        console.log('Percentage of rolls by number:');
        console.log('Twos: ' + avgTwos + '% \t\t Threes: ' + avgThrees + '% \t Fours: ' + avgFours);
        console.log('Fivess: ' + avgFives + '% \t Sixes: ' + avgSixes + '% \t Sevens: ' + avgSevens);
        console.log('Eightss: ' + avgEights + '% \t Nines: ' + avgNines + '% \t Tens: ' + avgTens);
        console.log('Elevens: ' + avgElevens + '% \t Twelves: ' + avgTwelves);

        let avgSet = [rolls, avgTwos, avgThrees, avgFours, avgFives, avgSixes, avgSevens, avgEights, avgNines,avgTens,avgElevens, avgTwelves];
        return avgSet;
    };

    let avgAllNums = percentage(results);
    console.log(avgAllNums);

    fs.appendFileSync('./static/percentageData.txt', '\n' + avgAllNums);

};

