class building {
    constructor(){
        this.building_name = ""
        //0: None, 1: castle, 2: middlecastle, 3: fortress
        this.building_type = 0
        this.castellan = ""
        this.stationed = []
        this.population = 0
        this.food = 0
        this.morale = 0

    }
    set setType(type) { this.type = type }
    get getType() { return this.type }
    set setName(name) { this.name = name }
    get getName() { return this.name }
    get getCastellan() { return this.castellan }
    set setCastellan(castellan) { this.castellan = castellan }
    get getPopulation() { return this.population }
    set setPopulation(population) { this.population = population }
    get getFood() { return this.food }
    set setFood(food) { this.food = food }
    get getMorale() { return this.morale }
    set setMorale(morale) { this.morale = morale }
}

module.exports = building