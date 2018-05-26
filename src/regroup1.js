/**
 * Create sub groups, each subgroups cannot have duplicate entries
 * 
 * Start with list of keys, create output which is a list of lists... []
 * 
 * "First fit approach", ok solution
 * 
 * walk the list, for each item check to see if the item is in the output subgroups, one at a time
 * if the item is not in the subgroup add it
 * if the item is already in the sub group move to the next one, repeat
 * if you get to the end of the subgroups, then add a new sub group .push([item])
 */
function regroup(start) {
    let end = []

    for (let i = 0; i < start.length; i++) {

        let item = start[i]
        let added = false

        for (let i = 0; i < end.length; i++) {
            let sublist = end[i]
            if (!sublist.includes(item)) {
                sublist.push(item)
                added = true
                break
            }
        }
        if (!added) {
            end.push([item])
        }
    }
    return end
}

export default regroup