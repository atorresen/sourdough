function sourdoughTiming() {
    let startString = document.getElementById("startTime").value;
    let start = timeStringToDate(startString);

    let ferment = document.getElementById("fermentInput").value * 1;
    let proof = document.getElementById("proofInput").value * 1;

    let feed = [addHours(start, -12), addHours(start, -6)];

    let mix = start;

    let stretchIntervals = [1/2, 1, 3/2, 2]; // stretch at 30-minute intervals
    let stretches = stretchIntervals.map((x) => addHours(mix, x));

    let preshape = addHours(start, ferment);
    let shape = addHours(preshape, 1/3); // 20 minutes after preshape

    let preheat = addHours(shape, proof - 1/2); // 30 minutes before proof is finished

    let bakeLidOn = addHours(shape, proof);
    let bakeLidOff = addHours(bakeLidOn, 1/3); // 20 minutes after starting bake
    let cool = addHours(bakeLidOff, 1/2); // 30 minutes after taking lid off
    
    let res = [feed, mix, stretches, preshape, shape, preheat, bakeLidOn, bakeLidOff, cool];
    return(res);
}

function timeStringToDate(str) {
    let h = str.split(":")[0] * 1;
    let m = str.split(":")[1] * 1;
    let res = new Date();
    res.setHours(h);
    res.setMinutes(m);
    res.setSeconds(0);
    return res
}

function addHours(time, hours) {
    return new Date(time.getTime() + (60 * hours * 60000));
}

function displayTime(time) {
    timeArray = [time].flat();
    res = [];
    for (let i = 0; i < timeArray.length; i++) {
        let t = new Date(timeArray[i]);
        let h = t.getHours();
        let m = t.getMinutes();

        let ampm;
        if (h < 12) {
            ampm = " am"
        } else {
            ampm = " pm"
        };

        h = (h % 12);
        if (h == 0) { h = 12 };

        m = String(m).padStart(2, "0");

        res.push(h + ":" + m + ampm)
    }
    if (res.length == 2) {
        res = (res[0] + "–<br>" + res[1])
    } else if (res.length == 4) {
        res = res[0] + "<br>" + res[1] + "<br>" + res[2] + "<br>" + res[3]
    }
    return res
}

function display() {
    let times = sourdoughTiming();
    let tableRows = ["feed", "mix", "stretch", "shape", "proof", "preheat", "bake", "lidOff", "cool"];
    for (let i = 0; i < times.length; i++) {
        document.getElementById(tableRows[i]).innerHTML = displayTime(times[i])
    };

    let sentencesDiv = document.getElementById("sentences");
    sentencesDiv.innerHTML = "";

    let displayTimes = (times.flat()).map((x) => displayTime(x));

    // TODO: add phrasing for "previous day" or "night before" when relevant

    let sentences = [
        "Between " + displayTimes[0] + " and " + displayTimes[1] + ", mix 92g starter, 92g flour, and 92g water. \
        Leave in a loosely covered jar in a warm place to ferment for 6 – 12 hours.",
        "At " +  displayTimes[2] + ", mix 92g starter (1/3 cup), 460g flour (3 2/3 cups), 280g water (1 cup), and 9g salt. \
        Knead 2-5 mins, adding up to 50g more water if necessary. Let sit in a warm place.",
        "At " + displayTimes[3] + ", " + displayTimes[4] + ", " + displayTimes[5] + ", and " + displayTimes[6] + ", stretch the dough. \
        Let the dough continue sitting for 1-2 more hours.",
        "At " + displayTimes[7] + ", shape the dough into a loaf and leave uncovered for 20 minutes.",
        "At " + displayTimes[8] + ", place the dough in a proofing basket and let sit covered for 2-4 hours.",
        "At " + displayTimes[9] + ", preheat the oven to 450°F with a dutch oven inside.",
        "At " + displayTimes[10] + " bake for 20 minutes with the lid on, then at " + displayTimes[11] + " remove the lid and continue baking for 30 more minutes.",
        "At " + displayTimes[12] +  ", remove the bread and let cool for 2 hours."
    ];
    sentences.forEach(str => {
        let sentence = document.createElement("p");
        sentence.innerText = str;
        sentencesDiv.appendChild(sentence)
    });
}

display();