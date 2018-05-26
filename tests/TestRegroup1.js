import { assert } from 'chai'
import { deepStrictEqual as assertDeepEqual } from 'assert'

import flatten from 'array-flatten'

import regroup from '../src/Regroup1'
import {hasDuplicateEntries} from '../tests/assertHelper'

describe('Test Regroup1', () => {

    it('Test regroup1, no regrouping', done => {

        let data = [1,2,3]
        let expected = [[1,2,3]]
        
        let out = regroup(data)
        
        assertDeepEqual(out, expected)
        assert.equal(data.length, flatten(out).length, "Expected to have same number of elements")
        assert.isFalse(hasDuplicateEntries(out))
        done()
    })

    it('Test regroup1, 1 regroup', done => {

        let data = [1,1,2,3]
        let expected = [[1,2,3],[1]]

        let out = regroup(data)
        
        assertDeepEqual(out, expected)
        assert.equal(data.length, flatten(out).length, "Expected to have same number of elements")
        assert.isFalse(hasDuplicateEntries(out))

        done()
    })

    it('Test regroup1, 4 regroup', done => {

        let data = [1,2,2,3,3,3,4,4,4,4]
        let expected = [[1,2,3,4], [2,3,4], [3,4], [4]]

        let out = regroup(data)

        assertDeepEqual(out, expected)
        assert.equal(data.length, flatten(out).length, "Expected to have same number of elements")
        assert.isFalse(hasDuplicateEntries(out))

        done()
    })

    it('Test regroup1, 4 regroup, different shape date', done => {

        let data = [1,2,3,1,2,3,1,2,3,1,2,3]
        let expected = [[1,2,3], [1,2,3], [1,2,3], [1,2,3]]

        let out = regroup(data)

        assertDeepEqual(out, expected)
        assert.equal(data.length, flatten(out).length, "Expected to have same number of elements")
        assert.isFalse(hasDuplicateEntries(out))

        done()
    })

})
