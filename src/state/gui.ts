import { applyBFT, applySignedOr, applySignedOracle } from './circuit'

let signedOracleButton
export const initSignedOracleButton = (b) => {
  b.mousePressed(() => applySignedOracle())
  setSignedOracleButton(b)
}
export const getSignedOracleButton = () => signedOracleButton
export const setSignedOracleButton = (b) => signedOracleButton = b


let BFTButton
export const initBFTButton = (b) => {
  b.mousePressed(() => applyBFT())
  setBFTButton(b)
}
export const getBFTButton = () => BFTButton
export const setBFTButton = (b) => BFTButton = b

let signedOrButton
export const initSignedOrButton = (b) => {
  b.mousePressed(() => applySignedOr())
  setSignedOrButton(b)
}
export const getSignedOrButton = () => signedOrButton
export const setSignedOrButton = (b) => signedOrButton = b

let BFTSignedOrBFTButton
export const initBFTSignedOrBFTButton = (b) => {
  b.mousePressed(() => {
    applyBFT()
    applySignedOr()
    applyBFT()
  })
  setBFTSignedOrBFTButton(b)
}
export const getBFTSignedOrBFTButton = () => BFTSignedOrBFTButton
export const setBFTSignedOrBFTButton = (b) => BFTSignedOrBFTButton = b