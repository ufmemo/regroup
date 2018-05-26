import {assert} from 'chai'
import {deepStrictEqual as assertDeepEqual} from 'assert'

import flatten from 'array-flatten'

import { hasDuplicateEntries, hasDuplicateEntriesByKey } from '../tests/assertHelper'
import { makeMap, numberOfSublists, numberOfSublistsByCount, numberOfSublistsBySublistLength, makeMapWholeRecord, parseCsvFileToJson } from '../src/utils';

describe('Test Utils', () => {

    it('Test makeMap', (done) => {

        let list = [1, 2, 3, 4, 4]

        let map = makeMap(list)
        let expected = { '1': [1], '2': [2], '3': [3], '4': [4, 4] }

        assertDeepEqual(map, expected)
        done()
    })

    it('Test Processed File with NO DUPS', done =>{
        let records = parseCsvFileToJson('t1_0dups.csv')
        let map = makeMapWholeRecord(records, 'key')
        Object.values(map).forEach(sublist => {
            assert.equal(sublist.length, 1)    
        })
        done()
    })

    it('Test Processed File with ONE sets of DUPS', done =>{

        let records = parseCsvFileToJson('t1_1dups.csv')
        let map = makeMapWholeRecord(records, 'key')
        assert.equal(map['k0'].length, 1, `${map['k0'].length}`)
        assert.equal(map['k5'].length, 3, `${map['k0'].length}`)
        assert.equal(map['k9'].length, 1, `${map['k9'].length}`)

        done()
    })

    it('Test Processed File with THREE sets of DUPS', done =>{
        let records = parseCsvFileToJson('t1_3dups.csv')
        let map = makeMapWholeRecord(records, 'key')
        assert.equal(map['k0'].length, 3, `${map['k0'].length}`)
        assert.equal(map['k1'].length, 1, `${map['k0'].length}`)
        assert.equal(map['k9'].length, 5, `${map['k9'].length}`)
        done()
    })

    it('Test numberOfSublistsByCount', (done) => {

        let list = [1, 2, 3, 4, 4]

        let map1 = { '1': 1, '2': 1, '3': 1, '4': 2 }
        let max1 = numberOfSublistsByCount(map1)
        assert.equal(max1, 2)

        let map2 = { '1': 1, '2': 1, '3': 1, '4': 5 }
        let max2 = numberOfSublistsByCount(map2)
        assert.equal(max2, 5)

        let map3 = { '1': 1, '2': 1, '3': 1, '4': 1 }
        let max3 = numberOfSublistsByCount(map3)
        assert.equal(max3, 1)

        let map4 = { '1': 4, '2': 1, '3': 1, '4': 2 }
        let max4 = numberOfSublistsByCount(map4)
        assert.equal(max4, 4)

        done()
    })

    it('Test numberOfSublistsBySublistLength, simple objects.', (done) => {

        let map1 = { '1': [1], '2': [2], '3': [3], '4': [4, 4, 4] }
        let max1 = numberOfSublistsBySublistLength(map1)
        assert.equal(3, max1)

        let map2 = { '1': [1, 1, 1, 1], '2': [2], '3': [3], '4': [4, 4, 4] }
        let max2 = numberOfSublistsBySublistLength(map2)
        assert.equal(4, max2)


        let map3 = { '1': [1, 1, 1, 1], '2': [2], '3': [3], '4': [4, 4, 4, 4] }
        let max3 = numberOfSublistsBySublistLength(map3)
        assert.equal(4, max3)

        done()
    })

    it('Test numberOfSublistsBySublistLength, full object.', (done) => {
        let map4 = { k0:
            [ { key: 'k0', row1: 'r0_data0', row2: 'r0_data2' },
              { key: 'k0', row1: 'r0_data1', row2: 'r0_data2' },
              { key: 'k0', row1: 'r1_data1', row2: 'r1_data2' } ],
           k2: [ { key: 'k2', row1: 'r2_data2', row2: 'r2_data2' } ],
           k3: [ { key: 'k3', row1: 'r3_data3', row2: 'r3_data2' } ],
           k4: [ { key: 'k4', row1: 'r4_data4', row2: 'r4_data2' } ],
           k5: [ { key: 'k5', row1: 'r5_data5', row2: 'r5_data2' } ],
           k6: [ { key: 'k6', row1: 'r6_data6', row2: 'r6_data2' } ],
           k7: [ { key: 'k7', row1: 'r7_data7', row2: 'r7_data2' } ],
           k8: [ { key: 'k8', row1: 'r8_data8', row2: 'r8_data2' } ],
           k9: [ { key: 'k9', row1: 'r9_data9', row2: 'r9_data2' } ] }

        let max4 = numberOfSublistsBySublistLength(map4)
    
        assert.equal(3, max4)

        done()
    })

    it('Test assertHelper hasDuplicateEntriesByKey, NO DUPS.', (done) =>{

        let uniqueSample = [[
            {key: 0, value: 'a'},
            {key: 1, value: 'a'},
            {key: 2, value: 'b'},
            {key: 3, value: 'a'},
            {key: 4, value: 'b'},
            {key: 5, value: 'a'},
            {key: 6, value: 'b'}        
        ]]
        assert.isFalse(hasDuplicateEntriesByKey(uniqueSample, 'key'))
        done()
    })

    it('Test assertHelper hadDuplicateEntriesByKey, expect DUPS.', done =>{

        let dupSample = [[
            {key: 0, value: 'a'},
            {key: 1, value: 'a'},
            {key: 2, value: 'b'},
            {key: 3, value: 'a'},
            {key: 4, value: 'b'},
            {key: 5, value: 'a'},
            {key: 0, value: 'a'},
            {key: 6, value: 'b'}        
        ]]
        assert.isTrue(hasDuplicateEntriesByKey(dupSample, 'key'))
        done()
    })
})