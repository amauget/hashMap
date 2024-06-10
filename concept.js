function hash(key) {
  let hashCode = 0;
     
  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = (primeNumber * hashCode + key.charCodeAt(i))
  }
  let index = hashCode % this.capacity

  return [index, hashCode];
} 

let info = hash('Aaron')
let index = info[0]
let value = {name: 'Aaron'}
Object.assign(value, {hashCode: info[1]})
console.log(value)