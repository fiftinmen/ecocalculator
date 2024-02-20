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


function calculate() {
    
    document.getElementById('error').style.display='none';
    let electroEnergyConsumed = document.getElementById('electroEnergy_input').value;
    let hotWaterConsumed = document.getElementById('hotWater_input').value;
    let thermalEnergyConsumed = document.getElementById('thermalEnergy_input').value;
    let gasConsumed = document.getElementById('gas_input').value;

    let gas_toEnergy = gasConsumed * coefficients['methanToEnergy'];
    let hotWater_toEnergy = hotWaterConsumed * coefficients ['hotWaterToEnergy'];
    let thermalEnergy_toEnergy = thermalEnergyConsumed * coefficients ['thermalEnergyToEnergy'];
    let energyConsumed = +electroEnergyConsumed + +hotWater_toEnergy + +thermalEnergy_toEnergy+gas_toEnergy;
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
        document.getElementById('gas_toEnergyConsumed').innerHTML = gas_toEnergy.toFixed(2) +" кВт*ч";
        document.getElementById('totalEnergyConsumed').innerText = energyConsumed.toFixed(2) + " кВт*ч";
        document.getElementById('fuelToRussian').innerText = fuelToRussian;
        document.getElementById('fuelConsumed').innerText = fuelConsumed.toFixed(2)+" кг";
        document.getElementById('co2Emission').innerText = co2Emission.toFixed(2)+" кг";
        
        if (personNumber>1){
            perPersonRows = document.getElementsByClassName('per-person-row');
            console.log(perPersonRows);
            for (let i=0; i<perPersonRows.length;i++){
                perPersonRows[i].style.display="table-row";
            }
            document.getElementById('per-person-hot-water-energy').innerText = (hotWater_toEnergy/personNumber).toFixed(2) +" кВт*ч";
            document.getElementById('per-person-thermal-energy').innerText = (thermalEnergy_toEnergy/personNumber).toFixed(2) +" кВт*ч";
            document.getElementById('per-person-gas-energy').innerText = (gas_toEnergy/personNumber).toFixed(2) +" кВт*ч";
            document.getElementById('per-person-total-energy').innerText = (energyConsumed/personNumber).toFixed(2) +" кВт*ч";
            document.getElementById('per-person-fuel').innerText = (fuelConsumed/personNumber).toFixed(2) +" кг";
            document.getElementById('per-person-co2').innerText = (co2Emission/personNumber).toFixed(2) +" кг";
        } else{
            perPersonRows = document.getElementsByClassName('per-person-row');
            for (let i=0; i<perPersonRows.length;i++){
                perPersonRows[i].style.display="none";
            }
        }
        
        
        document.getElementById('Results').style.display='inline-block';

        // let labels = ['электроэнергия', 'горячая вода','теплота'];
        //let canvasHeight = document.getElementById('canvas').Height;
        let chart = document.getElementById ('chart');
        let canvasWidth = 200;
        let data = [+electroEnergyConsumed, hotWater_toEnergy, thermalEnergy_toEnergy, gas_toEnergy];                
        const colors = ['#781c81', '#83ba6d', '#d92120',"#8a8a66"];
        drawchart (chart, data, colors, canvasWidth , canvasWidth);

        if (thermalEnergy_toEnergy>0)
        {
        let thermalEnergy_fraction = (100*thermalEnergy_toEnergy / energyConsumed).toLocaleString('en-EN',{minimumFractionDigits:0, maximumFractionDigits:2});;
        document.getElementById('thermalEnergy_fraction').innerText = `${thermalEnergy_fraction}% - теплоснабжение`;
        document.getElementById('thermalEnergyChartRow').style.display = "table-row"
        } else {
            document.getElementById('thermalEnergy_fraction').innerText = ``;
            document.getElementById('thermalEnergyChartRow').style.display = "none"
        }
        if (hotWater_toEnergy>0)
        {
            let hotWater_fraction = (100*hotWater_toEnergy / energyConsumed).toLocaleString('en-EN',{minimumFractionDigits:0, maximumFractionDigits:2});;
            document.getElementById('hotwater_fraction').innerText = `${hotWater_fraction}% - горячая вода`;
            document.getElementById('hotWaterChartRow').style.display = "table-row"
        } else {
            document.getElementById('hotwater_fraction').innerText = ``;
            document.getElementById('hotWaterChartRow').style.display = "none"
        }
        
        if (+electroEnergyConsumed>0)
        {
            let electroEnergy_fraction = (100* +electroEnergyConsumed / energyConsumed).toLocaleString('en-EN',{minimumFractionDigits:0, maximumFractionDigits:2});;
            document.getElementById('electroEnergy_fraction').innerText = `${electroEnergy_fraction}% - электричество`;
            document.getElementById('electroEnergyChartRow').style.display = "table-row"
        } else {
            document.getElementById('electroEnergy_fraction').innerText = ``;
            document.getElementById('electroEnergyChartRow').style.display = "none";
        }

        if (+gasConsumed>0)
        {
            let gasEnergy_fraction = (100* +gas_toEnergy / energyConsumed).toLocaleString('en-EN',{minimumFractionDigits:0, maximumFractionDigits:2});
            document.getElementById('gasEnergy_fraction').innerText = `${gasEnergy_fraction}% - бытовой газ`;
            document.getElementById('gasEnergyChartRow').style.display = "table-row"
        } else {
            document.getElementById('gasEnergy_fraction').innerText = ``;
            document.getElementById('gasEnergyChartRow').style.display = "none";
        }

        document.getElementById('chart_stats').style.visibility = 'visible';

    } else {
        document.getElementById('Results').style.display='none';
        document.getElementById('error').style.display='block';
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

function exportToExcel() {
    let thermalEnergyConsumed = +document.getElementById('thermalEnergy_input').value;
    let electroEnergyConsumed = +document.getElementById('electroEnergy_input').value;
    let gasConsumed = +document.getElementById('gas_input').value;
    let hotWaterConsumed = +document.getElementById('hotWater_input').value;
    
    let hotWater_toEnergy = hotWaterConsumed * coefficients ['hotWaterToEnergy'];
    let thermalEnergy_toEnergy = thermalEnergyConsumed * coefficients ['thermalEnergyToEnergy'];
    let gas_toEnergy = gasConsumed * coefficients['methanToEnergy'];
    let energyConsumed = +electroEnergyConsumed + +hotWater_toEnergy + +thermalEnergy_toEnergy+gas_toEnergy;
    
    let thermalEnergy_fraction = (100*thermalEnergy_toEnergy / energyConsumed).toLocaleString('en-EN',{minimumFractionDigits:0, maximumFractionDigits:2});;
    let hotWater_fraction = (100*hotWater_toEnergy / energyConsumed).toLocaleString('en-EN',{minimumFractionDigits:0, maximumFractionDigits:2});;
    let electroEnergy_fraction = (100* +electroEnergyConsumed / energyConsumed).toLocaleString('en-EN',{minimumFractionDigits:0, maximumFractionDigits:2});;
    let gasEnergy_fraction = (100* +gas_toEnergy / energyConsumed).toLocaleString('en-EN',{minimumFractionDigits:0, maximumFractionDigits:2});;

    let fuelType=document.getElementById('fuelType_select').value;
    let fuelToEnergyConsumed=coefficients[fuelType+'ToEnergy'];
    let fuelConsumed = energyConsumed/fuelToEnergyConsumed;
    let fuelToCO2=coefficients[fuelType+'ToCO2'];
    let fuelToRussian=coefficients[fuelType+'ToRussian1'];
    let co2Emission = fuelConsumed*fuelToCO2; // Примерный коэффициент выбросов CO2 за 1 кВт*ч (можно заменить на реальный коэффициент);

    let statsTable = 
    `<table id ="report">
        <tr>
            <td>Число жильцов</td>
            <td>${personNumber}</td>
            <td></td>
        </tr>   
        <tr style="background-color: black;">
            <td></td>
            <td></td>
            <td></td>
        </tr> 
        <tr>
            <td>Категория потребления</td>
            <td>Объём потребления</td>
            <td>На человека</td>
        </tr>
        <tr>
            <td>Потреблённая электроэнергия</td>
            <td>${electroEnergyConsumed} кВт*ч</td>
            <td>${electroEnergyConsumed/personNumber} кВт*ч</td>
        </tr>
        <tr>
            <td>Потреблённая горячая вода</td>
            <td>${hotWaterConsumed} кубометров</td>
        </tr>
        <tr>
            <td>Потреблённое теплоснабжение</td>
            <td>${thermalEnergyConsumed} гигакалорий</td>
            <td>${thermalEnergyConsumed/personNumber} гигакалорий</td>
        </tr>
        <tr>
            <td>Потреблённый бытовой газ</td>
            <td>${gasConsumed} кубометров</td>
            <td>${gasConsumed/personNumber} кубометров</td>
        </tr>
        <tr>
            <td>Энергозатраты на производство потреблённой горячей воды</td>
            <td>${hotWater_toEnergy} кВт*ч</td>
            <td>${hotWater_toEnergy/personNumber} кВт*ч</td>
        </tr>    
        <tr>
            <td>Энергозатраты на производство тепла</td>
            <td>${thermalEnergy_toEnergy} кВт*ч</td>
            <td>${thermalEnergy_toEnergy/personNumber} кВт*ч</td>
        </tr>
        <tr>
            <td>Энергия, потреблённая при использовании бытового газа</td>
            <td>${gas_toEnergy} кВт*ч</td>
            <td>${gas_toEnergy/personNumber} кВт*ч</td>
        </tr>
        <tr>
            <td>Общее потребление энергии</td>
            <td>${energyConsumed} кВт*ч</td>
            <td>${energyConsumed/personNumber} кВт*ч</td>
        </tr>
        <tr>
            <td>Доля электроэнергии в потреблении</td>
            <td>${electroEnergy_fraction} %</td>
        </tr>
        <tr>
            <td>Доля теплоснабжения в потреблении</td>
            <td>${thermalEnergy_fraction} %</td>
        </tr>
        <tr>
            <td>Доля горячей воды в потреблении энергии</td>
            <td>${hotWater_fraction} %</td>
        </tr>
        <tr>
            <td>Доля газа в потреблении</td>
            <td>${gasEnergy_fraction} %</td>
        </tr>
        <tr>
            <td>Потреблено эквивалента ${fuelToRussian}</td>
            <td>${fuelConsumed} кг</td>
            <td>${fuelConsumed/personNumber} кг</td>
        </tr>
        <tr>
            <td>Выделено углекислого газа (СО2)</td>
            <td>${co2Emission} кг</td>
            <td>${co2Emission/personNumber} кг</td>
        </tr>
    </table>`;

    

	let excelTemplate = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"xmlns="http://www.w3.org/TR/REC-html40"> ' +
		'<head> ' +
        '<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Sheet1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->        '+
        '<style> table, td {border:thin solid gray} table {border-collapse:collapse}</style>'+
		'<meta http-equiv="content-type" content="text/plain; charset=UTF-8"/> ' +
		'</head> ' +
		'<body> ' +
        statsTable+
		'</body> ' +
		'</html>';

    excelTemplate = excelTemplate.replace('.',',');

    let link = document.createElement("a");
	let datatype = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
    //datatype = 'data:application/vnd.ms-excel;base64,';
    fileName = "ecological_footprint.xlsx";
    link.download = fileName;
	link.href = datatype + bytesToBase64(new TextEncoder().encode(excelTemplate));
    //link.click();
    //var elt = document.getElementById('tbl_exporttable_to_xls');
    let doc = new DOMParser().parseFromString(statsTable, "text/html");
    let report = doc.getElementById("report")
    console.log(report);
    let workBook = XLSX.utils.table_to_book(report, { sheet: "углеродный след" });
    XLSX.writeFile(workBook, fileName);
}