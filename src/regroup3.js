import { makeCountMap } from "./utils";

/**
 * 
 * list = [1,2,3,4,4]
 * 
 * 1. Make map of keys an number of times they appear in list
 *
 * map = {
 *    1: 1,
 *    2: 1,
 *    3: 1,
 *    4: 2
 * }
 * 
 * 2. Make an array the length of the most duplicate keys (in this case 4 is in there 2 times, so 2)
 * 
 * 3. Walk keys, place the key in all sublists with a smaller index than it's count map[key]
 */
export function regroup3(list){

    let map = makeCountMap(list)
    let max = Object.values(map).reduce(((a,b)=> Math.max(a,b)))

    let out = []
    for (let i = 0; i < max; i++) {
        out[i]=[]            
    }

    let keys = Object.keys(map)

    keys.forEach(key => {
        for (let i = 0; i < map[key]; i++) {                        
            out[i].push(key)
        }    
    })

    return out
}

export function regroup3Records(list){

    let map = makeCountMap(list)
    let max = Object.values(map).reduce(((a,b)=> Math.max(a,b)))

    let out = []
    for (let i = 0; i < max; i++) {
        out[i]=[]            
    }

    let keys = Object.keys(map)

    keys.forEach(key => {
        for (let i = 0; i < map[key]; i++) {                        
            out[i].push(key)
        }    
    })

    return out
}