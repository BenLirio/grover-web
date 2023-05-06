import p5 from 'p5'
import { drawAmplitudes, drawMean, drawZeroLine } from '../draw/circuit'
import { getState, normalizeState } from '../state/circuit'

const draw = (p: p5) => {
  p.background(200)
  normalizeState()
  drawAmplitudes(p)
  drawMean(p)
  drawZeroLine(p)
}

export default draw