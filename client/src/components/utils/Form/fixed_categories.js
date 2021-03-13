const frets = [
  {
    "_id":20,
    "name":20
  },
  {
    "_id":21,
    "name":21
  },
  {
    "_id":22,
    "name":22
  },
  {
    "_id":24,
    "name":24
  },
]

const prices = [
  {
    "_id": 0,
    "name":'Any',
    "array":[]
  },
  {
    "_id": 1,
    "name":'$0 to $19',
    "array":[0,19]
  },
  {
    "_id": 2,
    "name":'$20 to $29',
    "array":[20,29]
  },
  {
    "_id": 3,
    "name":'$30 to $49',
    "array":[30,49]
  },
  {
    "_id": 4,
    "name":'$50 to $99',
    "array":[50,99]
  },
  {
    "_id": 5,
    "name":'More than $100',
    "array":[100,15000]
  },
]

export {frets, prices};