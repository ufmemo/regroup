import { assert } from 'chai'
import { deepStrictEqual as assertDeepEqual } from 'assert'
import flatten from 'array-flatten'

import { makeMap, numberOfSublists, regroup2, makeOutput, regroup2WholeRecords } from '../src/regroup2'
import { hasDuplicateEntries, hasDuplicateEntriesByKey } from '../tests/assertHelper'
import { parseCsvFileToJson } from '../src/utils';

describe('Test Regroup2', () => {

    it('Test regroup2 1', done => {

        let data = [1, 2, 3, 4, 4]
        let expect = [[1, 2, 3, 4], [4]]

        let out = regroup2(data)

        assertDeepEqual(expect, out)
        assert.equal(data.length, flatten(out).length, "Expected to have same number of elements")
        assert(!hasDuplicateEntries(out))
        done()
    })

    it('Test regroup2 Whole Records, fixed object no DUPS', done => {

        let data = [
            { key: 1, value: 1 },
            { key: 2, value: 2 },
            { key: 3, value: 3 },
            { key: 4, value: 4 }
        ]

        let expect = [data]
            
        let out = regroup2WholeRecords(data)

        assertDeepEqual([data], out)

        assert.equal(1, out.length, "No dups, expcted to have ONE subgroups")
        assert.equal(data.length, flatten(out).length, "Expected to have same number of elements")
        assert(!hasDuplicateEntriesByKey(out, 'key'))
        done()
    })

    it('Test regroup2 Whole Records, fixed object no DUPS', done => {

        let data = [
            { key: 1, value: 1 },
            { key: 2, value: 2 },
            { key: 3, value: 3 },
            { key: 3, value: '3a' },
            { key: 4, value: 4 }
        ]

        let expect = [
            [
                { key: 1, value: 1 },
                { key: 2, value: 2 },
                { key: 3, value: 3 },
                { key: 4, value: 4 }
            ], [
                { key: 3, value: '3a' },
            ]
        ]

        let out = regroup2WholeRecords(data)

        assertDeepEqual(expected, out)

        assert.equal(1, out.length, "No dups, expcted to have ONE subgroups")
        assert.equal(data.length, flatten(out).length, "Expected to have same number of elements")
        assert(!hasDuplicateEntriesByKey(out, 'key'))
        done()
    })


    it('Test regroup2 Whole Records, NO DUPS', done => {

        let data = parseCsvFileToJson('t1_0dups.csv')
        let out = regroup2WholeRecords(data)

        assert.equal(1, out.length, "No dups, expcted to have ONE subgroups")
        assert.equal(data.length, flatten(out).length, "Expected to have same number of elements")
        assert(!hasDuplicateEntriesByKey(out, 'key'))

        done()
    })

    it('Test regroup2 Whole Records, NO DUPS', done => {

        let data = parseCsvFileToJson('t1_1dups.csv')
        let out = regroup2WholeRecords(data)


        assert.equal(3, out.length, "The max number of dupliate keys is three, should be three sub groups")
        assert.equal(data.length, flatten(out).length, "Expected to have same number of elements")
        assert(!hasDuplicateEntriesByKey(out, 'key'))

        done()
    })

    it('Test regroup2 Whole Records, ONE set of DUPS', done => {

        let data = parseCsvFileToJson('t1_3dups.csv')

        let out = regroup2WholeRecords(data)

        //The max number of dupliate keys is three, should be three sub groups
        assert.equal(5, out.length, "The max number of dupliate keys is FIVE, should be FIVE sub groups")
        assert.equal(data.length, flatten(out).length, "Expected to have same number of elements")
        assert(!hasDuplicateEntriesByKey(out, 'key'))

        done()
    })

})