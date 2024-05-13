class champion {
    constructor(id, name, type, leadership, team){
        this.user_id = id;
        this.champ_name = name;
        //0: None, 1: intelligence, 2: force, 3: virtue
        this.champ_type = type;
        this.leadership = leadership;
        this.team = team;
        this.own_castles = '';
        this.location = '';
    }
}

module.exports = champion