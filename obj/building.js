class building {
    constructor(building_name, building_type, castellan, population, food, morale){
        this.building_name = building_name;
        //0: None, 1: castle, 2: middlecastle, 3: fortress
        this.building_type = building_type;
        this.castellan = castellan;
        this.population = population;
        this.food = food;
        this.morale = morale;
        this.stationed;
    }
    set setBuildingType(building_type) { this.building_type = building_type }
    get getBuildingtype() { return this.building_type }
    set setBuildingName(building_name) { this.building_name = building_name }
    get getBuildingName() { return this.building_name }
    get getCastellan() { return this.castellan }
    set setCastellan(castellan) { this.castellan = castellan }
    get getPopulation() { return this.population }
    set setPopulation(population) { this.population = population }
    get getFood() { return this.food }
    set setFood(food) { this.food = food }
    get getMorale() { return this.morale }
    set setMorale(morale) { this.morale = morale }
    get getStationed() { return this.stationed };
    set setStationed(stationed) { this.stationed = stationed }
}

module.exports = building