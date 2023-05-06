import p5 from 'p5'
import { getLargestSize } from '../util/screenSize'
import { initBFTButton, initBFTSignedOrBFTButton, initSignedOrButton, initSignedOracleButton } from '../state/gui'

const setup = (p: p5) => {
  const { width, height } = getLargestSize(p)
  const canvas = p.createCanvas(width, height)
  canvas.style('display', 'block')
  canvas.style('border', '3px solid black')
  
  initSignedOracleButton(p.createButton('Signed Oracle'))
  initBFTButton(p.createButton('BFT'))
  initSignedOrButton(p.createButton('Signed Or'))
  initBFTSignedOrBFTButton(p.createButton('BFT + Signed Or + BFT'))
}

export default setup
