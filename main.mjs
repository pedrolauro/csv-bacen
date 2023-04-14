import yargs from 'yargs'
import { runBuildFeedzaiCsv } from './feedzai.mjs'

var argv = yargs(process.argv.slice(2))
  .command('bacen', 'Create CSV for feedzai',
    {
      input: {
        alias: 'i',
        describe: 'Define from where will read original CSV',
        type: 'string',
        nargs: 1,
        demand: true
      }
    },
    ({ input }) => {
      runBuildFeedzaiCsv({ input }).catch(console.dir)
    }
  )

  .demandCommand()
  .usage('Usage: $0 <command> [options]')
  .help()
  .argv