import fs from "fs";
import parse from 'csv-parse/lib/sync'

const config = {
    auto_parse: true,
    trim: true,
    skip_empty_lines: true,
    columns: true
}

/**
 * walk the sublists figure out how long the longest is
 */
export function numberOfSublistsByCount(map) {
    return Object
            .values(map)
            .reduce((a, b) => Math.max(a, b))
}

export function numberOfSublistsBySublistLength(map) {
    return Object
        .values(map)
        .map(sublist => sublist.length)
        .reduce((a, b) => Math.max(a, b))
}

export function makeMap(list) {
    let map = {}
    list.forEach(item => {
        if (map[item]) {
            map[item].push(item)
        } else {
            map[item] = [item]
        }
    })
    return map
}

export function makeMapWholeRecord(list, keyLabel) {
    let map = {}
    list.forEach(record => {
        if (map[record[keyLabel]]) {
            map[record[keyLabel]].push(record)
        } else {
            map[record[keyLabel]] = [record]
        }
    })
    return map
}


export function makeCountMap(list) {
    let map = {}
    list.forEach(item => {
        if (map[item]) {
            map[item]++
        } else {
            map[item] = 1
        }
    })
    return map
}

export function parseCsvFileToJson(file) {
    let data = fs.readFileSync(`./data/${file}`).toString()
    return parse(data, config)
}