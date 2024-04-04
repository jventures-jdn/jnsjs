import { BigNumber } from '@ethersproject/bignumber'
import { ENSArgs } from '..'
import {
  BaseRegistrationParams,
  RegistrationWithIdTuple,
  makeRegistrationData,
} from '../utils/registerHelpers'
import { wrappedLabelLengthCheck } from '../utils/wrapper'

type Params = BaseRegistrationParams & {
  value: BigNumber
}

export default async function (
  { contracts }: ENSArgs<'contracts'>,
  name: string,
  { resolverAddress, value, ...params }: Params,
) {
  const labels = name.split('.')
  if (labels.length !== 2 || labels[1] !== 'jfin')
    throw new Error('Currently only .jfin TLD registrations are supported')

  wrappedLabelLengthCheck(labels[0])

  const controller = await contracts!.getEthRegistrarController()
  const _resolver = await contracts!.getPublicResolver(
    undefined,
    resolverAddress,
  )
  const generatedParams = makeRegistrationData({
    name,
    resolver: _resolver,
    ...params,
  }) as RegistrationWithIdTuple

  return controller.populateTransaction.registerWithId(...generatedParams, {
    value,
  })
}
