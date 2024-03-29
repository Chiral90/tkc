class champion {
    constructor(name="", type=0){
        this.name = name
        //0: None, 1: intelligence, 2: force, 3: virtue
        this.type = type
    }
    set setType(type) {
        this.type = type
    }
    get getType() {
        return this.type
    }
    set setName(name) {
        this.name = name
    }
    get getName() {
        return this.name
    }
    
    innerMethod(){
      console.log(this.type + " / " + this.name + " !");
    }
}

module.exports = champion