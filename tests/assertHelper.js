/**
 * Takes a list of lists [[],[]]
 * 
 * makes sure there are no dups in each sublists
 */
export function hasDuplicateEntries(list) {
    list.forEach((sublist) => {
        sublist.forEach((entry) => {
            let index = sublist.indexOf(entry)
            if (sublist.indexOf(entry, index + 1) !== -1) {
                return true
            }
        })
    })
    return false
}

export function hasDuplicateEntriesByKey(list, key) {
   
    if(!key){
        throw Error('Missing key argument.')
    }

    let dups = false
    list.forEach(sublist => {        
        
        let keys = sublist.map(record => record[key])            
       
        keys.forEach((entry) => {
            let index = keys.indexOf(entry)
            if (keys.indexOf(entry, index + 1) !== -1) {
                dups = true
            }
        })
    })
    return dups
}