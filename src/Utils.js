export function colorTemperatureToRGB(kelvin){

    var temp = kelvin / 100;

    var red, green, blue;

    if( temp <= 66 ){

        red = 255;

        green = temp;
        green = 99.4708025861 * Math.log(green) - 161.1195681661;


        if( temp <= 19){

            blue = 0;

        } else {

            blue = temp-10;
            blue = 138.5177312231 * Math.log(blue) - 305.0447927307;

        }

    } else {

        red = temp - 60;
        red = 329.698727446 * Math.pow(red, -0.1332047592);

        green = temp - 60;
        green = 288.1221695283 * Math.pow(green, -0.0755148492 );

        blue = 255;

    }


    return [
        clamp(red,   0, 255),
        clamp(green, 0, 255),
        clamp(blue,  0, 255)
    ]

}


function clamp( x, min, max ) {

    if(x<min){ return min; }
    if(x>max){ return max; }

    return x;

}

export function getLuminosityByMassMS(m){
    if(m < 0.43)
        return 0.23*Math.pow(m, 2.3)
    else if(m < 2)
        return Math.pow(m, 4)
    else if(m < 20)
        return 1.5*Math.pow(m,3.5)
    else return 3200*m
}

export function getMSLifetimeByMass(m){
    return Math.pow(m, -2.5)
}

export function getTemperatureByMassMS(m){
    return 5740*Math.pow(m, 0.54)
}

export function getRadius(L0, T){
    let L = 3.828*Math.pow(10, 26)*L0

    let R = Math.sqrt(L/(4*Math.PI*5.67*Math.pow(10, -8)*Math.pow(T, 4)))
    let R0 = R/(696340000)
    return R0
}

export function map(x, in_min, in_max, out_min, out_max){
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}