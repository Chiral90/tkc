export class Champion {
    constructor(){
        self.type = 0
        self.name = ""
    }
    set setType(type) {
        self.type = type
    }
    get getType() {
        return self.type
    }
    set setName(name) {
        self.name = name
    }
    get getName() {
        return self.name
    }
    
    innerMethod(){
      console.log(this.type + " / " + this.name + " !");
    }
  }