
const consumptionWays={
    electroEnergy:'электроэнергия',
    thermalEnergy:'теплоэнергия',
    hotWater:'горячая вода',
    townGas:'бытовой газ'
}

sources = [
    ['Удельная теплота сгорания (теплотворная способность). Высшая и низшая теплота сгорания. Потребность в кислороде // Инженерный справочник. Таблицы.','https://dpva.ru/Guide/GuidePhysics/GuidePhysicsHeatAndTemperature/ComnustionEnergy/'],
    ['Pehl, M., Arvesen, A., Humpenöder, F., Popp, A., Hertwich, E. G., & Luderer, G. (2017). Understanding future emissions from low-carbon power systems by integration of life-cycle assessment and integrated energy modelling. Nature Energy, 2(12), 939-945.','https://www.nature.com/articles/s41560-017-0032-9.epdf?sharing_token=HwFZqxm__Ggi0rKWPhyXoNRgN0jAjWel9jnR3ZoTv0PrhuJrzSPO9ccGqFarI4uqr80HaQ7J1c49McVGZ5lipR_Gnbik4oykLhJMImDbIN66JzT6xj-MOKEqYV7l5O1PUG2XNpAyx35rDPdAR1PHDzdJfk3YXOz0Z4ubjEyC4IQZ4Op9SxGJkVZ6yGG10cJjn6Krxy2riw8IqaT2DNl1rc1wLgkIt2vhWjIzlJYBUp4%3D&tracking_referrer=www.carbonbrief.org'],
    ['https://en.wikipedia.org/wiki/Heat_of_combustion#cite_note-NIST-11'],
    ['Engineering ToolBox. Combustion Heat','https://www.engineeringtoolbox.com/standard-heat-of-combustion-energy-content-d_1987.html'],
    ]

const consumptionWayToEnergy={
    electroEnergy:1,
    thermalEnergy:1162.22, //1 Гкал = 4,184 ГДж = 0,001162222 ГВт*ч = 1,162222 МВт*ч = 1162,22 кВт*ч
    hotWater:40.678, //35000 ккал на нагрев 1 м3 воды с 25 до мин. нормативной температур 60 =  146440 кДж/м3 = 40,6(7) кВт*час
    townGas:14.5,}

const fuelToEnergy ={
    //коэффициенты перевода 1 кг топлива в энергию, кВт*ч
    oil:12.4589915281851, //кВт*ч энергии на 1 кг нефти
    solarOil:12.2, //дизель
    gasoline:11.2,
    kerosene:12.4,
    petrol:12.2,
    methan:14.5,
    liquidGas:12.5,
    naturalGas:13.3,
    propane:13.4,
    ethilene:13.3,
    hydrogen:36,
    coal:9,
    brownCoal:4.1,
    anthracite:9,
    charcoal:6, //древесный уголь
    peat:3.6,   //торф, влажность 40%
    peatBriquettes:4.1, //торфяные брикеты, влажность 15%
}

const ToRussian = {
    naturalGas:'природный газ',
    coal:'каменный уголь',
    peatBriquettes:'торфяные брикеты',
    solarOil:'дизельное топливо',
    kerosene:'керосин',
    petrol:'бензин',
    gasoline:'мазут',
    oil:'нефть',
};

const ToRussianGenitive = {
    naturalGas:'природного газа',
    coal:'каменного угля',
    peatBriquettes:'торфяных брикетов',
    solarOil:'дизельного топлива',
    kerosene:'керосина',
    petrol:'бензина',
    gasoline:'мазута',
    oil:'нефти',   
}

const fuelToCO2 ={
    //коэффициенты выбросов СО2 при производстве энергии на 1 кг топлива
    naturalGas:1.603, //природный газ
    coal:3.581, //уголь
    peatBriquettes:4.412, //торф
    solarOil:2.172, //дизельное топливо (солярка)
    kerosene:2.109, //керосин
    petrol:2.013, //бензин
    gasoline:3.223, //мазут
    oil:3.15, //нефть
    nuclear: 0.004,
    //коэффициенты выбросов CO2 в кг на 1 кВт*ч произведённой энергии от возобновляемых источников энергии
    solar: 0.006,
    wind: 0.004,
    hydro: 0.097,
    bioEnergy: 0.098,
}

function setHeight() {
    document.getElementById("results").height="1000px";
    console.log('aa');
}

function calculate() {
    
    document.getElementById('error').style.display='none';
    let electroEnergyConsumed = document.getElementById('electroEnergy_input').value;
    let hotWaterConsumed = document.getElementById('hotWater_input').value;
    let thermalEnergyConsumed = document.getElementById('thermalEnergy_input').value;
    let gasConsumed = document.getElementById('townGas_input').value;

    let townGas_toEnergy = gasConsumed * consumptionWayToEnergy['townGas'];
    let hotWater_toEnergy = hotWaterConsumed * consumptionWayToEnergy ['hotWater'];
    let thermalEnergy_toEnergy = thermalEnergyConsumed * consumptionWayToEnergy ['thermalEnergy'];
    let energyConsumed = +electroEnergyConsumed + +hotWater_toEnergy + +thermalEnergy_toEnergy+townGas_toEnergy;
    if (energyConsumed>0)
    {
        
        let fuelType=document.getElementById('fuelType_select').value;
        let fuelToEnergyConsumed=fuelToEnergy[fuelType];
        let fuelConsumed = energyConsumed/fuelToEnergyConsumed;
        let fuelToRussian=ToRussianGenitive[fuelType];
        let co2Emission = fuelConsumed*fuelToCO2[fuelType]; // Примерный коэффициент выбросов CO2 за 1 кВт*ч (можно заменить на реальный коэффициент);

        document.getElementById('hotWater_toEnergyConsumed').innerHTML = hotWater_toEnergy.toFixed(2) +" кВт*ч";
        document.getElementById('thermalEnergy_toEnergyConsumed').innerHTML = thermalEnergy_toEnergy.toFixed(2) +" кВт*ч";
        document.getElementById('townGas_toEnergyConsumed').innerHTML = townGas_toEnergy.toFixed(2) +" кВт*ч";
        document.getElementById('totalEnergyConsumed').innerText = energyConsumed.toFixed(2) + " кВт*ч";
        document.getElementById('fuelToRussian').innerText = fuelToRussian;
        document.getElementById('fuelConsumed').innerText = fuelConsumed.toFixed(2)+" кг";
        document.getElementById('co2Emission').innerText = co2Emission.toFixed(2)+" кг";
        
        if (personNumber>1){
            perPersonRows = document.getElementsByClassName('per-person-row');
            
            for (let i=0; i<perPersonRows.length;i++){
                perPersonRows[i].style.display="table-row";
            }
            document.getElementById('per-person-hot-water-energy').innerText = (hotWater_toEnergy/personNumber).toFixed(2) +" кВт*ч";
            document.getElementById('per-person-thermal-energy').innerText = (thermalEnergy_toEnergy/personNumber).toFixed(2) +" кВт*ч";
            document.getElementById('per-person-town-gas-energy').innerText = (townGas_toEnergy/personNumber).toFixed(2) +" кВт*ч";
            document.getElementById('per-person-total-energy').innerText = (energyConsumed/personNumber).toFixed(2) +" кВт*ч";
            document.getElementById('per-person-fuel').innerText = (fuelConsumed/personNumber).toFixed(2) +" кг";
            document.getElementById('per-person-co2').innerText = (co2Emission/personNumber).toFixed(2) +" кг";
            document.getElementById('before-last-row').className='row-border';
        } else{
            perPersonRows = document.getElementsByClassName('per-person-row');
            for (let i=0; i<perPersonRows.length;i++){
                perPersonRows[i].style.display="none";
            }
            document.getElementById('before-last-row').className='row-no-border';
        }
            document.getElementById('results').style.display="block";
        
        let chart = document.getElementById ('chart');
        let canvasWidth = 200;
        let data = [+electroEnergyConsumed, hotWater_toEnergy, thermalEnergy_toEnergy, townGas_toEnergy];                
        const colors = ['#781c81', '#83ba6d', '#d92120',"#8a8a66"];
        drawchart (chart, data, colors, canvasWidth , canvasWidth);
        let maxConsumptionType ='';
        let maxConsumptionFraction = 0;
        let whichRussian = 'которого';

        if (thermalEnergy_toEnergy>0)
        {
        let thermalEnergy_fraction = (100*thermalEnergy_toEnergy / energyConsumed).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2});;
        document.getElementById('thermalEnergy_fraction').innerText = `${thermalEnergy_fraction}% - отопление`;
        document.getElementById('thermalEnergyChartRow').style.display = "table-row"
        maxConsumptionType = 'отопление';
        maxConsumptionFraction = thermalEnergy_fraction;
        } else {
            document.getElementById('thermalEnergy_fraction').innerText = ``;
            document.getElementById('thermalEnergyChartRow').style.display = "none"
        }
        if (hotWater_toEnergy>0)
        {
            let hotWater_fraction = (100*hotWater_toEnergy / energyConsumed).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2});;
            document.getElementById('hotwater_fraction').innerText = `${hotWater_fraction}% - горячая вода`;
            document.getElementById('hotWaterChartRow').style.display = "table-row";
            if (hotWater_fraction > maxConsumptionFraction){
                maxConsumptionType = 'горячая вода';
                maxConsumptionFraction = hotWater_fraction;
                whichRussian = 'которой';
            };

        } else {
            document.getElementById('hotwater_fraction').innerText = ``;
            document.getElementById('hotWaterChartRow').style.display = "none"
        }
        
        if (+electroEnergyConsumed>0)
        {
            let electroEnergy_fraction = (100* +electroEnergyConsumed / energyConsumed).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2});;
            document.getElementById('electroEnergy_fraction').innerText = `${electroEnergy_fraction}% - электричество`;
            document.getElementById('electroEnergyChartRow').style.display = "table-row"
            if (electroEnergy_fraction > maxConsumptionFraction){
                maxConsumptionType = 'электричество';
                maxConsumptionFraction = electroEnergy_fraction;
            }
        } else {
            document.getElementById('electroEnergy_fraction').innerText = ``;
            document.getElementById('electroEnergyChartRow').style.display = "none";
        }

        if (+gasConsumed>0)
        {
            let gasEnergy_fraction = (100* +townGas_toEnergy / energyConsumed).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2});
            document.getElementById('gasEnergy_fraction').innerText = `${gasEnergy_fraction}% - бытовой газ`;
            document.getElementById('gasEnergyChartRow').style.display = "table-row";
            if (gasEnergy_fraction > maxConsumptionFraction) {
                maxConsumptionFraction = gasEnergy_fraction;
                maxConsumptionType = 'бытовой газ';
            }
        } else {
            document.getElementById('gasEnergy_fraction').innerText = ``;
            document.getElementById('gasEnergyChartRow').style.display = "none";
        }
        document.getElementById('max-consumption').innerText = `${maxConsumptionType}, доля ${whichRussian} составляет ${maxConsumptionFraction}%`;
        document.getElementById('chart_stats').style.visibility = 'visible';
        document.getElementById("export-results-section").style.visibility = 'visible';

    } else {
        document.getElementById('results').style.display='none';
        document.getElementById('error').style.display='block';
        document.getElementById("export-results-section").style.visibility = 'hidden';
    }
    
};

function plusPerson(){
    let personBar = document.getElementById("person-bar");
    personNumber = personNumber + 1;
    personBar.appendChild(homunculus(personNumber));
    document.getElementById("person-number").innerText = personNumber;
}

function minusPerson(){
    if (personNumber>1){
        lastHomunculus = document.querySelector(`[person-number="${personNumber}"]`);
        personBar = document.getElementById('person-bar');
        personBar.removeChild(lastHomunculus);
        personNumber = personNumber - 1;
        document.getElementById("person-number").innerText = personNumber;
    }
}

function bytesToBase64(bytes) {
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString);
  }
  