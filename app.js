const counterElement = document.getElementById("counter");
const enemyElement = document.getElementById("enemy");
const upgradeElement = document.getElementById("upgrade1");
const upgrade2Element = document.getElementById("upgrade2")
const damageElement = document.getElementById("current-damage");
const autoDamageElement = document.getElementById("auto-damage");

let count = 0;
let damage = 1;
let autoDamage = 1;
let damageTime = 1000;
let upgrade1Cost = 10;
let upgrade2Cost = 1000;
let dpsLvl = 1;
let damageLvl = 1;
let interval;

function updateCounter() {
    counterElement.textContent = count.toLocaleString("en-US");
}

function updateDamage() {
    damageElement.textContent = "Damage (Level " + damageLvl + "): " + damage.toLocaleString("en-US");
    autoDamageElement.textContent = "DPS (Level " + dpsLvl + "): " + (1 / damageTime * 1000).toLocaleString("en-US");
}

function attack() {
    count += damage;
    updateCounter();
}

function autoAttack() {
    count += autoDamage;
    updateCounter();
}

function buyUpgrade1() {
    if (count >= upgrade1Cost) {
        count -= upgrade1Cost;
        updateCounter();
        damage = Math.ceil(damage * 1.1);
        damageLvl++;
        updateDamage();
        upgrade1Cost = Math.round(upgrade1Cost * 1.2);
        upgradeElement.textContent = "Upgrade Damage: " + upgrade1Cost.toLocaleString("en-US");
    }
}

function buyUpgrade2() {
    if (count >= upgrade2Cost) {
        clearInterval(interval);
        count -= upgrade2Cost;
        damageTime = damageTime / 1.5;
        interval = setInterval(autoAttack, damageTime);
        dpsLvl++;
        updateCounter();
        updateDamage();
        upgrade2Cost = Math.round(upgrade2Cost * 1.2);
        upgrade2Element.textContent = "Upgrade DPS: " + upgrade2Cost.toLocaleString("en-US");
    }
}

