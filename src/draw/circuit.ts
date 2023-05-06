import p5 from 'p5'
import { checkSat, getN, getState } from '../state/circuit'

const UNIT = 100

export const drawAmplitudes = (p: p5) => {
  p.push()

  p.strokeWeight(0)
  p.translate(0, p.height/2)

  const N = getN()
  p.scale(p.width/(N*UNIT), -p.height/(2*UNIT))

  getState().forEach((v, i) => {
    if (i%2 === 0) p.fill('gray')
    else p.fill('black')
    if (checkSat(i)) p.fill('red')
    p.rect(i*UNIT, 0, UNIT, v*UNIT)
  })

  p.pop()
}

export const drawMean = (p: p5) => {
  p.push()

  const N = getN()
  p.translate(0, p.height/2)
  p.scale(p.width/(N*UNIT), -p.height/(2*UNIT))
  const mean = getState().reduce((acc, v) => acc + v, 0) / N
  p.fill(p.color(255, 128))
  p.line(0, mean*UNIT, UNIT*N, mean*UNIT)
  p.pop()
}

export const drawZeroLine = (p: p5) => {
  p.push()

  p.strokeWeight(2)
  p.stroke('blue')
  p.line(0, p.height/2, p.width, p.height/2)

  p.pop()
}