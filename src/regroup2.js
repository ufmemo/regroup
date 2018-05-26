import { makeMap, numberOfSublistsBySublistLength, makeMapWholeRecord } from "./utils";

/**
 * Regroup2:
 * 
 * 1. Start with list of items 
 * ['a','b','c','c]
 * 
 * 2. Create a map in which the keys are the items, and the values are lists of duplicates
 * {
 *    'a': ['a'],
 *    'b': ['b'],
 *    'c': ['c','c']
 * }
 * 
 * 3. Transpose the array such that you have a list of xvertical elements 
 * [a[0],undef,undef] 
 * [b[0],undef,undef] 
 * [c[0],c[1],undef] 
 * 
 * You end up with 
 * 
 * [a,b,c]
 * [c]
 */

export function regroup2(list){

    let map = makeMap(list)
    let max = numberOfSublistsBySublistLength(map)
    let out  = []

    for (let i = 0; i < max; i++) {
        let sublist = []
        Object.keys(map).forEach(key =>{            
            if(map[key][i]){
                sublist.push(map[key][i])
            }
        })   
        out.push(sublist)
    }
    return out
}

export function regroup2WholeRecords(records){

    let map = makeMapWholeRecord(records, 'key')
    let max = numberOfSublistsBySublistLength(map)
    let out  = []

    for (let i = 0; i < max; i++) {
        let sublist = []
        Object.keys(map).forEach(key =>{            
            if(map[key][i]){
                sublist.push(map[key][i])
            }
        })   
        out.push(sublist)
    }
    return out
}