import { Coordinates } from './types'

const sizeChecker: {[key: number]: string} = {
  9: '3-full',
  6: '3-top',
  4: '2-full',
  3: '3-internal-corners',
  2: '2-internal-corners'
}

const seedMapping = [
  [ [0, 0], [0, 0], [0, 0], [0, 0] ],
  [ [0, 1], [1, 0], [0, 1], [1, 0] ],
  [ [0, 2], [2, 0], [0, 2], [2, 0] ],
  [ [1, 0], [0, 1], [1, 0], [0, 1] ],
  [ [1, 1], [1, 1], [1, 1], [1, 1] ],
  [ [1, 2], [2, 1], [1, 2], [2, 1] ],
  [ [2, 0], [0, 2], [2, 0], [0, 2] ],
  [ [2, 1], [1, 2], [2, 1], [1, 2] ],
  [ [2, 2], [2, 2], [2, 2], [2, 2] ]
]

const borderMapping: {[key: string]: number[][][]} = {
  '3-full': seedMapping,
  '3-top': [
    seedMapping[0],
    seedMapping[1],
    seedMapping[3],
    seedMapping[4],
    [ [0, 2], [2, 0], [0, 2], [2, 0] ],
    [ [1, 2], [2, 1], [1, 2], [2, 1] ]
  ],
  '2-full': [
    seedMapping[0],
    seedMapping[1],
    seedMapping[3],
    seedMapping[4],
  ],
  '2-internal-corners': [
    seedMapping[0],
    seedMapping[0]
  ],
  '3-internal-corners': [
    seedMapping[0],
    seedMapping[0],
    seedMapping[0]
  ]
}

const gcd = (a: number, b: number): number => !b ? a : gcd(b, a % b)

const getData = (tileCount: number) => {
  const arr: Coordinates[][] = []
  for (var i = 0; i < tileCount; i++) {
    arr.push([])
    arr[i].push({ x: i * 2, y: 0 })
    arr[i].push({ x: i * 2 + 1, y: 0 })
    arr[i].push({ x: i * 2 + 1, y: 1 })
    arr[i].push({ x: i * 2, y: 1 })
  }
  return arr
}

const getCellPositionByID = (id: number, xLength: number, yLength: number): Coordinates | boolean => {
  if (id < 1) return false
  if (id > xLength * yLength) return false
  return { x: (id - 1) % xLength, y: Math.floor((id - 1) / xLength) }
}

export default {
  sizeChecker,
  seedMapping,
  borderMapping,
  gcd,
  getData,
  getCellPositionByID
}