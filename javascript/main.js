  // Эта палитра создает баланс между природными тонами и технологическими акцентами, подчеркивая экологическую направленность сайта и его ориентацию на использование ИИ для решения экологических задач.

function expandImage(img){
  expanded = img.getAttribute('expanded');
  if (expanded == 'false'){
      img.setAttribute('expanded', true);
      clientWidth = document.documentElement.clientWidth*0.9;
      clienHeight = document.documentElement.clientHeight*0.9;
      let expandedImage = new Image();
      /*if (clientWidth>clienHeight){
        imgWidth = img.naturalWidth;
        imgHeight = img.naturalHeight;
        width = Math.min(clientWidth, imgWidth);
        height = imgHeight * (width/imgWidth);
        expandedImage.setAttribute('width',width);
        expandedImage.setAttribute('height',height);
      } else {
        imgWidth = img.naturalHeight;
        imgHeight = img.naturalWidth;
        width = Math.min(clientWidth, imgHeight);
        height = imgHeight * (width/imgWidth);
        expandedImage.setAttribute('width',width);
        expandedImage.setAttribute('height',height);
        expandedImage.style.transform = "rotate(90deg)";
      }*/
      expandedImage.className = 'expanded-image';
      expandedImage.src = img.src;
      document.body.appendChild(expandedImage);
      expandedImage.addEventListener('click', (e) => {
        document.body.removeChild(expandedImage);
        img.setAttribute('expanded', false);
    })
  }
}

  
class Accordion {
    constructor(el) {
      // Store the <details> element
      this.el = el;
      // Store the <summary> element
      this.summary = el.querySelector('.tooltip-header');
      // Store the <div class="content"> element
      this.content = el.querySelector('.tooltip-body');
  
      // Store the animation object (so we can cancel it if needed)
      this.animation = null;
      // Store if the element is closing
      this.isClosing = false;
      // Store if the element is expanding
      this.isExpanding = false;
      // Detect user clicks on the summary element
      this.summary.addEventListener('click', (e) => this.onClick(e));
    }
  
    onClick(e) {
      // Stop default behaviour from the browser
      e.preventDefault();
      // Add an overflow on the <details> to avoid content overflowing
      this.el.style.overflow = 'hidden';
      // Check if the element is being closed or is already closed
      if (this.isClosing || !this.el.open) {
        this.open();
      // Check if the element is being openned or is already open
      } else if (this.isExpanding || this.el.open) {
        this.shrink();
      }
    }
  
    shrink() {
      // Set the element as "being closed"
      this.isClosing = true;
      
      // Store the current height of the element
      const startHeight = `${this.el.offsetHeight}px`;
      // Calculate the height of the summary
      const endHeight = `${this.summary.offsetHeight}px`;
      
      // If there is already an animation running
      if (this.animation) {
        // Cancel the current animation
        this.animation.cancel();
      }
      
      // Start a WAAPI animation
      this.animation = this.el.animate({
        // Set the keyframes from the startHeight to endHeight
        height: [startHeight, endHeight]
      }, {
        duration: 400,
        easing: 'ease-out'
      });
      
      // When the animation is complete, call onAnimationFinish()
      this.animation.onfinish = () => this.onAnimationFinish(false);
      // If the animation is cancelled, isClosing letiable is set to false
      this.animation.oncancel = () => this.isClosing = false;
    }
  
    open() {
      // Apply a fixed height on the element
      this.el.style.height = `${this.el.offsetHeight}px`;
      // Force the [open] attribute on the details element
      this.el.open = true;
      // Wait for the next frame to call the expand function
      window.requestAnimationFrame(() => this.expand());
    }
  
    expand() {
      // Set the element as "being expanding"
      this.isExpanding = true;
      // Get the current fixed height of the element
      const startHeight = `${this.el.offsetHeight}px`;
      // Calculate the open height of the element (summary height + content height)
      const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;
      
      // If there is already an animation running
      if (this.animation) {
        // Cancel the current animation
        this.animation.cancel();
      }
      
      // Start a WAAPI animation
      this.animation = this.el.animate({
        // Set the keyframes from the startHeight to endHeight
        height: [startHeight, endHeight]
      }, {
        duration: 400,
        easing: 'ease-out'
      });
      // When the animation is complete, call onAnimationFinish()
      this.animation.onfinish = () => this.onAnimationFinish(true);
      // If the animation is cancelled, isExpanding letiable is set to false
      this.animation.oncancel = () => this.isExpanding = false;
    }
  
    onAnimationFinish(open) {
      // Set the open attribute based on the parameter
      this.el.open = open;
      // Clear the stored animation
      this.animation = null;
      // Reset isClosing & isExpanding
      this.isClosing = false;
      this.isExpanding = false;
      // Remove the overflow hidden and the fixed height
      this.el.style.height = this.el.style.overflow = '';
    }
  }
  
  document.querySelectorAll('details').forEach((el) => {
    new Accordion(el);
  });

  function exportToExcel() {
    let thermalEnergyConsumed = +document.getElementById('thermalEnergy_input').value;
    let electroEnergyConsumed = +document.getElementById('electroEnergy_input').value;
    let gasConsumed = +document.getElementById('townGas_input').value;
    let hotWaterConsumed = +document.getElementById('hotWater_input').value;
    
    let hotWater_toEnergy = hotWaterConsumed * consumptionWayToEnergy ['hotWater'];
    let thermalEnergy_toEnergy = thermalEnergyConsumed * consumptionWayToEnergy['thermalEnergy'];
    let townGas_toEnergy = gasConsumed * consumptionWayToEnergy['townGas'];
    let energyConsumed = +electroEnergyConsumed + +hotWater_toEnergy + +thermalEnergy_toEnergy+townGas_toEnergy;
    
    let thermalEnergy_fraction = (100*thermalEnergy_toEnergy / energyConsumed).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2});;
    let hotWater_fraction = (100*hotWater_toEnergy / energyConsumed).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2});;
    let electroEnergy_fraction = (100* +electroEnergyConsumed / energyConsumed).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2});;
    let gasEnergy_fraction = (100* +townGas_toEnergy / energyConsumed).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2});;

    let fuelType=document.getElementById('fuelType_select').value;
    let fuelToEnergyConsumed=fuelToEnergy[fuelType];
    let fuelConsumed = energyConsumed/fuelToEnergyConsumed;
    let fuelToRussian=ToRussian[fuelType];
    let co2Emission = fuelConsumed*fuelToCO2[fuelType]; // Примерный коэффициент выбросов CO2 за 1 кВт*ч (можно заменить на реальный коэффициент);

    let reportTable = 
    `<table id ="report">
        <tr>
            <td>Число жильцов</td>
            <td>${personNumber}</td>
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
            <td>${(electroEnergyConsumed/personNumber).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2})} кВт*ч</td>
        </tr>
        <tr>
            <td>Потреблённая горячая вода</td>
            <td>${hotWaterConsumed} кубометров</td>
            <td>${(hotWaterConsumed/personNumber).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2})} кубометров</td>
        </tr>
        <tr>
            <td>Потреблённое теплоснабжение</td>
            <td>${thermalEnergyConsumed} гигакалорий</td>
            <td>${(thermalEnergyConsumed/personNumber).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2})} гигакалорий</td>
        </tr>
        <tr>
            <td>Потреблённый бытовой газ</td>
            <td>${gasConsumed} кубометров</td>
            <td>${(gasConsumed/personNumber).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2})} кубометров</td>
        </tr>
        <tr>
            <td>Энергозатраты на производство потреблённой горячей воды</td>
            <td>${(hotWater_toEnergy).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2})} кВт*ч</td>
            <td>${(hotWater_toEnergy/personNumber).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2})} кВт*ч</td>
        </tr>    
        <tr>
            <td>Энергозатраты на производство тепла</td>
            <td>${thermalEnergy_toEnergy} кВт*ч</td>
            <td>${(thermalEnergy_toEnergy/personNumber).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2})} кВт*ч</td>
        </tr>
        <tr>
            <td>Энергия, потреблённая при использовании бытового газа</td>
            <td>${(townGas_toEnergy).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2})} кВт*ч</td>
            <td>${(townGas_toEnergy/personNumber).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2})} кВт*ч</td>
        </tr>
        <tr>
            <td>Общее потребление энергии</td>
            <td>${(energyConsumed).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2})} кВт*ч</td>
            <td>${(energyConsumed/personNumber).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2})} кВт*ч</td>
        </tr>
        <tr>
            <td>Доля электроэнергии в потреблении</td>
            <td>${(electroEnergy_fraction).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2})} %</td>
        </tr>
        <tr>
            <td>Доля теплоснабжения в потреблении</td>
            <td>${(thermalEnergy_fraction).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2})} %</td>
        </tr>
        <tr>
            <td>Доля горячей воды в потреблении энергии</td>
            <td>${(hotWater_fraction).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2})} %</td>
        </tr>
        <tr>
            <td>Доля газа в потреблении</td>
            <td>${(gasEnergy_fraction).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2})} %</td>
        </tr>
        <tr>
            <td>Потреблено эквивалента ${fuelToRussian}</td>
            <td>${(fuelConsumed).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2})} кг</td>
            <td>${(fuelConsumed/personNumber).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2})} кг</td>
        </tr>
        <tr>
            <td>Выделено углекислого газа (СО2)</td>
            <td>${(co2Emission).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2})} кг</td>
            <td>${(co2Emission/personNumber).toLocaleString("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:2})} кг</td>
        </tr>
    </table>`;

    //datatype = 'data:application/vnd.ms-excel;base64,';
    fileName = "ecological_footprint.xlsx";
    let doc = new DOMParser().parseFromString(reportTable, "text/html");
    let report = doc.getElementById("report");
    let workBook = XLSX.utils.table_to_book(report, { sheet: "углеродный след" });
    XLSX.writeFile(workBook, fileName);
}

function toggleTooltip() {
    let tooltip = document.getElementById("tooltipPanel");
    if (tooltip.style.display === "none" || !tooltip.style.display) {
      tooltip.style.display = "block";
    } else {
      tooltip.style.display = "none";
    }
  }

 function exportToPDF() {
    window.print();
};

function share(button){
  // клик по кнопке шаринга
    let social = button.getAttribute('data-social');
    // урл текущей страницы
    let urlShare = window.location.href;        
    // открываем окно для репоста
    let url_soc = false;
    text='Посчитай свой углеродный след на основе данных счётчиков ЖКУ и узнай о том, как его сократить.';
  switch (social) {
      case "vk":
          url_soc = "https://vk.com/share.php?url="+urlShare;
          break;
      case "ok":
          url_soc = "https://connect.ok.ru/offer?url="+urlShare;
          break;
      case "tg":
        url_soc = `https://telegram.me/share/url?url=${urlShare}&text=${text}`;
        break;
      case "wa":
        url_soc = `whatsapp://send?url=${urlShare}&text=${text}`;
        break;
      
  }
   
  // открытие нового окна для шаринга
  if(url_soc){
      
      // размеры окна
      var width = 800, height = 500;
      // центруем окно
      var left = (window.screen.width - width) / 2;
      var top = (window.screen.height - height) / 2;
      // открываем окно
      social_window = window.open(url_soc, "share_window", "height=" + height + ",width=" + width + ",top=" + top + ",left=" + left);
      // устанавливаем на окно фокус
      if (social_window){
        social_window.focus();
      }
  }
};


let personNumber = 1;
personBar = document.getElementById("person-bar");
personBar.appendChild(homunculus());

img = document.getElementById('temperature-change-img');
img.setAttribute('expanded',false);
img.addEventListener('click', (e) => expandImage(img));
ogImgUrl = document.getElementById("image").src;
document.querySelector('meta[property="og:image"]').setAttribute("content", ogImgUrl);
document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);

btns = document.getElementsByClassName('share-btn');
Array.prototype.forEach.call(btns, (el) =>{
  el.addEventListener('click', (e) => {
    share(el)
  });
});
