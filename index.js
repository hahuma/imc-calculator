import ManifestJSON from './manifest.js'

const getElement = document.querySelector.bind(document)
const IMCsInfo = {}

const form = getElement('#calculate-imc-form')

ManifestJSON.forEach( function(index) {
    return IMCsInfo[index.imcLevel] = {
        minValue: index.minValue,
        maxValue: index.maxValue,
        text: index.text
    }
})
Object.freeze(IMCsInfo)


form.addEventListener('submit', e => {
    e.preventDefault()

    const weight = getElement('#weight').value
    const height = getElement('#height').value
    const {
        formattedHeight,
        formattedWeight
    } = validadeInputValues(weight, height)

    const imc = (formattedWeight / (formattedHeight * formattedHeight / 10000)).toFixed(1)

    const textResult = isBetween(imc, IMCsInfo)

    return alert(textResult)
})


function isBetween(value, IMCsInfo){

    if ( IMCsInfo.low.minValue <= value && value <= IMCsInfo.low.maxValue ){
        return IMCsInfo.low.text
    }
    if ( IMCsInfo.normal.minValue <= value && value <= IMCsInfo.normal.maxValue ){
        return IMCsInfo.normal.text
    }
    if ( IMCsInfo.overweight.minValue <= value && value <= IMCsInfo.overweight.maxValue ){
        return IMCsInfo.overweight.text
    }
    if ( IMCsInfo.obese.minValue <= value && value <= IMCsInfo.obese.maxValue ){
        return IMCsInfo.obese.text
    }
    if ( IMCsInfo.morbid.minValue <= value && value <= IMCsInfo.morbid.maxValue ){
        return IMCsInfo.morbid.text
    }
}


function validadeInputValues(weight = "", height = "") {
    const formattedWeight = Number(weight.replace(',', '.')).toFixed(2)
    const formattedHeight = Number(height).toFixed(2)
    return {
        formattedWeight,
        formattedHeight

    }
}