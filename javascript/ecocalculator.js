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
        let hotWater_toEnegy_fromTotal = (hotWater_toEnergy * 100 / energyConsumed).toFixed();
        let thermalEnergy_toEnegy_fromTotal = (thermalEnergy_toEnergy * 100 / energyConsumed).toFixed();
        let electroEnergy_fromEnergyConsumed = (electroEnergyConsumed * 100 / energyConsumed).toFixed();
        document.getElementById ('electroEnergy_fromEnergyConsumed').innerText = electroEnergy_fromEnergyConsumed + "%";
        document.getElementById('hotWater_toEnergyConsumed').innerHTML = hotWater_toEnergy.toFixed(2) +" кВт*ч </br>("+ hotWater_toEnegy_fromTotal +"% от общей суммы)";
        document.getElementById('thermalEnergy_toEnergyConsumed').innerHTML = thermalEnergy_toEnergy.toFixed(2) +" кВт*ч </br>("+ thermalEnergy_toEnegy_fromTotal +"% от общей суммы)";
        document.getElementById('totalEnergyConsumed').innerText = energyConsumed.toFixed(2) + " кВт*ч";
        document.getElementById('fuelToRussian').innerText = fuelToRussian;
        document.getElementById('fuelConsumed').innerText = fuelConsumed.toFixed(2)+" кг";
        document.getElementById('co2Emission').innerText = co2Emission.toFixed(2)+" кг";
        document.getElementById('Results').style.display='block';
        let chart = document.getElementById ('Chart');
        let data = [+electroEnergyConsumed, hotWater_toEnergy, thermalEnergy_toEnergy];
        console.log(data);
        let labels = ['электроэнергия', 'горячая вода','теплота'];
        let colors = palette('tol-rainbow', 3);
        colors = ['#'+colors[0],'#'+colors[1],'#'+colors[2]]
        drawchart (chart, data, labels, colors, 700 , 400);

    } else {
        document.getElementById('Results').style.display='none';
        document.getElementById('Error').style.display='block';
    }
};