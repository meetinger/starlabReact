import {data} from "./mass1.mjs"
let fs = require('fs');

let ext = data["data"]

let converted = []

for(let i of ext){
    converted.push({
        structure: false,
        properties:{
            luminosity: i.lum,
            temperature: i.temp,
            stage: i.type,
            age: i.t,
            radius: i.radius,
            mass: i.mass
        }
    })
}


fs.writeFile("mass.mjs", "export let data = "+converted)