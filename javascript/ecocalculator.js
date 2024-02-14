const energy_input_labels_by_consumption_way ={
electroEnergy:"Введите количество потреблённой энергии <b>(в киловатт*часах)</b>",
thermalEnergy:"Введите количество потреблённой энергии <b>(в гигакалориях)</b>",
hotWater:"Введите количество потреблённой горячей воды <b>(в кубометрах)</b>"
};
const coefficients={   
    //способ потребления энергии
    electroEnergy:'электроэнергия',
    thermalEnergy:'теплоэнергия',
    hotWater:'горячая вода',

    //
    electroEnergyToEnergy:1,
    thermalEnergyToEnergy:1162.22, //1 Гкал = 4,184 ГДж = 0,001162222 ГВт*ч = 1,162222 МВт*ч = 1162,22 кВт*ч
    hotWaterToEnergy:40.678, //35000 ккал на нагрев 1 м3 воды с 25 до мин. нормативной температур 60 =  146440 кДж/м3 = 40,6(7) кВт*час
    

    //коэффициенты перевода 1 кг топлива в энергию, кВт*ч
    oilToEnergy:12.4589915281851, //кВт*ч энергии на 1 кг нефти
    solarOilToEnergy:11.9,
    gasolineToEnergy:11.2,
    keroseneToEnergy:12,
    petrolToEnergy:12.2,
    methanToEnergy:13.8,
    liquidGasToEnergy:12.5,
    naturalGasToEnergy:9.3,
    propaneToEnergy:12.6,
    ethileneToEnergy:13.3,
    hydrogenToEnergy:33.3,
    coalToEnergy:7.5,
    brownCoalToEnergy:3.6,
    anthraciteToEnergy:7.8,
    charcoalToEnergy:7.8, //древесный уголь
    peatToEnergy:3.6,   //торф, влажность 40%
    peatBriquettesToEnergy:4.9, //торфяные брикеты, влажность 15%
    energyToOil:1/12.4589915281851, //кг нефти на 1 кВт*ч энергии
    //коэффициенты выбросов СО2 при производстве энергии на 1 кг топлива
    naturalGasToCO2:1.603, //природный газ
    coalToCO2:3.581, //уголь
    peatBriquettesToCO2:4.412, //торф
    solarOilToCO2:2.172, //дизельное топливо (солярка)
    keroseneToCO2:2.109, //керосин
    petrolToCO2:2.013, //бензин
    gasolineToCO2:3.223, //мазут
    oilToCO2:3.15, //нефть
    //названия видов топлива на русском
    naturalGasToRussian:'природный газ',
    coalToRussian:'каменный уголь',
    peatBriquettesToRussian:'торфяные брикеты',
    solarOilToRussian:'дизельное топливо',
    keroseneToRussian:'керосин',
    petrolToRussian:'бензин',
    gasolineToRussian:'мазут',
    oilToRussian:'нефть',

    //названия видов топлива на русском родпадеж
    naturalGasToRussian1:'природного газа',
    coalToRussian1:'каменного угля',
    peatBriquettesToRussian1:'торфяных брикетов',
    solarOilToRussian1:'дизельного топлива',
    keroseneToRussian1:'керосина',
    petrolToRussian1:'бензина',
    gasolineToRussian1:'мазута',
    oilToRussian1:'нефти',
};

function calculateCO2() {
    
    document.getElementById('Error').style.display='none';
    let electroEnergyConsumed = document.getElementById('electroEnergy_input').value;
    let hotWaterConsumed = document.getElementById('hotWater_input').value;
    let thermalEnergyConsumed = document.getElementById('thermalEnergy_input').value;
    let hotWater_toEnergy = hotWaterConsumed * coefficients ['hotWaterToEnergy'];
    let thermalEnergy_toEnergy = thermalEnergyConsumed * coefficients ['thermalEnergyToEnergy'];
    let energyConsumed = +electroEnergyConsumed + +hotWater_toEnergy + +thermalEnergy_toEnergy;
    if (energyConsumed>0)
    {
        
        let fuelType=document.getElementById('fuelType_select').value;
        let fuelToEnergyConsumed=coefficients[fuelType+'ToEnergy'];
        let fuelConsumed = energyConsumed/fuelToEnergyConsumed;
        let fuelToCO2=coefficients[fuelType+'ToCO2'];
        let fuelToRussian=coefficients[fuelType+'ToRussian1'];
        let co2Emission = fuelConsumed*fuelToCO2; // Примерный коэффициент выбросов CO2 за 1 кВт*ч (можно заменить на реальный коэффициент);
        
        document.getElementById('hotWater_toEnergyConsumed').innerHTML = hotWater_toEnergy.toFixed(2) +" кВт*ч";
        document.getElementById('thermalEnergy_toEnergyConsumed').innerHTML = thermalEnergy_toEnergy.toFixed(2) +" кВт*ч";
        document.getElementById('totalEnergyConsumed').innerText = energyConsumed.toFixed(2) + " кВт*ч";
        document.getElementById('fuelToRussian').innerText = fuelToRussian;
        document.getElementById('fuelConsumed').innerText = fuelConsumed.toFixed(2)+" кг";
        document.getElementById('co2Emission').innerText = co2Emission.toFixed(2)+" кг";
        document.getElementById('Results').style.display='inline-block';
        
        
        //let canvasHeight = document.getElementById('canvas').Height;
        let chart = document.getElementById ('chart');
        let canvasWidth = chart.width-100;
        let data = [+electroEnergyConsumed, hotWater_toEnergy, thermalEnergy_toEnergy];        
        let labels = ['электроэнергия', 'горячая вода','теплота'];
        const colors = ['#781c81', '#83ba6d', '#d92120'];
        drawchart (chart, data, labels, colors, canvasWidth , canvasWidth);

        if (thermalEnergy_toEnergy>0)
        {
        let thermalEnergy_fraction = (100*thermalEnergy_toEnergy / energyConsumed).toLocaleString('en-EN',{minimumFractionDigits:0, maximumFractionDigits:2});;
        document.getElementById('thermalEnergy_fraction').innerText = `${thermalEnergy_fraction}% - электричество`;
        }
        if (hotWater_toEnergy>0)
        {
            let hotWater_fraction = (100*hotWater_toEnergy / energyConsumed).toLocaleString('en-EN',{minimumFractionDigits:0, maximumFractionDigits:2});;
            document.getElementById('hotwater_fraction').innerText = `${hotWater_fraction}% - горячая вода`;
        }
        
        if (+electroEnergyConsumed>0)
        {
            let electroEnergy_fraction = (100* +electroEnergyConsumed / energyConsumed).toLocaleString('en-EN',{minimumFractionDigits:0, maximumFractionDigits:2});;
            document.getElementById('electroEnergy_fraction').innerText = `${electroEnergy_fraction}% - теплоснабжение`;
        }
        document.getElementById('chart_stats').style.visibility = 'visible';

    } else {
        document.getElementById('Results').style.display='none';
        document.getElementById('Error').style.display='block';
    }
};