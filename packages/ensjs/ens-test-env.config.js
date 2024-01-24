require('dotenv').config({ path: `${process.env.INIT_CWD}/.env.local` })
require('dotenv').config({
  path: `${process.env.INIT_CWD}/.env`,
  override: true,
})

process.env.ADDRESS_ETH_REGISTRAR = '0x72a7406B0058f00B9D0FFb4DfC123bf2dF14B8A6'
process.env.ADDRESS_NAME_WRAPPER = '0xC3f7B162b950e24f8E7713851B898159F720E222'
process.env.BATCH_GATEWAY_URLS = JSON.stringify([
  'https://universal-offchain-unwrapper.ens-cf.workers.dev/',
])

/**
 * @type {import('@ensdomains/ens-test-env').ENSTestEnvConfig}
 * */
module.exports = {
  deployCommand: 'pnpm hardhat deploy',
  scripts: [
    {
      command:
        process.env.STATIC_ENS === 'true' ? 'pnpm test:static' : 'pnpm test',
      name: 'jest',
      prefixColor: 'yellow.bold',
      finishOnExit: true,
    },
  ],
}
