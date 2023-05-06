const range = (n:number) => Array(n).fill(0)
const gcd = (a:number, b:number): number => {
  if (b === 0) return a
  return gcd(b, a % b)
}

type Matrix<T> = T[][]

declare global {
  interface Array<T> {
    map2<U>(callback: (value: T, index: [number, number]) => U): Matrix<U>
    asColumnMatrix(): Matrix<T>
    asRowMatrix(): Matrix<T>
    transpose(): Array<T>
  }
  interface Array<T extends number> {
    tensor<U extends number>(b: Matrix<U>): Matrix<number>
    matMul<U extends number>(b: Matrix<U>): Matrix<number>
  }
}
Array.prototype.map2 = function<T, U>(this: Matrix<T>, callback: (value: T, index: [number, number]) => U): Matrix<U> {
  return this.map((row, i) => row.map((value, j) => callback(value, [i, j])))
}
Array.prototype.transpose = function<T>(this: Matrix<T>): Matrix<T> {
  return range2(this[0].length)(this.length).map2((_, [i, j]) => this[j][i])
}
Array.prototype.asColumnMatrix = function<T>(this: T[]): Matrix<T> {
  return this.map(v => [v])
}
Array.prototype.asRowMatrix = function<T>(this: T[]): Matrix<T> {
  return [this]
}
Array.prototype.matMul = function<T extends number, U extends number>(this: Matrix<T>, b: Matrix<U>) : Matrix<number> {
  return range2(this.length)(b[0].length).map2((_, [i, j]) =>
    this[i].reduce((acc, v, idx) => acc + v * b[idx][j], 0))
}
Array.prototype.tensor = function<T extends number, U extends number>(this: Matrix<T>, b: Matrix<U>): Matrix<number> {
  return range2(this.length * b.length)(this[0].length * b[0].length)
    .map2((_, [i, j]) =>
      this[Math.floor(i / b.length)][Math.floor(j / b[0].length)] *
      b[i % b.length][j % b[0].length])
}

const range2 = (n:number) => (m:number): Matrix<[number, number]> =>
  range(n).map(_ => range(m).fill(0))

export const checkSat = (n:number) => n === 4

const n = 3
const N = 2**n
export const getN = () => N

let s: number[] = range(N).fill(1)
export const normalizeState = () => {
  const sumSquared = s.reduce((acc, v) => acc + v*v, 0)
  const norm = Math.sqrt(sumSquared)
  s = s.map(v => v/norm)
}
export const getState = () => s

export const applySignedOracle = () => {
  s = s.map((v, idx) => checkSat(idx) ? -v : v)
}
const H = range2(2)(2).map2((_, [i, j]) => i === 1 && j === 1 ? -1 : 1)
// const I = range2(2)(2).map2((_, [i, j]) => i === j ? 1 : 0)
const tensor = (a: Matrix<number>, b: Matrix<number>): Matrix<number> => a.tensor(b)

export const applyBFT = () => {
  const Hs = range(n-1).reduce((acc, _) => tensor(acc, H), H)
  s = Hs.matMul(s.asColumnMatrix()).transpose()[0]
}
export const applySignedOr = () => {
  s = s.map((v, idx) => idx === 0 ? v : -v)
}



export const init = () => {
  console.log('init')
  console.log(range(10))
}


