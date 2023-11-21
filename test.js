const { remote } = require('webdriverio');
const fs = require('fs');

async function main() {
  const caps = {
    "platformName": "Android",
    "appium:deviceName": "Redmi 10 2022",
    "appium:ensureWebviewsHavePages": true,
    "appium:nativeWebScreenshot": true,
    "appium:newCommandTimeout": 3600,
    "appium:connectHardwareKeyboard": true
  };

  const driver = await remote({
    protocol: "http",
    hostname: "127.0.0.2",
    port: 4808,
    path: "/wd/hub",
    capabilities: caps
  });

  const logAction = (action, element) => {
    const logMessage = `${action}: ${element.selector}`;
    console.log(logMessage);
    fs.appendFileSync('test.log', logMessage + '\n', 'utf-8');
  };

  const findAndOperate = async (xpath, operation, value) => {
    const element = await driver.$(xpath);
    await element.waitForExist({ timeout: 5000 });

    try {
      switch (operation) {
        case 'click':
          await element.click();
          logAction('Click', element);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Error during ${operation} on ${element.selector}: ${error.message}`);
      fs.appendFileSync('test.log', `Error: ${error.message}\n`, 'utf-8');
    }
  };

  try {
    await findAndOperate('//android.widget.TextView[@text="Куда едем?"]', 'click');
    await findAndOperate('//android.widget.TextView[@text="улица Қорӣ Ниёзӣ 3"]', 'click');
    await findAndOperate('//android.widget.ImageView[@content-desc="car_eco"]', 'click');
    await findAndOperate('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View[6]/android.view.View[3]/android.widget.Button', 'click');
    await findAndOperate('//android.widget.TextView[@text="Минивэн"]', 'click');
    await findAndOperate('//android.widget.TextView[@text="Добавить надбавки"]', 'click');

    const tapActions = [
      { action: 'tap', x: 949, y: 1705 },
      { action: 'tap', x: 936, y: 1569 },
      { action: 'tap', x: 944, y: 1434 },
      { action: 'tap', x: 936, y: 1569 }
    ];

    for (const action of tapActions) {
      await driver.touchAction([{ action: action.action, x: action.x, y: action.y }]);
    }
  } catch (error) {
    console.error(`Unexpected error: ${error.message}`);
    fs.appendFileSync('test.log', `Unexpected error: ${error.message}\n`, 'utf-8');
  } finally {
    await driver.deleteSession();
  }
}

main();
