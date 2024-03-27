import { Champion } from "./obj/Champion";

export class champController {
    constructor(champ) {
        self.champ = champ
        if (!champ) {
            self.champ = new Champion()
        }
    }
    
    setType(type) {
      this.type = type;
    }

    setName(name) {
        self.name = name
    }
}
