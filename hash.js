/* 
Project Ground rules:
  We must provide self restriction on array index so that items cannot be store outside the bucket length

  use 

  if (index < 0 || index >= buckets.length) {
  throw new Error("Trying to access index out of bound");
  }
*/

/* Create a hash map class/factory function. 
1. function hash(key) takes a key and produces a hash code with it.

starter function below:
*/



class HashMap{
  constructor(capacity = 16){
    this.size = 0 /* default key val pairs in hash table */
    this.capacity = capacity /* array length */
    this.buckets = new Array(capacity).fill(null).map(() => [] )
    this.loadFactor = 0.75
  }

  hash(key) {
    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i))
    }
    let index = hashCode % this.capacity

    return [index,hashCode];
  } 
  set(key, value) {
    
    if (this.size / this.capacity >= this.loadFactor) {
        this.resize();
    }

    const storeInfo = this.hash(key);
    const index = storeInfo[0]
    
    Object.assign(value, {hashCode: storeInfo[1]})

    const bucket = this.buckets[index];

    for (let pair of bucket) {
        if (pair[0] === key) {
            // Key exists, update the value
            if(pair[0].hashCode === key.hashCode){
              pair[1] = value;
            }
            else{
              console.log('ACTION NEEDED UNDER SET()')
            }
            return;
        }   
    }

    // Key does not exist, add new key-value pair
    bucket.push([key, value]);
    this.size++
    
}
  resize(){/* calling 2nd time leading to *4 bucket count */
    const oldBuckets = []
    this.buckets.forEach(item => {
        if(item.length === 1){
          oldBuckets.push(item[0])
        }
        else if(item.length > 1){
          for(let i = 0; i < item.length; i++){
            oldBuckets.push(item[i]) /* finds the key */
          }
        }
    })
    this.capacity *= 2
    
    this.buckets = new Array(this.capacity).fill(null).map(() => [] )
    
    for(let i = 0; i < oldBuckets.length; i++){
      let item = oldBuckets[i]
      let key = item[0]
      let value = item[1]
      this.size = oldBuckets.length - 1 /* -1 because it calls set() next which adds one to this.size  */ 
      this.set(key, value)
      // this.set(index, value)  /* old key and values pushed to oldBuckets */
    }
  }
  get(key){
    let storedInfo = this.hash(key)
    let index = storedInfo[0]
    let hashCode = storedInfo[1]
    let items = this.buckets[index]
    let data = null

    if(items.length > 1){ /* Still returning null when it should be returning item */
      items.forEach(item =>{
        
        if(item[1].hashCode === hashCode){
          return data = item[1]
          
        }
      })
    }
    else if(items.length > 0){
      return data = items[0] 
    }
    return data 
  }

  has(key){
    let index = this.hash(key)
    if(this.buckets[index].length !== 0){ return true }
    return false
  }
  length(){
    return this.buckets.length
  }
  clear(capacity = 16){ /* reset default constructor values */
    this.size = 0 
    
    this.capacity = capacity

    this.buckets = new Array(this.capacity).fill(null).map(() => [])
    return this
  }
  values(){
    let array = []
    for(i of this.buckets){
      array.push(...i)
    }
    return array
  }
  entries(){ /* returns occupied indexes of this.buckets */
    let array = []
    for(let i = 0; i < (this.buckets).length; i++){
      if(this.buckets[i].length > 0){
        array.push(...this.buckets[i])
      }
    } 
    return array
  } 
  remove(key){
    let storageInfo = this.hash(key)
    let index = storageInfo[0]
    let hashCode = storageInfo[1]
    let items = this.buckets[index]
    

    if(items.length > 1){ /* Still returning null when it should be returning item */
      for(let i = 0; i < items.length; i++){
        let item = items[i]
        if(item[1].hashCode === hashCode){
          items.splice(i, 1,)
        }
      }
    }
    else if(items.length === 1){
      this.buckets.splice(index, 1,)
      return this.buckets
    }
    return items
  }
  keys(){
    let items = this.buckets
    let array = []

    let collisions = []
    
    items.forEach(item =>{
      if(item.length === 1){
        let allInfo = item[0]
        let key = allInfo[0]
  
        array.push(key)
      }
      else if(item.length > 1){
        collisions.push(...item)
      }
    })

    collisions.forEach(item =>{
      array.push(item[0])
    })
    return array
  }
  values(){
   let items = this.buckets
   let array = []
   let collisions = []

   items.forEach(item => {
    if(item.length === 1){
      let allInfo = item[0]
        let obj = allInfo[1]
  
        array.push(obj)
    }
    else if(item.length > 1){
      collisions.push(...item)
    }
   })
   collisions.forEach(item => {
    array.push(item[1])
   })
   return array

  }
}


const hashMap = new HashMap(16)

let nameArray = ['Carlos', 'Carla', 'Casey', 'Kenny', 'Camie', 'Carl', 'Carlie', 'Cash', 'Eric', 'Lacy', 'Seth', 'Jerry', 'Jared', 'Lenny', 'Kevin' , 'Allen', 'Al', 'Albert', 'Gwen', 'Susan', 'Garfield', 'John', 'Jack']

for(i of nameArray){
  
  hashMap.set(i, {username: `${i}@yahoo.com` , password: `${i}123`})
}
hashMap.set('Brittny', {username: `brittny@yahoo.com` , password: 'asdf123'}) 


// console.log(hashMap.has('Brittany')) /* This is a collision. Not the value within the index, so it's coming back true.  */
hashMap.remove('Carlos')
hashMap.values()


