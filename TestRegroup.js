import assert from 'assert'
import flatten from 'array-flatten'

/**
 * Create sub groups, each subgroups cannot have duplicate entries
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

describe('Test MockMarketo', () => {

    it('Test 1', (done) => {

        let data = [1,2,3]
        let expected = [[1,2,3]]
        assert.deepEqual(regroup(data), expected)
        assert.equal(data.length, flatten(expected).length, "Expected to have same number of elements")
        done()
    })

    it('Test 2', (done) => {

        let data = [1,1,2,3]
        let expected = [[1,2,3],[1]]
        assert.equal(data.length, flatten(expected).length, "Expected to have same number of elements")
        assert.deepEqual(regroup(data), expected)
        done()
    })

    it('Test 3', (done) => {

        let data = [1,2,2,3,3,3,4,4,4,4]
        let expected = [[1,2,3,4], [2,3,4], [3,4], [4]]

        assert.deepEqual(regroup(data), expected)
        assert.equal(data.length, flatten(expected).length, "Expected to have same number of elements")
        done()
    })

    it('Test 4', (done) => {

        let data = [1,2,3,1,2,3,1,2,3,1,2,3]
        let expected = [[1,2,3], [1,2,3], [1,2,3], [1,2,3]]

        assert.deepEqual(regroup(data), expected)
        assert.equal(data.length, flatten(expected).length, "Expected to have same number of elements")
        done()
    })

    it('test hasDuplicateEntries function', (done) => {

        let data1 = [[1,2,3]]
        let data2 = [[1,2,3,3]]
        let data3 = [[1,2], [1,2]]
        let data4 = [[1,2], [1,2,2]]

        assert(!hasDuplicateEntries(data1))
        assert(!hasDuplicateEntries(data2))
        assert(!hasDuplicateEntries(data3))
        assert(!hasDuplicateEntries(data4))
        done()
    })
})

function hasDuplicateEntries(list){
    list.forEach((sublist) => {
        sublist.forEach((entry) => {
            let index = sublist.indexOf(entry)
            if(sublist.indexOf(entry, index+1) !== -1){
                return true
            }
        })
    })
    return false
}