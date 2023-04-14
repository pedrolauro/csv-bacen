import csvToJson from 'csvtojson'
import { parse } from 'json2csv'
import _ from 'lodash'
import { Validator } from 'jsonschema'
import chalk from 'chalk'
import fs from 'fs'

import {
  inputSchemaBacen,
} from './config.mjs'

export async function runBuildFeedzaiCsv({ input }) {

  try {

    console.log(`\n\n##############################################`)
    console.log(`input: ${input}\n`)

    // read input
    let data = await csvToJson({
      delimiter: ',',
    }).fromFile(input)

    // input has values
    if (data.length === 0) {
      console.log('Input file is empty')
      return
    }

    // validate input
    const v = new Validator()
    const valResult = v.validate(data, inputSchemaBacen)
    if (valResult.errors.length !== 0) {
      console.log('Input file has invalid format')
      return
    }

    // filtra CODIGOS invalidos
    data = data.filter(i => !isNaN(_.parseInt(i.Numero_Codigo)))
    // console.log(data.length)

    // saida
    const output = []
    for (let i = 0; i < data.length; i++) {

      let dic = {
        "ISPB": _.padStart(data[i].ISPB, 8, "0"),
      }

      output.push({
        "id_bacen": _.padStart(data[i].Numero_Codigo, 3, "0"),
        "dicionario": JSON.stringify(dic),
        "comentario": data[i].Nome_Extenso,
        "timestamp_ativo": "0",
        "timestamp_expiracao": "9223372036854775807",
        "ativo": true,
        "tokenizado": false
      })

    }

    // console.log(output)

    // save output
    const csv = parse(output, { delimiter: ',', quote: '"' })
    // console.log(csv)

    let pieces = _.split(input, '/')
    pieces[pieces.length - 1] = `out.${pieces[pieces.length - 1]}`
    fs.writeFileSync(_.join(pieces, '/'), csv)

  } finally {
    console.log(`FIM`)
  }
}