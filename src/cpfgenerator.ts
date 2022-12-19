
export function cpfGenerator(){

    let digits: number[] = [];

    // pseudorandomize first 9 digits -- location is whatever
    for (let i:number = 1; i <= 9; i++ ){
        digits.push(Math.floor(Math.random()*9))
    }

    // define verification digits
    let firstDigit: number = 0
    let secondDigit: number = 0
    let j: number = 10

    for(let j = 0; j < 9; j++){
        firstDigit += digits[j] * (10 - j)
    }
    firstDigit = 11 - firstDigit  % 11
    digits.push(firstDigit)

    for(let j = 1; j < 10; j++){
        secondDigit += digits[j] * (11 - j)
    }
    secondDigit = 11 - secondDigit % 11
    digits.push(secondDigit)

    return digits.join('')
}