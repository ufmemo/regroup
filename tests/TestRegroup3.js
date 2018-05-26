import assert from 'assert'
import flatten from 'array-flatten'

import { makeCountMap, parseCsvFileToJson } from '../src/utils';
import { regroup3 } from '../src/regroup3';
import {hasDuplicateEntries} from '../tests/assertHelper'


describe('Test Regroup3', () => {

    it('Test Regroup3, simple object', (done) => {

        let start = ['a','a','b','b','c','d','d','d']

        let out = regroup3(start)
        
        assert(!hasDuplicateEntries(out))
        done()
    })

})

